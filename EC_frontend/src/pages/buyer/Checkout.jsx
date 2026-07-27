import { useEffect, useState } from "react";
import { getCart } from "../../services/cartService";
import ShippingAddress from "../../components/buyer/ShippingAddress";
import OrderReview from "../../components/buyer/OrderReview";
import CheckoutOrderSummary from "../../components/buyer/CheckoutOrderSummary";
import PaymentMethod from "../../components/buyer/PaymentMethod";
import { checkout, } from "../../services/orderService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { createPaymentOrder,  verifyPayment,} from "../../services/paymentService";

const Checkout = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

const [placingOrder, setPlacingOrder] =
  useState(false);

const { fetchCart: refreshCart } =
  useCart();

const [loading, setLoading] =
  useState(true);
  const [paymentMethod, setPaymentMethod] =
  useState("Razorpay");

    const [shippingAddress, setShippingAddress] =
  useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const fetchCart = async () => {
  try {
    const data = await getCart();

    setCart(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const handleCheckout = async () => {
  try {
    setPlacingOrder(true);

    const order = await checkout(
      shippingAddress,
      paymentMethod
    );

    toast.success("Order placed successfully.");

    await refreshCart();

    if (paymentMethod === "COD") {
      navigate("/orders");
    } else {
      console.log(order);      

      // Razorpay next
      const razorpayOrder =
  await createPaymentOrder(order._id);
  console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,

  amount: razorpayOrder.amount,

  currency: razorpayOrder.currency,

  name: "EliteCart",

  description: "Order Payment",

  order_id: razorpayOrder.id,

 handler: async (response) => {
  try {
    await verifyPayment(response);

    toast.success("Payment Successful!");

    await refreshCart();

    navigate("/orders");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Payment verification failed."
    );
  }
},

  prefill: {
    name: shippingAddress.fullName,

    email: "",

    contact: shippingAddress.phone,
  },

  theme: {
    color: "#2563EB",
  },
};

const paymentObject =
  new window.Razorpay(options);

paymentObject.open();
    }
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Checkout failed."
    );
  } finally {
    setPlacingOrder(false);
  }
};
useEffect(() => {
  fetchCart();
}, []);
if (loading) {
  return <p>Loading...</p>;
}
  return (
    <section className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-6">

            {/* Address */}
{/* Address */}

<ShippingAddress
  shippingAddress={shippingAddress}
  setShippingAddress={setShippingAddress}
/>

            {/* Order Review */}

           <OrderReview cart={cart} />

            {/* Payment */}

            <PaymentMethod
  paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}
/>

          </div>

          {/* Right Side */}

          <div>

            <CheckoutOrderSummary
  cart={cart}
  onCheckout={handleCheckout}
  loading={placingOrder}
/>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Checkout;