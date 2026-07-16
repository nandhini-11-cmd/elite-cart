import express from "express";

import { dashboard } from "../controllers/sellerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                            Seller Dashboard                                */
/* -------------------------------------------------------------------------- */

router.get(
  "/dashboard",
  protect,
  authorize(ROLES.SELLER),
  dashboard
);

export default router;