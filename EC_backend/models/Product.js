import mongoose from "mongoose";
import slugify from "slugify";

import imageSchema from "../schemas/imageSchema.js";
import reviewSchema from "../schemas/reviewSchema.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters."],
      maxlength: [120, "Product name cannot exceed 120 characters."],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required."],
      trim: true,
      maxlength: [3000, "Description cannot exceed 3000 characters."],
    },

    brand: {
      type: String,
      required: [true, "Brand is required."],
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required."],
    },

    images: {
      type: [imageSchema],
      validate: {
        validator: (images) => images.length > 0,
        message: "At least one product image is required.",
      },
    },

    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [1, "Price must be greater than zero."],
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: [0, "Discount price cannot be negative."],
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: [true, "Stock is required."],
      min: [0, "Stock cannot be negative."],
      default: 0,
    },

    isOutOfStock: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Generate Slug
 * Calculate Discount Percentage
 * Update Stock Status
 */
productSchema.pre("save", function () {
  // Generate Product Slug
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  // Calculate Discount Percentage
  if (
    this.discountPrice > 0 &&
    this.discountPrice < this.price
  ) {
    this.discountPercentage = Math.round(
      ((this.price - this.discountPrice) / this.price) * 100
    );
  } else {
    this.discountPercentage = 0;
  }

  // Automatically Update Stock Status
  this.isOutOfStock = this.stock <= 0;

 
});

/**
 * Calculate Product Ratings
 */
productSchema.methods.calculateRatings = function () {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
    return;
  }

  const totalRating = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  this.totalReviews = this.reviews.length;

  this.averageRating = Number(
    (totalRating / this.reviews.length).toFixed(1)
  );
};

const Product = mongoose.model("Product", productSchema);

export default Product;