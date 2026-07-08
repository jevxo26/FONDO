import { Router } from 'express';
import { TagController } from '../controllers/foodTagController';

const router = Router();

router.get('/', TagController.getAll);

export default router;
