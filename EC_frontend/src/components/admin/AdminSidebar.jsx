import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaShoppingBag,
  FaUserCircle,
} from "react-icons/fa";

const AdminSidebar = () => {

  const menus = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Categories",
      path: "/admin/categories",
      icon: <FaTags />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingBag />,
    },
    {
      title: "Profile",
      path: "/admin/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          EliteCart
        </h1>

        <p className="text-slate-400">
          Admin Panel
        </p>

      </div>

      <nav className="mt-6 px-3 space-y-2">

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.icon}

            {menu.title}

          </NavLink>

        ))}

      </nav>

    </aside>
  );
};

export default AdminSidebar;