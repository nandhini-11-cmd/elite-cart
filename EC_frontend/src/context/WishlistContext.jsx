import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getWishlist } from "../services/wishlistService";
import useAuth from "../hooks/useAuth";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setWishlistCount(0);
      return;
    }

    try {
      const data = await getWishlist();

      setWishlist(data);
      setWishlistCount(data.length);
    } catch (error) {
      console.error(error);
      setWishlist([]);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () =>
  useContext(WishlistContext);