import { useEffect, useState } from "react";

import { getMyOrders } from "../../services/orderService";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import OrderCard from "../../components/buyer/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders"
        message="You haven't placed any orders yet."
      />
    );
  }

  return (
    <section className="bg-slate-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        <div className="space-y-6">

          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Orders;