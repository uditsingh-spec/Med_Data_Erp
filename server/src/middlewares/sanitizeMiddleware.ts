import { Request, Response, NextFunction } from 'express';

const sanitizeObject = (obj: any): any => {
  if (obj instanceof Object) {
    for (const key in obj) {
      if (key.startsWith('$')) {
        delete obj[key];
      } else {
        sanitizeObject(obj[key]);
      }
    }
  }
  return obj;
};

export const mongoSanitize = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  next();
};
