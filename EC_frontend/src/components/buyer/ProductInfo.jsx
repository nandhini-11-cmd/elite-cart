import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product }) => {

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

const { user } = useAuth();

const navigate = useNavigate();

  const handleAddToCart = async () => {
  if (!user) {
    toast.error("Please login first.");

    navigate("/login");

    return;
  }

  try {
    setAdding(true);

    await addToCart(
      product._id,
      quantity
    );

    toast.success("Product added to cart.");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to add to cart."
    );
  } finally {
    setAdding(false);
  }
};
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      "
    >
      {/* Brand */}

      <p className="text-gray-500 text-sm">
        {product.brand}
      </p>

      {/* Product Name */}

      <h1 className="text-3xl font-bold mt-2">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-2 mt-4">
        <FaStar className="text-yellow-400" />

        <span className="font-medium">
          {product.averageRating}
        </span>

        <span className="text-gray-500">
          ({product.totalReviews} Reviews)
        </span>
      </div>

      {/* Price */}

      <div className="mt-6 flex items-center gap-3">
        <span className="text-4xl font-bold text-blue-600">
          ₹{product.discountPrice}
        </span>

        <span className="text-gray-400 line-through text-xl">
          ₹{product.price}
        </span>
      </div>

      {/* Discount */}

      <p className="mt-2 text-green-600 font-semibold">
        {product.discountPercentage}% OFF
      </p>

      {/* Stock */}

      <div className="mt-6">
        {product.isOutOfStock ? (
          <span className="text-red-600 font-semibold">
            Out Of Stock
          </span>
        ) : (
          <span className="text-green-600 font-semibold">
            In Stock ({product.stock} Available)
          </span>
        )}
      </div>

      {/* Category */}

      <div className="mt-4">
        <span className="font-semibold">
          Category :
        </span>{" "}
        {product.category?.categoryName}
      </div>
      {/* Quantity */}

<div className="mt-8">
  <p className="font-semibold mb-3">
    Quantity
  </p>

  <div className="flex items-center gap-4">
    <button
      onClick={() =>
        setQuantity((prev) =>
          Math.max(1, prev - 1)
        )
      }
      className="
        w-10
        h-10
        rounded-lg
        border
        text-xl
        font-bold
        hover:bg-gray-100
      "
    >
      -
    </button>

    <span className="text-xl font-semibold w-8 text-center">
      {quantity}
    </span>

    <button
      onClick={() =>
        setQuantity((prev) =>
          Math.min(product.stock, prev + 1)
        )
      }
      className="
        w-10
        h-10
        rounded-lg
        border
        text-xl
        font-bold
        hover:bg-gray-100
      "
    >
      +
    </button>
  </div>
</div>

      {/* Buttons */}

      <div className="mt-8 flex flex-col gap-4">
        <button
  onClick={handleAddToCart}
  disabled={adding}
  className="
    bg-blue-600
    hover:bg-blue-700
    disabled:bg-gray-400
    text-white
    py-3
    rounded-xl
    font-semibold
    transition
  "
>
  {adding
    ? "Adding..."
    : "Add To Cart"}
</button>

        
      </div>
    </div>
  );
};

export default ProductInfo;