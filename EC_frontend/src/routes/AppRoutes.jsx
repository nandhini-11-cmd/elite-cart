import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../utils/roles";

import NotFound from "../pages/common/NotFound";
import Unauthorized from "../pages/common/Unauthorized";

import PublicRoute from "./PublicRoute";

import BuyerLayout from "../components/layout/BuyerLayout";

import Home from "../pages/buyer/Home";
import Products from "../pages/buyer/Products";
import ProductDetails from "../pages/buyer/ProductDetails";
import Cart from "../pages/buyer/Cart";
import Checkout from "../pages/buyer/Checkout";
import Orders from "../pages/buyer/Orders";
import OrderDetails from "../pages/buyer/OrderDetails";
import Wishlist from "../pages/buyer/Wishlist";

//Seller imports

import SellerLayout from "../components/layout/SellerLayout";

import Dashboard from "../pages/seller/Dashboard";
import SellerProducts from "../pages/seller/Products";
import AddProduct from "../pages/seller/AddProduct";
import EditProducts from "../pages/seller/EditProducts";
import SellerOrders from "../pages/seller/Orders";
import Profile from "../pages/seller/Profile";



//Admin Routes 
import AdminLayout from "../components/layout/AdminLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import AdminProducts from "../pages/admin/Products";
import Users from "../pages/admin/Users";
import AdminOrders from "../pages/admin/Orders";
import AdminProfile from "../pages/admin/Profile";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Buyer Routes */}

      <Route element={<BuyerLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/products/:slug"
          element={<ProductDetails />}
        />
          <Route
  path="/cart"
  element={
    <ProtectedRoute role={ROLES.BUYER}>
      <Cart />
    </ProtectedRoute>
  }
/>
        <Route
        path="/checkout"
       element={<ProtectedRoute role={ROLES.BUYER}>
      <Checkout />
    </ProtectedRoute>}
      />
      <Route
      path="/orders"
      element={<ProtectedRoute role={ROLES.BUYER}>
      <Orders />
    </ProtectedRoute>}
      />
      <Route
  path="/orders/:id"
  element={<ProtectedRoute role={ROLES.BUYER}>
      <OrderDetails />
    </ProtectedRoute>}
/>

<Route
  path="/wishlist"
  element={
    <ProtectedRoute role={ROLES.BUYER}>
      <Wishlist />
    </ProtectedRoute>
  }
/>
      </Route>


      {/* Seller Routes */}

<Route
  element={
    <ProtectedRoute role={ROLES.SELLER}>
      <SellerLayout />
    </ProtectedRoute>
  }
>

  <Route
    path="/seller/dashboard"
    element={<Dashboard />}
  />

  <Route
    path="/seller/products"
    element={<SellerProducts />}
  />

  <Route
    path="/seller/products/add"
    element={<AddProduct />}
  />

  <Route
    path="/seller/products/edit/:id"
    element={<EditProducts />}
  />

  <Route
    path="/seller/orders"
    element={<SellerOrders />}
  />

  <Route
    path="/seller/profile"
    element={<Profile />}
  />

</Route>

{/* Admin Routes */}

<Route
  element={
    <ProtectedRoute role={ROLES.ADMIN}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="/admin/categories"
    element={<Categories />}
  />

  <Route
    path="/admin/products"
    element={<AdminProducts />}
  />

  <Route
    path="/admin/users"
    element={<Users />}
  />

  <Route
    path="/admin/orders"
    element={<AdminOrders />}
  />

  <Route
    path="/admin/profile"
    element={<AdminProfile />}
  />
</Route>

      {/* Authentication */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;