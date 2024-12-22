import { Router } from 'express';
import { createOne, readAll, readOne, updateOne, deleteOne } from '../controllers/usersController';
import { restrictedMethod } from '../middleware/restrictedMethod';

const router = Router();

router.post('/', restrictedMethod('POST'), createOne);
router.get('/', readAll);
router.get('/:id', readOne);
router.put('/:id', restrictedMethod('PUT'), updateOne);
router.delete('/:id', restrictedMethod('DELETE'), deleteOne);

export default router;
