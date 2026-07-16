import express from "express";

import {
  createProduct,
  getProducts,
  getFeaturedProducts,
  getProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  toggleFeaturedProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

/* -------------------------------------------------------------------------- */
/*                              Seller Routes                                 */
/* -------------------------------------------------------------------------- */

router.get(
  "/seller/my-products",
  protect,
  authorize(ROLES.SELLER),
  getSellerProducts
);

router.post(
  "/",
  protect,
  authorize(ROLES.SELLER),
  upload.array("images", 10),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize(ROLES.SELLER),
  upload.array("images", 10),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize(ROLES.SELLER),
  deleteProduct
);

/* -------------------------------------------------------------------------- */
/*                               Admin Routes                                 */
/* -------------------------------------------------------------------------- */

router.patch(
  "/:id/feature",
  protect,
  authorize(ROLES.ADMIN),
  toggleFeaturedProduct
);

/* -------------------------------------------------------------------------- */
/*                       Dynamic Route - Keep Last                            */
/* -------------------------------------------------------------------------- */

router.get("/:slug", getProduct);

export default router;