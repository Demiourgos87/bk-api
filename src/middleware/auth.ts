import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/helpers';

const SECRET = process.env.JWT_SECRET || '';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    errorResponse(res, 'Unauthorized: No token provided.', 401);
  }

  try {
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (token) {
      const decoded = jwt.verify(token, SECRET);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).user = decoded;

      next();
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Unauthorized: Invalid token.', 401);
  }
};
