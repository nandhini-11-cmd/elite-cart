import { useEffect, useState } from "react";

import { getCart } from "../../services/cartService";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import CartItem from "../../components/buyer/CartItem";
import CheckoutSummary from "../../components/buyer/CheckoutSummary";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "../../services/cartService";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const { fetchCart: refreshCartBadge } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };
  const handleClearCart = async () => {
  try {
    await clearCart();

    toast.success("Cart cleared.");

    await fetchCart();          // Refresh Cart page

    await refreshCartBadge();   // Refresh Navbar badge
  } catch (error) {
    console.error(error);

    toast.error("Failed to clear cart.");
  }
};

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        {error}
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
  return (
    <div className="py-20">
      <EmptyState
        title="Your Cart is Empty"
        message="Add products to continue shopping."
      />

      <div className="text-center mt-8">
        <Link
          to="/products"
          className="
            inline-block
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-blue-700
          "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
  return (
    <section className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-5">

           {cart.items.map((item) => (
  <CartItem
    key={item._id}
    item={item}
    fetchCart={fetchCart}
  />
))}

          </div>

          <CheckoutSummary
  cart={cart}
  onClearCart={handleClearCart}
/>

        </div>

      </div>
    </section>
  );
};

export default Cart;