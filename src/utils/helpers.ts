import { Response } from 'express';

export const successResponse = (res: Response, data: unknown) => {
  return res.status(200).json({ success: true, data });
};

export const errorResponse = (res: Response, message: string, status = 500) => {
  return res.status(status).json({ success: false, message });
};
