const CheckoutOrderSummary = ({
  cart,
  onCheckout,
  loading,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Items</span>

          <span>
            {cart?.items?.length || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            ₹{cart?.grandTotal || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span className="text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>
            ₹{cart?.grandTotal || 0}
          </span>
        </div>

        <button
        type="button"
          onClick={onCheckout}
          disabled={loading}
          className="
            w-full
            mt-6
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>

      </div>

    </div>
  );
};

export default CheckoutOrderSummary;