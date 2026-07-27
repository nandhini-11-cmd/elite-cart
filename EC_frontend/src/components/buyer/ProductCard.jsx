import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
  const image =
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/400x400?text=No+Image";

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
      "
    >
      {/* Image */}

      <Link to={`/products/${product.slug}`}>
        <div className="h-60 overflow-hidden bg-slate-100">
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
        </div>
      </Link>

      {/* Content */}

      <div className="p-4">

        <p className="text-sm text-slate-500">
          {product.brand}
        </p>

        <h3
          className="
            text-lg
            font-semibold
            mt-1
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

        {/* Price */}

        <div className="mt-3 flex items-center gap-2">

          <span className="text-2xl font-bold text-blue-600">
            ₹{product.discountPrice || product.price}
          </span>

          {product.discountPrice > 0 && (
            <span className="text-sm line-through text-slate-400">
              ₹{product.price}
            </span>
          )}

        </div>

        {/* Discount */}

        {product.discountPercentage > 0 && (
          <p className="text-green-600 text-sm mt-1">
            {product.discountPercentage}% OFF
          </p>
        )}

        {/* Button */}

      <button
  onClick={() =>
    navigate(`/products/${product.slug}`)
  }
  className="
    w-full
    mt-5
    bg-blue-600
    hover:bg-blue-700
    text-white
    py-3
    rounded-lg
    font-semibold
    transition
  "
>
  View Details
</button>

      </div>
    </div>
  );
};

export default ProductCard;