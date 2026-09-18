import express from "express";
import { 
  login, 
  verifyOtp, 
  resendOtp, 
  resetPassword, 
  getAnalytics,
  requestResetOtp,
  verifyResetOtp,
  requestEmailChangeOtp,
  verifyEmailChange
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/reset-password", resetPassword);
router.post("/request-reset-otp", requestResetOtp);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/request-email-change-otp", requestEmailChangeOtp);
router.post("/verify-email-change", verifyEmailChange);
router.get("/analytics", getAnalytics);

export default router;
