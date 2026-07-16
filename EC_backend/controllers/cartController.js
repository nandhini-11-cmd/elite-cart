import {
  addToCart as addToCartService,
  getCart as getCartService,
  updateCartQuantity as updateCartQuantityService,
  removeCartItem as removeCartItemService,
  clearCart as clearCartService,
  toggleCartSelection as toggleCartSelectionService,
} from "../services/cartService.js";

import { successResponse } from "../utils/responseHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Add Product To Cart
 */
export const addToCart = async (req, res, next) => {
  try {
    const { quantity = 1 } = req.body;

    const cart = await addToCartService(
      req.user._id,
      req.params.productId,
      quantity
    );

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.CART_ITEM_ADDED,
      cart
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Cart
 */
export const getCart = async (req, res, next) => {
  try {
    const cart = await getCartService(req.user._id);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CART_FETCHED,
      cart
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update Quantity
 */
export const updateCartQuantity = async (
  req,
  res,
  next
) => {
  try {
    const { quantity } = req.body;

    const cart =
      await updateCartQuantityService(
        req.user._id,
        req.params.id,
        quantity
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CART_UPDATED,
      cart
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Remove Item
 */
export const removeCartItem = async (
  req,
  res,
  next
) => {
  try {
    await removeCartItemService(
      req.user._id,
      req.params.id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CART_ITEM_REMOVED
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Clear Cart
 */
export const clearCart = async (
  req,
  res,
  next
) => {
  try {
    await clearCartService(req.user._id);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CART_CLEARED
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle Selection
 */
export const toggleCartSelection = async (
  req,
  res,
  next
) => {
  try {
    const cart =
      await toggleCartSelectionService(
        req.user._id,
        req.params.id
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CART_UPDATED,
      cart
    );
  } catch (error) {
    next(error);
  }
};