import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

import { validateCategory } from "../validators/categoryValidator.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Create Category
 */
export const createCategory = async (
  categoryData,
  file,
  userId
) => {
  const { categoryName, description } = categoryData;

  // Validate Input
  const validationError = validateCategory({
    categoryName,
    description,
  });

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  // Check Duplicate Category
  const existingCategory = await Category.findOne({
  categoryName: {
    $regex: new RegExp(`^${categoryName.trim()}$`, "i"),
  },
});
  if (existingCategory) {
    const error = new Error(MESSAGES.CATEGORY_EXISTS);
    error.statusCode = STATUS_CODES.CONFLICT;
    throw error;
  }

  let categoryImage = {};

  // Upload Image
  if (file) {
    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "elite-cart/categories",
      }
    );

    categoryImage = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  }

  const category = await Category.create({
    categoryName: categoryName.toLowerCase(),
    description,
    categoryImage,
    createdBy: userId,
  });

  return category;
};

/**
 * Get Active Categories
 */
export const getAllCategories = async () => {
  return await Category.find({
    isActive: true,
  }).sort({
    categoryName: 1,
  });
};

/**
 * Get Category By Id
 */
export const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category || !category.isActive) {
    const error = new Error(MESSAGES.CATEGORY_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  return category;
};
/**
 * Update Category
 */
export const updateCategory = async (
  categoryId,
  categoryData,
  file
) => {
  const { categoryName, description } = categoryData;

  const category = await Category.findById(categoryId);

  if (!category || !category.isActive) {
    const error = new Error(MESSAGES.CATEGORY_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  // Duplicate Check
  if (
    categoryName &&
    categoryName.trim().toLowerCase() !==
      category.categoryName.toLowerCase()
  ) {
    const existingCategory = await Category.findOne({
      categoryName: {
        $regex: new RegExp(`^${categoryName.trim()}$`, "i"),
      },
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      const error = new Error(MESSAGES.CATEGORY_EXISTS);
      error.statusCode = STATUS_CODES.CONFLICT;
      throw error;
    }

    category.categoryName = categoryName.trim();
  }

  if (description) {
    category.description = description.trim();
  }

  // Replace Category Image
  if (file) {
    if (category.categoryImage?.public_id) {
      await cloudinary.uploader.destroy(
        category.categoryImage.public_id
      );
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "elite-cart/categories",
      }
    );

    category.categoryImage = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  }

  await category.save();

  return category;
};

/**
 * Soft Delete Category
 */
export const deleteCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category || !category.isActive) {
    const error = new Error(MESSAGES.CATEGORY_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  category.isActive = false;

  await category.save();

  return true;
};