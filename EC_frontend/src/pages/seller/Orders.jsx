import {
  useEffect,
  useState,
} from "react";

import {
  getSellerOrders,
} from "../../services/orderService";

import SellerOrderTable from "../../components/seller/SellerOrderTable";

const Orders = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data =
        await getSellerOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-10">
        Loading Orders...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-8">
        Seller Orders
      </h1>

      <SellerOrderTable
        orders={orders}
        refreshOrders={fetchOrders}
      />

    </div>
  );
};

export default Orders;