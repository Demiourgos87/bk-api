import { Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES = process.env.JWT_TOKEN_TTL || '';

export const successResponse = (res: Response, data: unknown) => {
  return res.status(200).json({ success: true, data });
};

export const errorResponse = (res: Response, message: string, status = 500) => {
  return res.status(status).json({ success: false, message });
};

export const generateToken = (payload: string | object) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  return token;
};

export const verifyToken = async () => {};

export const hashPassword = async () => {};

export const verifyPassword = async (digest: string, password: string) => {
  const match = await argon2.verify(digest, password);

  return match;
};
