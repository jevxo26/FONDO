import { Router } from 'express';
import { isAdmin, verifyToken } from '../middlewares/authMiddleware';
import { VendorController } from '../controllers/vendorController';

const router = Router();

router.post('/', verifyToken, isAdmin, VendorController.createVendor);

export default router;
