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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data =
      await getSellerOrders();

    setOrders(data);
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
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