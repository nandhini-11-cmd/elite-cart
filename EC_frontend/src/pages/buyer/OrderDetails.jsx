import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderById,cancelOrder } from "../../services/orderService";

import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";


const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data =
        await getOrderById(id);

      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
  try {
    const updatedOrder =
      await cancelOrder(id);

    setOrder(updatedOrder);

    toast.success(
      "Order cancelled successfully."
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to cancel order."
    );
  }
};

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        Order Not Found
      </div>
    );
  }
  

 return (
  <section className="bg-slate-100 min-h-screen py-10">

    <div className="max-w-6xl mx-auto px-4">

      <h1 className="text-3xl font-bold mb-8">
        Order Details
      </h1>

      {/* Order Information */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">
              Order Number
            </p>

            <h2 className="text-xl font-bold mt-1">
              {order.orderNumber}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Order Date
            </p>

            <h2 className="text-xl font-semibold mt-1">
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Order Status
            </p>

            <span
              className="
                inline-block
                mt-2
                px-4
                py-1
                rounded-full
                bg-yellow-100
                text-yellow-700
                font-semibold
              "
            >
              {order.orderStatus}
            </span>
          </div>

          <div>
            <p className="text-gray-500">
              Payment Status
            </p>

            <span
              className="
                inline-block
                mt-2
                px-4
                py-1
                rounded-full
                bg-blue-100
                text-blue-700
                font-semibold
              "
            >
              {order.paymentStatus}
            </span>
          </div>

        </div>

      </div>

      {/* Shipping Address */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

        <h2 className="text-2xl font-bold mb-5">
          Shipping Address
        </h2>

        <div className="space-y-2">

          <h3 className="text-lg font-semibold">
            {order.shippingAddress.fullName}
          </h3>

          <p>
            {order.shippingAddress.phone}
          </p>

          <p>
            {order.shippingAddress.addressLine}
          </p>

          <p>
            {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}
          </p>

          <p>
            {order.shippingAddress.pincode}
          </p>

          <p>
            {order.shippingAddress.country}
          </p>

        </div>

      </div>

      {/* Ordered Products */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

        <h2 className="text-2xl font-bold mb-6">
          Ordered Products
        </h2>

        <div className="space-y-6">

          {order.orderItems.map(
            (item, index) => (

              <div
                key={index}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-5
                  border-b
                  pb-5
                "
              >

                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="
                    w-28
                    h-28
                    rounded-xl
                    border
                    object-cover
                  "
                />

                <div className="flex-1">

                  <h3 className="text-xl font-semibold">
                    {item.productName}
                  </h3>

                  <div className="mt-3 space-y-2">

                    <p>
                      <span className="font-semibold">
                        Price :
                      </span>{" "}
                      ₹{item.price}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Quantity :
                      </span>{" "}
                      {item.quantity}
                    </p>

                    <p className="text-blue-600 font-bold text-lg">
                      Subtotal : ₹{item.subtotal}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* Payment Details */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

        <h2 className="text-2xl font-bold mb-6">
          Payment Details
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Payment Method</span>

            <span className="font-semibold">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Payment Status</span>

            <span className="font-semibold">
              {order.paymentStatus}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>

            <span>
              ₹{order.totalAmount}
            </span>
          </div>

          {order.orderStatus ===
            "Pending" && (
            <button
              onClick={
                handleCancelOrder
              }
              className="
                mt-4
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Cancel Order
            </button>
          )}

        </div>

      </div>

    </div>

  </section>
);
};
export default OrderDetails;