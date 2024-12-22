import express, { Application } from 'express';
import usersRouter from './routes/users';

import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
