import { Router } from 'express';
import { CategoryController } from '../controllers/foodCategoryController';

const router = Router();

router.get('/', CategoryController.getAll);
router.get('/:slug', CategoryController.getBySlug);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;
