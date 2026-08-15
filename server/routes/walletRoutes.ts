import { Router } from "express";
import { verifyToken, authorize, hasPermission } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { WalletController } from "../controllers/walletController";
import { topupSchema, withdrawSchema } from "../validations/wallet.validation";

const router = Router();

// Public callback
router.get("/wallet/topup/success", WalletController.topupSuccess);

// Customer
router.get("/wallet", verifyToken, authorize("CUSTOMER"), WalletController.get);
router.get(
  "/wallet/transactions",
  verifyToken,
  authorize("CUSTOMER"),
  WalletController.transactions,
);
router.post(
  "/wallet/topup",
  verifyToken,
  authorize("CUSTOMER"),
  validate(topupSchema),
  WalletController.topup,
);
router.post(
  "/wallet/withdraw",
  verifyToken,
  authorize("CUSTOMER"),
  validate(withdrawSchema),
  WalletController.withdraw,
);

// Admin
router.get(
  "/wallet/withdrawals",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  hasPermission("settings"),
  WalletController.listWithdrawals,
);
router.patch(
  "/wallet/withdraw/:id/approve",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  hasPermission("settings"),
  WalletController.approveWithdraw,
);
router.patch(
  "/wallet/withdraw/:id/reject",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  hasPermission("settings"),
  WalletController.rejectWithdraw,
);

export default router;
