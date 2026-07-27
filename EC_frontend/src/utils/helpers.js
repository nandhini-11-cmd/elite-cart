import {
  CURRENCY,
  DEFAULT_PRODUCT_IMAGE,
} from "./constants";

export const formatPrice = (
  price = 0
) => {
  return `${CURRENCY}${Number(
    price
  ).toLocaleString("en-IN")}`;
};

export const productImage = (
  images
) => {
  if (
    images &&
    images.length > 0
  ) {
    return images[0].url;
  }

  return DEFAULT_PRODUCT_IMAGE;
};

export const truncate = (
  text,
  length = 60
) => {
  if (!text) return "";

  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};

export const capitalize = (
  text = ""
) => {
  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
};