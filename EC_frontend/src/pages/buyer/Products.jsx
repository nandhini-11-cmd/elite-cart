import { useEffect, useState } from "react";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

import ProductCard from "../../components/buyer/ProductCard";
import SearchFilters from "../../components/buyer/SearchFilters";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  // Products
  const [products, setProducts] = useState([]);

  // Categories
  const [categories, setCategories] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Error
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  // Category
  const [selectedCategory, setSelectedCategory] =
  useState(
    searchParams.get("category") || ""
  );

    

  // Sort
  const [sort, setSort] = useState("");
    // Load Products & Categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts({
  category: selectedCategory,
});

      // API may return array or paginated object
      setProducts(data.products || data || []);
    } catch (error) {
      console.error(error);

      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Search
  let filteredProducts = [...products];

  if (search.trim()) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  // Category Filter
  if (selectedCategory) {
  filteredProducts = filteredProducts.filter((product) => {
    const categoryId =
      typeof product.category === "object"
        ? product.category?._id
        : product.category;

    return categoryId === selectedCategory;
  });
}
  // Sorting
  if (sort === "price") {
    filteredProducts.sort(
      (a, b) => a.discountPrice - b.discountPrice
    );
  }

  if (sort === "-price") {
    filteredProducts.sort(
      (a, b) => b.discountPrice - a.discountPrice
    );
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "-createdAt") {
    filteredProducts.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }
    if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <p className="text-center text-red-500 text-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Explore Products
          </h1>

          <p className="text-slate-500 mt-2">
            Browse premium products from trusted sellers.
          </p>
        </div>

        {/* Search & Filters */}

        <SearchFilters
          search={search}
          setSearch={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* Empty State */}

        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No Products Found"
            message="Try changing your search or filters."
          />
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
