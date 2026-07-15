import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/all', verifyToken, authorizeRoles("admin"), UserController.getAllUsers);
router.post('/register', UserController.createUser);

// router.get('/me', verifyToken, UserController.getMyProfile);
// router.patch('/update-me', verifyToken, UserController.updateMyProfile);
// router.patch('/change-password', verifyToken, UserController.changePassword);

router.get('/:id', verifyToken, UserController.getUserById);
router.patch('/update/:id', verifyToken, UserController.updateUser);

export default router;
