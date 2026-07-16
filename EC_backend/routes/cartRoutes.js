import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
  toggleCartSelection,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                               Buyer Routes                                 */
/* -------------------------------------------------------------------------- */

router.use(protect, authorize(ROLES.BUYER));

/**
 * Get Cart
 */
router.get("/", getCart);

/**
 * Add Product To Cart
 */
router.post("/:productId", addToCart);

/**
 * Update Cart Quantity
 */
router.patch("/:id", updateCartQuantity);

/**
 * Select / Unselect Cart Item
 */
router.patch("/:id/select", toggleCartSelection);

/**
 * Remove Cart Item
 */
router.delete("/:id", removeCartItem);

/**
 * Clear Cart
 */
router.delete("/", clearCart);

export default router;