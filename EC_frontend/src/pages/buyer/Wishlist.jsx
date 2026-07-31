import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import WishlistItem from "../../components/buyer/WishlistItem";

import { getWishlist } from "../../services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        {error}
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="py-20">
        <EmptyState
          title="Your Wishlist is Empty"
          message="Save products you love and shop later."
        />

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="
              inline-block
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            My Wishlist
          </h1>

          <span className="text-slate-500 font-medium">
            {wishlist.length} Item
            {wishlist.length > 1 ? "s" : ""}
          </span>

        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-6
          "
        >
          {wishlist.map((item) => (
            <WishlistItem
              key={item._id}
              item={item}
              fetchWishlist={fetchWishlist}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Wishlist;