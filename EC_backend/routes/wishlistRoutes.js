import express from "express";

import {
  add,
  getAll,
  remove,
} from "../controllers/wishlistController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Wishlist Routes                               */
/* -------------------------------------------------------------------------- */

router.post(
  "/:productId",
  protect,
  add
);

router.get(
  "/",
  protect,
  getAll
);

router.delete(
  "/:id",
  protect,
  remove
);

export default router;