import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

import { validateProduct } from "../validators/productValidator.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Create Product
 */
export const createProduct = async (
  productData,
  files,
  sellerId
) => {
  const {
    name,
    description,
    brand,
    category,
    price,
    discountPrice,
    stock,
  } = productData;

  // Validate Input
  const validationError = validateProduct({
    name,
    description,
    brand,
    category,
    price,
    stock,
  });

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  // Validate Category
  const categoryExists = await Category.findById(category);

  if (!categoryExists || !categoryExists.isActive) {
    const error = new Error(MESSAGES.CATEGORY_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  // Duplicate Product Name for Same Seller
  const existingProduct = await Product.findOne({
    seller: sellerId,
    name: {
      $regex: new RegExp(`^${name.trim()}$`, "i"),
    },
    isActive: true,
  });

  if (existingProduct) {
    const error = new Error(MESSAGES.PRODUCT_ALREADY_EXISTS);
    error.statusCode = STATUS_CODES.CONFLICT;
    throw error;
  }

  // Upload Images
  const uploadedImages = [];

  if (files?.length) {
    for (const file of files) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "elite-cart/products",
        }
      );

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }
  } 
 /*const uploadedImages = [];
uploadedImages.push({
        url: "https://dummyimage.com/600x600/cccccc/000000.jpg" ,
        public_id: "dummy-image",
      });  */


  const product = await Product.create({
    name: name.trim(),
    description: description.trim(),
    brand: brand.trim(),
    category,
    seller: sellerId,
    images: uploadedImages,
    price,
    discountPrice,
    stock,
  });
  

  return product;
};

/**
 * Get All Products
 */
export const getAllProducts = async (queryParams) => {
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 12,
    featured,
  } = queryParams;

  const filters = {
    isActive: true,
  };

  // Search
  if (search) {
    filters.name = {
      $regex: search,
      $options: "i",
    };
  }

  // Category
  if (category) {
    filters.category = category;
  }

  // Brand
  if (brand) {
    filters.brand = {
      $regex: `^${brand}$`,
      $options: "i",
    };
  }

  // Price
  if (minPrice || maxPrice) {
    filters.price = {};

    if (minPrice) {
      filters.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filters.price.$lte = Number(maxPrice);
    }
  }

  // Featured
  if (featured === "true") {
    filters.isFeatured = true;
  }

  // Sorting
  let sortOption = {
    createdAt: -1,
  };

  switch (sort) {
    case "price_asc":
      sortOption = {
        price: 1,
      };
      break;

    case "price_desc":
      sortOption = {
        price: -1,
      };
      break;

    case "rating":
      sortOption = {
        averageRating: -1,
      };
      break;

    case "popular":
      sortOption = {
        soldCount: -1,
      };
      break;

    case "latest":
      sortOption = {
        createdAt: -1,
      };
      break;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const totalProducts =
    await Product.countDocuments(filters);

  const products = await Product.find(filters)
    .populate("category", "categoryName")
    .populate("seller", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  return {
    products,

    pagination: {
      currentPage: Number(page),

      totalPages: Math.ceil(
        totalProducts / Number(limit)
      ),

      totalProducts,

      limit: Number(limit),
    },
  };
};

/**
 * Get Featured Products
 */
export const getFeaturedProducts = async () => {
  return await Product.find({
    isFeatured: true,
    isActive: true,
  })
    .populate("category", "categoryName")
    .sort({
      createdAt: -1,
    })
    .limit(10);
};

/**
 * Get Product By Slug
 */
export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    slug,
    isActive: true,
  })
    .populate("category")
    .populate("seller", "name email");

  if (!product) {
    const error = new Error(
      MESSAGES.PRODUCT_NOT_FOUND
    );

    error.statusCode =
      STATUS_CODES.NOT_FOUND;

    throw error;
  }

  return product;
};

/**
 * Get Seller Products
 */
export const getSellerProducts = async (
  sellerId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const totalProducts = await Product.countDocuments({
    seller: sellerId,
    isActive: true,
  });

  const products = await Product.find({
    seller: sellerId,
    isActive: true,
  })
    .populate("category", "categoryName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    products,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      limit: Number(limit),
    },
  };
};

/**
 * Update Product
 */
export const updateProduct = async (
  productId,
  sellerId,
  productData,
  files
) => {
  const product = await Product.findOne({
    _id: productId,
    seller: sellerId,
    isActive: true,
  });

  if (!product) {
    const error = new Error(MESSAGES.PRODUCT_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  // Duplicate Product Name
  if (
    productData.name &&
    productData.name.trim().toLowerCase() !==
      product.name.toLowerCase()
  ) {
    const existingProduct = await Product.findOne({
      seller: sellerId,
      name: {
        $regex: new RegExp(
          `^${productData.name.trim()}$`,
          "i"
        ),
      },
      _id: { $ne: productId },
      isActive: true,
    });

    if (existingProduct) {
      const error = new Error(
        MESSAGES.PRODUCT_ALREADY_EXISTS
      );
      error.statusCode = STATUS_CODES.CONFLICT;
      throw error;
    }

    product.name = productData.name.trim();
  }

  if (productData.description)
    product.description = productData.description.trim();

  if (productData.brand)
    product.brand = productData.brand.trim();

  if (productData.category)
    product.category = productData.category;

  if (productData.price)
    product.price = Number(productData.price);

  if (productData.discountPrice !== undefined)
    product.discountPrice = Number(
      productData.discountPrice
    );

  if (productData.stock !== undefined)
    product.stock = Number(productData.stock);

  /**
   * Replace Images
   */
  if (files?.length) {
    // Delete old images
    for (const image of product.images) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(
          image.public_id
        );
      }
    }

    const uploadedImages = [];

    for (const file of files) {
      const uploadResult =
        await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`,
          {
            folder: "elite-cart/products",
          }
        );

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }

    product.images = uploadedImages;
  }

  await product.save();

  return product;
};

/**
 * Soft Delete Product
 */
export const deleteProduct = async (
  productId,
  sellerId
) => {
  const product = await Product.findOne({
    _id: productId,
    seller: sellerId,
    isActive: true,
  });

  if (!product) {
    const error = new Error(
      MESSAGES.PRODUCT_NOT_FOUND
    );
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  product.isActive = false;

  await product.save();

  return true;
};

/**
 * Feature / Unfeature Product
 */
export const toggleFeaturedProduct = async (
  productId
) => {
  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error(
      MESSAGES.PRODUCT_NOT_FOUND
    );
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  product.isFeatured = !product.isFeatured;

  await product.save();

  return product;
};