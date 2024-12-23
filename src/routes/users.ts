import { Router } from 'express';
import { usersController } from '../controllers/usersController';
import { restrictedMethod } from '../middleware/restrictedMethod';

const router = Router();

router.post('/', restrictedMethod('POST'), usersController.createOne);
router.get('/', usersController.readAll);
router.get('/:id', usersController.readOne);
router.put('/:id', restrictedMethod('PUT'), usersController.updateOne);
router.delete('/:id', restrictedMethod('DELETE'), usersController.deleteOne);

export default router;
