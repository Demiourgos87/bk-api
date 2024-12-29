import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

// router.get('/', async (req: Request, res: Response) => {
//   const SECRET = process.env.JWT_SECRET || '';
//   const EXPIRES = process.env.JWT_TOKEN_TTL || '';
//   const user = registerUserSchema.parse(req.body);

//   const hashedPassword = await argon2.hash('12345678');

//   console.log(hashedPassword);

//   console.log(user);

//   if (!user.email || !user._id || !user.role) {
//     errorResponse(res, 'Invalid payload');
//   } else {
//     const token = jwt.sign(user, SECRET, { expiresIn: EXPIRES });

//     successResponse(res, token);
//   }
// });

router.get('/login', login);
router.post('/register', register);

export default router;
