import {
  FaBars,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AdminNavbar = ({
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

          <h1 className="text-xl sm:text-2xl font-bold">
            Admin Dashboard
          </h1>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4 sm:gap-6">

          <button className="relative">

            <FaBell
              size={22}
              className="text-slate-600"
            />

            <span
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                w-5
                h-5
                rounded-full
                text-xs
                flex
                items-center
                justify-center
              "
            >
              3
            </span>

          </button>

          <FaUserCircle
            size={32}
            className="text-slate-700"
          />

          {/* Hide Logout on Mobile */}

          <button
            onClick={handleLogout}
            className="
              hidden
              sm:block
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;