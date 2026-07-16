export const validateProduct = ({
  name,
  description,
  brand,
  price,
  stock,
  category,
}) => {
  if (!name?.trim()) {
    return "Product name is required.";
  }

  if (name.trim().length < 3) {
    return "Product name must be at least 3 characters.";
  }

  if (!description?.trim()) {
    return "Product description is required.";
  }

  if (!brand?.trim()) {
    return "Brand is required.";
  }

  if (!category) {
    return "Category is required.";
  }

  if (price === undefined || Number(price) <= 0) {
    return "Price must be greater than zero.";
  }

  if (stock === undefined || Number(stock) < 0) {
    return "Stock cannot be negative.";
  }

  return null;
};