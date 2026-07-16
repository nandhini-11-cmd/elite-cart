import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

router.get("/", getAll);

router.get("/:id", getOne);

/* -------------------------------------------------------------------------- */
/*                              Admin Routes                                  */
/* -------------------------------------------------------------------------- */

router.post(
  "/",
  protect,
  authorize(ROLES.ADMIN),
  upload.single("categoryImage"),
  create
);

router.put(
  "/:id",
  protect,
  authorize(ROLES.ADMIN),
  upload.single("categoryImage"),
  update
);

router.delete(
  "/:id",
  protect,
  authorize(ROLES.ADMIN),
  remove
);

export default router;