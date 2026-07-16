import express from "express";

import {
  register,
  login,
  profile,
  updateUserProfile,
  updatePassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.post("/register", register);
router.post("/login", login);

/**
 * Protected Routes
 */
router.get("/profile", protect, profile);

router.put("/profile", protect, updateUserProfile);

router.put(
  "/change-password",
  protect,
  updatePassword
);

export default router;