import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  registerSchema,
  loginSchema,
  otpSendSchema,
  otpVerifySchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "../validations/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/otp/send", validate(otpSendSchema), AuthController.sendOtp);
router.post("/otp/verify", validate(otpVerifySchema), AuthController.verifyOtp);
router.post("/refresh", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.get("/me", verifyToken, AuthController.me);
router.post("/forgot-password", validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), AuthController.resetPassword);
router.patch("/change-password", verifyToken, validate(changePasswordSchema), AuthController.changePassword);

export default router;
