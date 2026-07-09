import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { isAdmin, verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, isAdmin, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);

export default router;
 