import express from "express";

import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

router.get(
  "/:productId",
  getProductReviews
);

/* -------------------------------------------------------------------------- */
/*                              Buyer Routes                                  */
/* -------------------------------------------------------------------------- */

router.post(
  "/:productId",
  protect,
  authorize(ROLES.BUYER),
  addReview
);

router.put(
  "/:reviewId",
  protect,
  authorize(ROLES.BUYER),
  updateReview
);

router.delete(
  "/:reviewId",
  protect,
  authorize(ROLES.BUYER),
  deleteReview
);

export default router;