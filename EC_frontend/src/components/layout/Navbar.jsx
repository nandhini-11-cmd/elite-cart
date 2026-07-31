import { Link, NavLink,useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/roles";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] =
    useState(false);
    const { cartCount } = useCart();
    const { wishlistCount,} = useWishlist();
    const { user, logout } = useAuth();

const navigate = useNavigate();
const navItems = !user
  ? [
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
    ]
  : [
      { label: "Home", path: "/" },
      { label: "Products", path: "/products" },
      { label: "Orders", path: "/orders" },
    ];
const handleLogout = () => {
  logout();

  navigate("/login");
};
  return (
    <header className="sticky top-0 z-50 bg-white shadow">

      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        "
      >

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            EliteCart
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-8">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

          </nav>

          {/* Desktop Right */}

<div className="hidden lg:flex items-center gap-5">

  {!user ? (
    <>
      <Link
        to="/login"
        className="
          px-5
          py-2
          rounded-xl
          border
          border-blue-600
          text-blue-600
          font-semibold
        "
      >
        Login
      </Link>

      <Link
        to="/register"
        className="
          px-5
          py-2
          rounded-xl
          bg-blue-600
          text-white
          font-semibold
        "
      >
        Register
      </Link>
    </>
  ) : (
    <>
      {
        user.role === ROLES.BUYER && (
          <>
            <Link
  to="/wishlist"
  className="relative"
>

  <FaHeart
    size={22}
    className="
      text-slate-700
      hover:text-red-500
      transition
    "
  />

  <span
    className="
      absolute
      -top-2
      -right-2
      bg-red-500
      text-white
      text-xs
      rounded-full
      w-5
      h-5
      flex
      items-center
      justify-center
    "
  >
    {wishlistCount}
  </span>

</Link>

            <Link
              to="/cart"
              className="relative"
            >

              <FaShoppingCart
                size={22}
                className="text-slate-700"
              />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-blue-600
                  text-white
                  text-xs
                  rounded-full
                  w-5
                  h-5
                  flex
                  items-center
                  justify-center
                "
              >
                {cartCount}
              </span>

            </Link>
          </>
        )
      }

      <FaUserCircle
        size={30}
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
        "
      >
        Logout
      </button>
    </>
  )}

</div>

          {/* Mobile */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden"
          >
            {mobileMenu ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

     {/* Mobile Menu */}

{mobileMenu && (
  <div className="lg:hidden border-t bg-white shadow-lg">

    {/* Navigation */}

    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setMobileMenu(false)}
        className="block px-5 py-4 border-b"
      >
        {item.label}
      </NavLink>
    ))}

    {!user ? (
      <div className="p-5 space-y-3">

        <Link
          to="/login"
          onClick={() => setMobileMenu(false)}
          className="
            block
            text-center
            border
            border-blue-600
            text-blue-600
            py-3
            rounded-xl
            font-semibold
          "
        >
          Login
        </Link>

        <Link
          to="/register"
          onClick={() => setMobileMenu(false)}
          className="
            block
            text-center
            bg-blue-600
            text-white
            py-3
            rounded-xl
            font-semibold
          "
        >
          Register
        </Link>

      </div>
    ) : (
      <div className="border-t">

        {user.role === ROLES.BUYER && (
          <>
            <NavLink
              to="/cart"
              onClick={() => setMobileMenu(false)}
              className="block px-5 py-4 border-b"
            >
              🛒 Cart ({cartCount})
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={() => setMobileMenu(false)}
              className="block px-5 py-4 border-b"
            >
              ❤️ Wishlist ({wishlistCount})
            </NavLink>
          </>
        )}

        <NavLink
          to="/profile"
          onClick={() => setMobileMenu(false)}
          className="block px-5 py-4 border-b"
        >
          👤 Profile
        </NavLink>

        <button
          onClick={() => {
            handleLogout();
            setMobileMenu(false);
          }}
          className="
            w-full
            text-left
            px-5
            py-4
            text-red-600
            font-semibold
          "
        >
          🚪 Logout
        </button>

      </div>
    )}

  </div>
)}

    </header>
  );
};

export default Navbar;