import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="font-bold text-lg">
            {order.orderNumber}
          </h2>

          <p className="text-gray-500 text-sm">
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <span
          className="
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            bg-yellow-100
            text-yellow-700
          "
        >
          {order.orderStatus}
        </span>

      </div>

      {/* Products */}

      <div className="space-y-5">

        {order.orderItems.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 border-b pb-4"
          >

            <img
              src={item.productImage}
              alt={item.productName}
              className="w-20 h-20 rounded-lg border object-cover"
            />

            <div className="flex-1">

              <h3 className="font-semibold">
                {item.productName}
              </h3>

              <p className="text-gray-500">
                Qty : {item.quantity}
              </p>

              <p className="text-blue-600 font-bold mt-1">
                ₹{item.subtotal}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center mt-6">

        <h3 className="font-bold text-xl">
          ₹{order.totalAmount}
        </h3>

        <Link
          to={`/orders/${order._id}`}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default OrderCard;