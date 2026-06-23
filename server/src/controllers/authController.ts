import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { generateTokenAndSetCookie } from '../utils/jwt';
import { loginSchema } from '../validators/authValidators';


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({ employeeId: validatedData.employeeId }).select('+password');
    
    if (user && (await user.comparePassword(validatedData.password))) {
      if (!user.isActive) {
        res.status(403).json({ message: 'Your account has been disabled. Please contact administrator.' });
        return;
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateTokenAndSetCookie(res, user._id as any, user.role);
      
      res.json({
        token,
        user: {
          _id: user._id,
          employeeId: user.employeeId,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
      return;
    } else {
      res.status(401).json({ message: 'Invalid Employee ID or password' });
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
    return;
  } catch (error) {
    next(error);
  }
};
