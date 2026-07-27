import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SellerSidebar = () => {

    const navigate = useNavigate();

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  const menus = [
    {
      title: "Dashboard",
      path: "/seller/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Products",
      path: "/seller/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Orders",
      path: "/seller/orders",
      icon: <FaShoppingBag />,
    },
    {
      title: "Profile",
      path: "/seller/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-slate-900
        text-white
        shadow-lg
        flex
    flex-col
      "
    >
      {/* Logo */}

      <div className="px-6 py-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          EliteCart
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Seller Panel
        </p>

      </div>

      {/* Menu */}

     <nav className="mt-6 px-3 space-y-2 flex-1">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }
            `
            }
          >
            {menu.icon}

            <span>{menu.title}</span>
          </NavLink>
        ))}

      </nav>

     
    </aside>
  );
};

export default SellerSidebar;