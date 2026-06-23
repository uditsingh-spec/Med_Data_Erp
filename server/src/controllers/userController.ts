import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
      return;
    } else {
      res.status(404).json({ message: 'User not found' });
      return;
    }
  } catch (error) {
    next(error);
  }
};
