import mongoose from "mongoose";
import slugify from "slugify";

import imageSchema from "../schemas/imageSchema.js";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required."],
      unique: true,
      trim: true,
      minlength: [3, "Category name must be at least 3 characters."],
      maxlength: [50, "Category name cannot exceed 50 characters."],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters."],
    },

    categoryImage: {
      type: imageSchema,
      default: () => ({}),
    },

    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Generate Category Slug
 */
categorySchema.pre("save", function () {
  if (this.isModified("categoryName")) {
    this.slug = slugify(this.categoryName, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  
});

const Category = mongoose.model("Category", categorySchema);

export default Category;