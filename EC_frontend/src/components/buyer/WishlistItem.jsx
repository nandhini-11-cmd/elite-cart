import { Link } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  removeWishlistItem,
} from "../../services/wishlistService";

import {
  addToCart,
} from "../../services/cartService";

import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";

const WishlistItem = ({
  item,
  fetchWishlist,
}) => {
  const { fetchWishlist: refreshWishlistBadge } =
    useWishlist();

  const { fetchCart: refreshCartBadge } =
    useCart();

  const product = item.product;

  const image =
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/400x400?text=No+Image";

  const handleRemove = async () => {
    try {
      await removeWishlistItem(item._id);

      toast.success(
        "Removed from Wishlist"
      );

      await fetchWishlist();

      await refreshWishlistBadge();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to remove item."
      );
    }
  };

  const handleAddToCart = async () => {
  try {
    // Try to add to cart
    await addToCart(product._id, 1);

    // Remove from wishlist
    await removeWishlistItem(item._id);

    toast.success(
      "Added to Cart and removed from Wishlist"
    );

    // Refresh page & navbar badges
    await fetchWishlist();
    await refreshWishlistBadge();
    await refreshCartBadge();

  } catch (error) {
    console.error(error);

    const message =
      error?.response?.data?.message || "";

    // If product is already in cart,
    // still remove it from wishlist
    if (
      message.toLowerCase().includes("already")
    ) {
      try {
        await removeWishlistItem(item._id);

        toast.success(
          "Already in Cart. Removed from Wishlist."
        );

        await fetchWishlist();
        await refreshWishlistBadge();
        await refreshCartBadge();
      } catch (removeError) {
        console.error(removeError);

        toast.error(
          "Failed to remove from Wishlist."
        );
      }

      return;
    }

    toast.error(
      message || "Failed to add to cart."
    );
  }
};

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-xl
        transition
        duration-300
        overflow-hidden
        group
        flex
        flex-col
      "
    >
      {/* Image */}

      <Link
        to={`/products/${product.slug}`}
      >
        <div className="relative h-56 bg-slate-100 overflow-hidden">

          <img
            src={image}
            alt={product.name}
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition
              duration-300
            "
          />

          <button
            onClick={handleRemove}
            className="
              absolute
              top-3
              right-3
              w-10
              h-10
              rounded-full
              bg-white
              shadow-md
              hover:bg-red-50
              flex
              items-center
              justify-center
            "
          >
            <FaTrash
              className="text-red-500"
            />
          </button>

        </div>
      </Link>

      {/* Content */}

      <div className="p-4 flex flex-col flex-1">

        <p className="text-sm text-slate-500">
          {product.brand}
        </p>

        <h3
          className="
            mt-1
            font-semibold
            text-lg
            line-clamp-2
            min-h-[56px]
          "
        >
          {product.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-2 mt-2">

          <div className="flex items-center text-yellow-500">

            <FaStar />

            <span className="ml-1 text-sm text-slate-700">
              {product.averageRating || 0}
            </span>

          </div>

          <span className="text-sm text-slate-400">
            ({product.totalReviews || 0})
          </span>

        </div>

        {/* Category */}

        <p className="text-sm text-slate-500 mt-2">
          Category :
          {" "}
          {product.category?.categoryName}
        </p>

        {/* Price */}

        <div className="mt-3">

          <span className="text-2xl font-bold text-blue-600">
            ₹
            {product.discountPrice ||
              product.price}
          </span>

          {product.discountPrice >
            0 && (
            <span
              className="
                ml-2
                line-through
                text-slate-400
              "
            >
              ₹{product.price}
            </span>
          )}

        </div>

        {/* Stock */}

        <div className="mt-2">

          <span
            className={`
              text-xs
              px-3
              py-1
              rounded-full
              font-medium
              ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>

        </div>

        {/* Button */}

        <button
          onClick={handleAddToCart}
          disabled={
            product.stock === 0
          }
          className="
            mt-auto
            w-full
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-slate-400
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            mt-5
          "
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default WishlistItem;