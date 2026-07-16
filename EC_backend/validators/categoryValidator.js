export const validateCategory = ({
  categoryName,
  description,
}) => {
  if (!categoryName?.trim()) {
    return "Category name is required.";
  }

  if (categoryName.trim().length < 3) {
    return "Category name must be at least 3 characters.";
  }

  if (categoryName.trim().length > 50) {
    return "Category name cannot exceed 50 characters.";
  }

  if (!description?.trim()) {
    return "Description is required.";
  }

  if (description.trim().length > 500) {
    return "Description cannot exceed 500 characters.";
  }

  return null;
};