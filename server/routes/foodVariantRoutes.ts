import { Router } from 'express';
import { VariantController } from '../controllers/foodVariantController';

const router = Router();

router.post('/:foodId/variants', VariantController.create);
router.put('/variants/:id', VariantController.update);
router.delete('/variants/:id', VariantController.delete);

export default router;
