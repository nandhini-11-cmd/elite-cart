import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

import { successResponse } from "../utils/responseHandler.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Create Category
 */
export const create = async (req, res, next) => {
  try {
    const category = await createCategory(
      req.body,
      req.file,
      req.user._id
    );

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.CATEGORY_CREATED,
      category
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Categories
 */
export const getAll = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      "Categories fetched successfully.",
      categories
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Category By Id
 */
export const getOne = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      "Category fetched successfully.",
      category
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update Category
 */
export const update = async (req, res, next) => {
  try {
    const category = await updateCategory(
      req.params.id,
      req.body,
      req.file
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CATEGORY_UPDATED,
      category
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Category
 */
export const remove = async (req, res, next) => {
  try {
    await deleteCategory(req.params.id);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.CATEGORY_DELETED
    );
  } catch (error) {
    next(error);
  }
};