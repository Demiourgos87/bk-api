import { z } from 'zod';

export const userIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const createUserSchema = z.object({
  role: z.enum(['admin', 'user']),
  email: z.string().email('Invalid email format.'),
  first_name: z.string().min(1, 'First name is required.'),
  last_name: z.string().min(1, 'Last name is required.'),
  password: z.string().min(1, 'Password is required.'),
});

export const updateUserSchema = z.object({
  role: z.enum(['admin', 'user']).optional(),
  email: z.string().email('Invalid email format.').optional(),
  first_name: z.string().min(1, 'First name is required.').optional(),
  last_name: z.string().min(1, 'Last name is required.').optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email format.'),
  // password: z
  //   .string()
  //   .regex(
  //     /^\$argon2id\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/,
  //     'Invalid hashed password format',
  //   ),
  password: z.string().min(1, 'Password is required.'),
});
