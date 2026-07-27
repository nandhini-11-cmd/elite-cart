import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const SellerNavbar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold text-slate-800">
          Seller Dashboard
        </h1>

        <div className="flex items-center gap-6">

          {/* Notification */}

          <button className="relative">

            <FaBell
              size={22}
              className="text-slate-600"
            />

          </button>

          {/* Profile */}

          <FaUserCircle
            size={34}
            className="text-slate-700"
          />

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
              flex
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