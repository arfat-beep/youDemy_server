import express from "express";
const router = express.Router();
// controllers
import {
  register,
  login,
  logout,
  currentUser,
  sendTestEmail,
  forgotPassword,
} from "../controllers/auth";

// middlewares
import { requireSignin } from "../middlewares";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.get("/send-email", sendTestEmail);
router.post("/forgot-password", forgotPassword);

module.exports = router;
