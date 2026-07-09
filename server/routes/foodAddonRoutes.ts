import { Router } from 'express';
import { AddonController } from '../controllers/foodAddonController';

const router = Router();

router.post('/:foodId/addons', AddonController.create);
router.put('/addons/:id', AddonController.update);
router.delete('/addons/:id', AddonController.delete);
router.post('/addons/:addonId/items', AddonController.createItem);
router.put('/addon-items/:id', AddonController.updateItem);
router.delete('/addon-items/:id', AddonController.deleteItem);

export default router;
