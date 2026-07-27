import { FaBell, FaUserCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-6">

          <button className="relative">

            <FaBell
              size={22}
              className="text-slate-600"
            />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              3
            </span>

          </button>

          <FaUserCircle
            size={34}
            className="text-slate-700"
          />

          <button
            onClick={handleLogout}
            className="
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