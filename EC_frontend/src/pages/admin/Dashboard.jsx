import { useEffect, useState } from "react";

import { getAdminDashboard } from "../../services/adminService";

import AdminDashboardCard from "../../components/admin/DashboardCard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <p className="text-center py-10">
        Loading Dashboard...
      </p>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <AdminDashboardCard
          title="Total Users"
          value={dashboard.totalUsers}
        />

        <AdminDashboardCard
          title="Total Buyers"
          value={dashboard.totalBuyers}
        />

        <AdminDashboardCard
          title="Total Sellers"
          value={dashboard.totalSellers}
        />

        <AdminDashboardCard
          title="Total Categories"
          value={dashboard.totalCategories}
        />

        <AdminDashboardCard
          title="Total Products"
          value={dashboard.totalProducts}
        />

        <AdminDashboardCard
          title="Total Orders"
          value={dashboard.totalOrders}
        />

        <AdminDashboardCard
          title="Revenue"
          value={`₹${dashboard.totalRevenue}`}
        />

        <AdminDashboardCard
          title="Delivered Orders"
          value={dashboard.deliveredOrders}
        />

      </div>

      {/* Recent Users */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Recent Users
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {dashboard.recentUsers.map((user) => (

              <tr
                key={user._id}
                className="border-b"
              >

                <td className="py-3">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td className="capitalize">
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Orders
        </h2>

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

                <td className="py-3">
                  {order.orderNumber}
                </td>

                <td>
                  {order.user?.name}
                </td>

                <td>
                  ₹{order.totalAmount}
                </td>

                <td>
                  {order.orderStatus}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Dashboard;