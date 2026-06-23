import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from 'mongoose';

export const generateTokenAndSetCookie = (res: Response, userId: Types.ObjectId, role: string) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
