import express from "express";

import { dashboard } from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                            Admin Dashboard                                 */
/* -------------------------------------------------------------------------- */

router.get(
  "/dashboard",
  protect,
  authorize(ROLES.ADMIN),
  dashboard
);

export default router;