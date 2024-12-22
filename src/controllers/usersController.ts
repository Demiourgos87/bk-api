import { Request, Response } from 'express';
import { connectToDatabase, getCollection } from '../db/db';
import { ObjectId } from 'mongodb';
import { errorResponse, successResponse } from '../utils/helpers';
import { createUserSchema, updateUserSchema, userIdSchema } from '../schemas/userSchema';

const USERS_COLLECTION = process.env.MONGODB_USERS_COLLECTION || '';

export const createOne = async (req: Request, res: Response) => {
  try {
    const parsedBody = createUserSchema.parse(req.body);
    const collection = await getCollection(USERS_COLLECTION);
    const result = await collection.insertOne(parsedBody);

    successResponse(res, result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Error creating user');
  }
};

export const readAll = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection(USERS_COLLECTION);
    const users = await collection.find({}).toArray();

    successResponse(res, users);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Error fetching users');
  }
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(userIdSchema.parse(req.params.id));

    const collection = await getCollection(USERS_COLLECTION);
    const user = await collection.findOne({ _id: id });

    successResponse(res, user);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Error fetching user');
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(userIdSchema.parse(req.params.id));
    const parsedBody = updateUserSchema.parse(req.body);

    const collection = await getCollection(USERS_COLLECTION);
    const result = await collection.updateOne({ _id: id }, { $set: parsedBody });

    successResponse(res, result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Error updating user');
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(userIdSchema.parse(req.params.id));

    const collection = await getCollection(USERS_COLLECTION);
    const result = await collection.deleteOne({ _id: id });

    successResponse(res, result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Error deleting user');
  }
};
