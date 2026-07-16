export const MESSAGES = {
  // Common
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  ROUTE_NOT_FOUND: "Route Not Found",
  INVALID_ID: "Invalid ID",

  // Authentication
  REGISTER_SUCCESS: "User registered successfully.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",

  INVALID_CREDENTIALS: "Invalid email or password.",
  TOKEN_REQUIRED: "Access denied. Token not provided.",
  INVALID_TOKEN: "Invalid token.",
  TOKEN_EXPIRED: "Token has expired.",
  USER_NOT_FOUND: "User not found.",
  ACCOUNT_DEACTIVATED: "Your account has been deactivated.",

  // Authorization
  UNAUTHORIZED_ACCESS: "You are not authorized to access this resource.",

  // Category
  CATEGORY_CREATED: "Category created successfully.",
  CATEGORY_UPDATED: "Category updated successfully.",
  CATEGORY_DELETED: "Category deleted successfully.",
  CATEGORY_EXISTS: "Category already exists.",
  CATEGORY_NOT_FOUND: "Category not found.",

  // Product
  PRODUCT_CREATED: "Product created successfully.",
  PRODUCT_UPDATED: "Product updated successfully.",
  PRODUCT_DELETED: "Product deleted successfully.",
  PRODUCT_NOT_FOUND: "Product not found.",
  PRODUCT_OUT_OF_STOCK: "Product is out of stock.",

  // Cart
  PRODUCT_ADDED_TO_CART: "Product added to cart.",
  PRODUCT_REMOVED_FROM_CART: "Product removed from cart.",
  CART_EMPTY: "Your cart is empty.",

  // Wishlist
  PRODUCT_ADDED_TO_WISHLIST: "Product added to wishlist.",
  PRODUCT_REMOVED_FROM_WISHLIST: "Product removed from wishlist.",
 
  // Order
ORDER_CREATED: "Order created successfully.",
ORDER_PLACED: "Order placed successfully.",
ORDER_FETCHED: "Order fetched successfully.",
ORDERS_FETCHED: "Orders fetched successfully.",
ORDER_UPDATED: "Order updated successfully.",
ORDER_CANCELLED: "Order cancelled successfully.",
ORDER_NOT_FOUND: "Order not found.",
ORDER_ALREADY_PAID: "Order already paid.",
ORDER_CANNOT_BE_CANCELLED: "Only pending orders can be cancelled.",
// Payment
PAYMENT_ORDER_CREATED: "Payment order created successfully.",
PAYMENT_SUCCESS: "Payment completed successfully.",
INVALID_PAYMENT_SIGNATURE: "Invalid payment signature.",

  // Review
  REVIEW_ADDED: "Review added successfully.",
  SELLER_DASHBOARD_FETCHED:
  "Seller dashboard fetched successfully.",
  ADMIN_DASHBOARD_FETCHED:
  "Admin dashboard fetched successfully.",
};