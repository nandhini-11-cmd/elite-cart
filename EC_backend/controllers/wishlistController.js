import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../services/wishlistService.js";

import { successResponse } from "../utils/responseHandler.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Add To Wishlist
 */
export const add = async (
  req,
  res,
  next
) => {
  try {
    const wishlist =
      await addToWishlist(
        req.user._id,
        req.params.productId
      );

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.WISHLIST_ADDED,
      wishlist
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Wishlist
 */
export const getAll = async (
  req,
  res,
  next
) => {
  try {
    const wishlist =
      await getWishlist(
        req.user._id
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.WISHLIST_FETCHED,
      wishlist
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Remove Wishlist Item
 */
export const remove = async (
  req,
  res,
  next
) => {
  try {
    await removeWishlistItem(
      req.user._id,
      req.params.id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.WISHLIST_REMOVED
    );
  } catch (error) {
    next(error);
  }
};