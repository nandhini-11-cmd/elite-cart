import express from "express";

import { dashboard } from "../controllers/buyerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                             Buyer Dashboard                                */
/* -------------------------------------------------------------------------- */

router.get(
  "/dashboard",
  protect,
  authorize(ROLES.BUYER),
  dashboard
);

export default router;