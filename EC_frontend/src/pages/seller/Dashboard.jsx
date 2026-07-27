import { useEffect, useState } from "react";

import DashboardCard from "../../components/seller/DashboardCard";
import { getSellerDashboard } from "../../services/sellerService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getSellerDashboard();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dashboard) {
    return <p>Failed to load dashboard.</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Seller Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <DashboardCard
          title="Total Products"
          value={dashboard.totalProducts}
        />

        <DashboardCard
          title="Total Orders"
          value={dashboard.totalOrders}
        />

        <DashboardCard
          title="Revenue"
          value={`₹${dashboard.totalRevenue}`}
        />

        <DashboardCard
          title="Pending Orders"
          value={dashboard.pendingOrders}
        />

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Orders
        </h2>

        {dashboard.recentOrders.length === 0 ? (

          <p className="text-gray-500">
            No recent orders found.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Order
                  </th>

                  <th className="text-left">
                    Customer
                  </th>

                  <th className="text-left">
                    Amount
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recentOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {order.orderNumber}
                    </td>

                    <td>
                      {order.user?.name}
                    </td>

                    <td>
                      ₹{order.totalAmount}
                    </td>

                    <td>

                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                        {order.orderStatus}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );
};

export default Dashboard;