import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import ProductTable from "../../components/seller/ProductTable";

import {
  getSellerProducts,
  deleteProduct,
} from "../../services/sellerService";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

const Products = () => {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts = async () => {

    try {

      const data =
        await getSellerProducts();

      setProducts(data.products);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch products"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      toast.success(
        "Product Deleted Successfully"
      );

      fetchProducts();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );

    }

  };

  if (loading) {
    return (
      <p className="text-center">
        Loading...
      </p>
    );
  }

  return (
    <div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  <h1 className="text-3xl font-bold">
    Seller Products
  </h1>

  <div className="flex gap-3">

    <div className="relative">

      <FaSearch
        className="absolute left-3 top-3 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search products..."
        className="
          pl-10
          pr-4
          py-2
          border
          rounded-xl
          outline-none
          w-72
        "
      />

    </div>

    <Link
      to="/seller/products/add"
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        rounded-xl
        flex
        items-center
        gap-2
      "
    >

      <FaPlus />

      Add Product

    </Link>

  </div>

</div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default Products;