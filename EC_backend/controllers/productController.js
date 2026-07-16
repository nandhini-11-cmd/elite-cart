import {
  createProduct as createProductService,
  getAllProducts,
  getFeaturedProducts as getFeaturedProductsService,
  getProductBySlug,
  getSellerProducts as getSellerProductsService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  toggleFeaturedProduct as toggleFeaturedProductService,
} from "../services/productService.js";

import { successResponse } from "../utils/responseHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Create Product
 */
export const createProduct = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
console.log("FILES:", req.files);
    const product = await createProductService(
      req.body,
      req.files,
      req.user._id
    );

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.PRODUCT_CREATED,
      product
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Products
 */
export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts(req.query);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCTS_FETCHED,
      products
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Featured Products
 */
export const getFeaturedProducts = async (
  req,
  res,
  next
) => {
  try {
    const products =
      await getFeaturedProductsService();

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCTS_FETCHED,
      products
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Product Details
 */
export const getProduct = async (
  req,
  res,
  next
) => {
  try {
    const product = await getProductBySlug(
      req.params.slug
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCT_FETCHED,
      product
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Seller Products
 */
export const getSellerProducts = async (
  req,
  res,
  next
) => {
  try {
    const products =
      await getSellerProductsService(
        req.user._id,
        req.query.page,
        req.query.limit
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCTS_FETCHED,
      products
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update Product
 */
export const updateProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await updateProductService(
        req.params.id,
        req.user._id,
        req.body,
        req.files
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCT_UPDATED,
      product
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Product
 */
export const deleteProduct = async (
  req,
  res,
  next
) => {
  try {
    await deleteProductService(
      req.params.id,
      req.user._id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCT_DELETED
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Feature / Unfeature Product
 */
export const toggleFeaturedProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await toggleFeaturedProductService(
        req.params.id
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PRODUCT_UPDATED,
      product
    );
  } catch (error) {
    next(error);
  }
};