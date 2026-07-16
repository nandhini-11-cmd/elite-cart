import express from "express";

import {
  checkout,
  getMyOrders,
  getOrder,
  cancelOrder,
  getSellerOrders,
  updateOrderStatus,
  completeOrder,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                               Buyer Routes                                 */
/* -------------------------------------------------------------------------- */

router.post(
  "/checkout",
  protect,
  authorize(ROLES.BUYER),
  checkout
);

router.get(
  "/my-orders",
  protect,
  authorize(ROLES.BUYER),
  getMyOrders
);

router.get(
  "/:id",
  protect,
  authorize(ROLES.BUYER),
  getOrder
);

router.patch(
  "/:id/cancel",
  protect,
  authorize(ROLES.BUYER),
  cancelOrder
);

/* -------------------------------------------------------------------------- */
/*                               Seller Routes                                */
/* -------------------------------------------------------------------------- */

router.get(
  "/seller/orders",
  protect,
  authorize(ROLES.SELLER),
  getSellerOrders
);

router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.SELLER),
  updateOrderStatus
);

/* -------------------------------------------------------------------------- */
/*                            Payment Completion                              */
/* -------------------------------------------------------------------------- */

router.patch(
  "/:id/payment-success",
  protect,
  authorize(ROLES.BUYER),
  completeOrder
);

export default router;