import { Request, Response } from 'express';
import { getCollection } from '../db/db';
import { ObjectId } from 'mongodb';
import { errorResponse, successResponse } from '../utils/helpers';
import { ZodSchema } from 'zod';

interface CRUDControllerProps {
  collectionName: string;
  createSchema: ZodSchema;
  updateSchema: ZodSchema;
  idSchema: ZodSchema;
}

export const createCrudController = ({
  collectionName,
  createSchema,
  updateSchema,
  idSchema,
}: CRUDControllerProps) => {
  const createOne = async (req: Request, res: Response) => {
    try {
      const parsedBody = createSchema.parse(req.body);
      const collection = await getCollection(collectionName);
      const result = await collection.insertOne(parsedBody);

      successResponse(res, result);
    } catch (error) {
      console.error(error);
      errorResponse(res, `Error creating item in ${collectionName}`);
    }
  };

  const readAll = async (req: Request, res: Response) => {
    try {
      const collection = await getCollection(collectionName);
      const users = await collection.find({}).toArray();

      successResponse(res, users);
    } catch (error) {
      console.error(error);
      errorResponse(res, `Error fetching items in ${collectionName}`);
    }
  };

  const readOne = async (req: Request, res: Response) => {
    try {
      const id = ObjectId.createFromHexString(idSchema.parse(req.params.id));

      const collection = await getCollection(collectionName);
      const user = await collection.findOne({ _id: id });

      successResponse(res, user);
    } catch (error) {
      console.error(error);
      errorResponse(res, `Error fetching item in ${collectionName}`);
    }
  };

  const updateOne = async (req: Request, res: Response) => {
    try {
      const id = ObjectId.createFromHexString(idSchema.parse(req.params.id));
      const parsedBody = updateSchema.parse(req.body);

      const collection = await getCollection(collectionName);
      const result = await collection.updateOne({ _id: id }, { $set: parsedBody });

      successResponse(res, result);
    } catch (error) {
      console.error(error);
      errorResponse(res, `Error updating item in ${collectionName}`);
    }
  };

  const deleteOne = async (req: Request, res: Response) => {
    try {
      const id = ObjectId.createFromHexString(idSchema.parse(req.params.id));

      const collection = await getCollection(collectionName);
      const result = await collection.deleteOne({ _id: id });

      successResponse(res, result);
    } catch (error) {
      console.error(error);
      errorResponse(res, `Error deleting item in ${collectionName}`);
    }
  };

  return { createOne, readAll, readOne, updateOne, deleteOne };
};
