import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { iat?: number };
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    if (user.passwordChangedAt && decoded.iat) {
      const changedTimestamp = parseInt((user.passwordChangedAt.getTime() / 1000).toString(), 10);
      if (decoded.iat < changedTimestamp) {
        res.status(401).json({ message: 'Not authorized, password changed recently. Please log in again.' });
        return;
      }
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Not authorized, token expired' });
    } else {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
    return;
  }
};

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.user && (req.user.role?.toLowerCase() === 'admin' || req.user.role?.toLowerCase() === 'super_admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
