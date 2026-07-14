import { Router } from 'express';
import { UserController } from '../controllers/userController';
// import { isAdmin, verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/register', UserController.createUser);
router.patch('/update/:id', UserController.updateUser);

export default router;
