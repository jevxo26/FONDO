import { Router } from "express";
import { AddressController } from "../controllers/addressController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validations/address.validation";

const router = Router();

router.use(verifyToken);

router.get("/", AddressController.list);
router.post("/", validate(createAddressSchema), AddressController.create);
router.patch("/:id", validate(updateAddressSchema), AddressController.update);
router.delete("/:id", AddressController.remove);
router.patch("/:id/default", AddressController.setDefault);

export default router;
