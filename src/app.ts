import express, { Application } from 'express';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

import dotenv from 'dotenv';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app: Application = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', authenticateToken, usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
