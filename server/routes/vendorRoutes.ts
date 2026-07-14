import { Router } from 'express';
import { isAdmin, verifyToken } from '../middlewares/authMiddleware';
import { VendorController } from '../controllers/vendorController';

const router = Router();

router.get('/', verifyToken, isAdmin, VendorController.getAllVendors);
router.post('/', verifyToken, isAdmin, VendorController.createVendor);

export default router;
