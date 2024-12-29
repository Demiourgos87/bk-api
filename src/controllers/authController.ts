import { Request, Response } from 'express';
import argon2 from 'argon2';
import { getCollection } from '../db/db';
import { createUserSchema, loginUserSchema } from '../schemas/userSchema';
import { errorResponse, generateToken, successResponse, verifyPassword } from '../utils/helpers';

const USERS_COLLECTION = process.env.MONGODB_USERS_COLLECTION || '';

export const login = async (req: Request, res: Response) => {
  try {
    const payload = loginUserSchema.parse(req.body);
    const { email, password } = payload;

    const collection = await getCollection(USERS_COLLECTION);
    const userFromDB = await collection.findOne({ email });

    if (userFromDB) {
      const passwordMatch = await verifyPassword(userFromDB.password, password);

      if (passwordMatch) {
        const token = generateToken(userFromDB);

        successResponse(res, token);
      } else errorResponse(res, 'Invalid password', 401);
    } else errorResponse(res, 'User not found.', 404);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Invalid payload.');
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = createUserSchema.parse(req.body);

    const collection = await getCollection(USERS_COLLECTION);

    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;

    const response = await collection.insertOne(user);

    successResponse(res, response);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Error creating user.');
  }
};

// export const getToken = async (req: Request, res: Response) => {};
