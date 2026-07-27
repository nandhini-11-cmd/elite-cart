import {
  updateOrderStatus,
} from "../../services/orderService";
import toast from "react-hot-toast";

const SellerOrderTable = ({
  orders,
  refreshOrders,
}) => {

  const statuses = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
    "Cancelled",
  ];

  const handleStatus = async (
  orderId,
  status
) => {
  try {
    await updateOrderStatus(
      orderId,
      status
    );

    toast.success(
      "Order status updated successfully."
    );

    refreshOrders();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update order status."
    );
  }
};
  return (
    <div className="bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Order
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order._id}
              className="border-t"
            >

              <td className="p-4">
                {order.orderNumber}
              </td>

              <td className="p-4">
                {order.user?.name}
              </td>

              <td className="p-4">
                ₹{order.totalAmount}
              </td>

              <td className="p-4">

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-3 py-2"
                >

                  {statuses.map((status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>

                  ))}

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default SellerOrderTable;