import { FaTrash } from "react-icons/fa";
import {
  updateCartQuantity,removeCartItem
} from "../../services/cartService";
import toast from "react-hot-toast";

const CartItem = ({ item,fetchCart }) => {
  const product = item.product;
  const handleQuantity = async (
  newQuantity
) => {
  if (
    newQuantity < 1 ||
    newQuantity > product.stock
  ) {
    return;
  }

  try {
    await updateCartQuantity(
      item._id,
      newQuantity
    );

    fetchCart();
  } catch (error) {
    console.error(error);
  }
};

const handleRemove = async () => {
  try {
    await removeCartItem(item._id);

    toast.success("Item removed from cart.");

    fetchCart();
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to remove item."
    );
  }
};
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex gap-5">

      {/* Product Image */}

      <img
        src={product.images?.[0]?.url}
        alt={product.name}
        className="w-32 h-32 object-contain rounded-lg border"
      />

      {/* Product Details */}

      <div className="flex-1">

        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        <h2 className="text-xl font-semibold mt-1">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {product.category?.categoryName}
        </p>

        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-bold text-blue-600">
            ₹{item.unitPrice}
          </span>

          <span className="text-gray-400 line-through">
            ₹{product.price}
          </span>

        </div>

        <div className="mt-5 flex items-center gap-3">

  <button
  onClick={() =>
    handleQuantity(item.quantity - 1)
  }
  disabled={item.quantity === 1}
  className="
    w-9
    h-9
    border
    rounded-lg
    hover:bg-gray-100
    disabled:bg-gray-100
    disabled:text-gray-400
    disabled:cursor-not-allowed
  "
>
  -
</button>

  <span className="font-semibold text-lg">
    {item.quantity}
  </span>

  <button
  onClick={() =>
    handleQuantity(item.quantity + 1)
  }
  disabled={item.quantity >= product.stock}
  className="
    w-9
    h-9
    border
    rounded-lg
    hover:bg-gray-100
    disabled:bg-gray-100
    disabled:text-gray-400
    disabled:cursor-not-allowed
  "
>
  +
</button>

</div>
<div className="mt-4">
  <span className="font-semibold">
    Subtotal :
  </span>

  <span className="ml-2 text-blue-600 font-bold">
    ₹{item.totalPrice}
  </span>
</div>

      </div>


      {/* Remove */}

      <button  onClick={handleRemove}
        className="text-red-500 hover:text-red-700"
      >
        <FaTrash size={20} />
      </button>

    </div>
  );
};

export default CartItem;