import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart as addToCartService,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../services/cartService";

import useAuth from "../hooks/useAuth";
import { ROLES } from "../utils/roles";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  const [grandTotal, setGrandTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
  if (!user) {
    setCartItems([]);
    setGrandTotal(0);
    return;
  }

  // Don't fetch cart for Seller/Admin
  if (user.role !== ROLES.BUYER) {
    setCartItems([]);
    setGrandTotal(0);
    return;
  }

  try {
    setLoading(true);

    const data = await getCart();

    setCartItems(data.items || []);

    setGrandTotal(data.grandTotal || 0);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  if (user?.role === ROLES.BUYER) {
    fetchCart();
  } else {
    setCartItems([]);
    setGrandTotal(0);
  }
}, [user]);

  const addToCart = async (
    productId,
    quantity = 1
  ) => {
    await addToCartService(productId, quantity);

    await fetchCart();
  };

  const updateQuantity = async (
    cartId,
    quantity
  ) => {
    await updateCartQuantity(cartId, quantity);

    await fetchCart();
  };

  const removeItem = async (cartId) => {
    await removeCartItem(cartId);

    await fetchCart();
  };

  const clearAll = async () => {
    await clearCart();

    await fetchCart();
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        grandTotal,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;