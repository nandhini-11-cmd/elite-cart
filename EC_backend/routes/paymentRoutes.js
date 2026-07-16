import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Buyer Payment APIs                            */
/* -------------------------------------------------------------------------- */

router.post(
  "/create-order",
  protect,
  authorize(ROLES.BUYER),
  createPaymentOrder
);

router.post(
  "/verify",
  protect,
  authorize(ROLES.BUYER),
  verifyPayment
);

export default router;