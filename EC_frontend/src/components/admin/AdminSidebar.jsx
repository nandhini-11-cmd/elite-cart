import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaShoppingBag,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          w-64
          h-screen
          bg-slate-900
          text-white
          flex
          flex-col
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
          lg:static
        `}
      >
        {/* Logo */}

        <div className="flex items-center justify-between p-6 border-b border-slate-700">

          <div>

            <h1 className="text-3xl font-bold">
              EliteCart
            </h1>

            <p className="text-slate-400">
              Admin Panel
            </p>

          </div>

          {/* Close Button */}

          <button
            className="lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* Menu */}

        <nav className="mt-6 px-3 space-y-2 flex-1">

          {menus.map((menu) => (

            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
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

        {/* Logout */}

        <div className="p-3 border-t border-slate-700">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-red-600
              hover:bg-red-700
              py-3
              rounded-xl
              transition
            "
          >
            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;