export const API_URL =
  import.meta.env.VITE_API_URL;

export const APP_NAME = "Elite Cart";

export const PAGINATION_LIMIT = 8;

export const DEFAULT_PRODUCT_IMAGE =
  "https://placehold.co/600x600?text=No+Image";

export const CURRENCY = "₹";

export const ORDER_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out For Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const PAYMENT_STATUS = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};