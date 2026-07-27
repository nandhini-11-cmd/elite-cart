import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const SellerNavbar = ({
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-4 sm:px-6 py-4">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="lg:hidden"
          >
            <FaBars
              size={22}
              className="text-slate-700"
            />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Seller Dashboard
          </h1>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4 sm:gap-6">

          <button className="relative">

            <FaBell
              size={22}
              className="text-slate-600"
            />

          </button>

          <FaUserCircle
            size={32}
            className="text-slate-700"
          />

          <button
            onClick={handleLogout}
            className="
              hidden
              sm:flex
              items-center
              gap-2
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </header>
  );
};

export default SellerNavbar;