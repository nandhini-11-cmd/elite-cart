import { useNavigate } from "react-router-dom";

const CheckoutSummary = ({ cart,onClearCart, }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">

      <h2 className="text-2xl font-bold">
        Order Summary
      </h2>

      <div className="flex justify-between mt-6">

        <span>Items</span>

        <span>{cart.items.length}</span>

      </div>

      <div className="flex justify-between mt-4">

        <span>Total</span>

        <span className="font-bold text-xl">
          ₹{cart.grandTotal}
        </span>

      </div>
      <button
  onClick={onClearCart}
  className="
    w-full
    mt-8
    border
    border-red-500
    text-red-500
    bg-red-100
    py-3
    rounded-xl
    hover:bg-red-550
    font-semibold
  "
>
  Clear Cart
</button>

      <button   onClick={() => navigate("/checkout")}

        className="
          w-full
          mt-8
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          font-semibold
        "
      >
        Proceed To Checkout
      </button>

    </div>
  );
};

export default CheckoutSummary;