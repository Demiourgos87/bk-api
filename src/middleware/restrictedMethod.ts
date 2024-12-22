import { Request, Response, NextFunction } from 'express';

export const restrictedMethod = (allowedMethod: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== allowedMethod) {
      res.setHeader('Allow', [allowedMethod]);
      res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
    next();
  };
};
