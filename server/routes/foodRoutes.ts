import { Router } from 'express';
import foodCategoryRoutes from './foodCategoryRoutes';
import foodTagRoutes from './foodTagRoutes';
import foodVariantRoutes from './foodVariantRoutes';
import foodAddonRoutes from './foodAddonRoutes';
import { FoodController } from '../controllers/foodController';

const router = Router();

router.use('/categories', foodCategoryRoutes);
router.use('/tags', foodTagRoutes);
router.use('/', foodVariantRoutes);
router.use('/', foodAddonRoutes);

router.get('/', FoodController.getAll);
router.get('/slug/:slug', FoodController.getBySlug);
router.get('/:id', FoodController.getById);
router.post('/', FoodController.create);
router.put('/:id', FoodController.update);
router.delete('/:id', FoodController.delete);

export default router;
