import { Request, Response, NextFunction } from 'express';

export const allowRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Forbidden, insufficient permissions' });
      return;
    }
    next();
  };
};
