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
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[750px]">

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

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="text-center py-10 text-slate-500"
                >
                  No Orders Found
                </td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="p-4">
                    {order.user?.name}
                  </td>

                  <td className="p-4 font-semibold">
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
                      className="
                        w-full
                        min-w-[180px]
                        border
                        rounded-lg
                        px-3
                        py-2
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
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

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SellerOrderTable;