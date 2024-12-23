import { createCrudController } from './crudController';
import { createUserSchema, updateUserSchema, userIdSchema } from '../schemas/userSchema';

const USERS_COLLECTION = process.env.MONGODB_USERS_COLLECTION || '';

export const usersController = createCrudController({
  collectionName: USERS_COLLECTION,
  createSchema: createUserSchema,
  updateSchema: updateUserSchema,
  idSchema: userIdSchema,
});
