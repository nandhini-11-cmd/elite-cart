export const validateRegister = ({
  name,
  email,
  phone,
  password,
}) => {
  if (!name?.trim()) {
    return "Name is required.";
  }

  if (name.trim().length < 3) {
    return "Name must be at least 3 characters.";
  }

  if (!email?.trim()) {
    return "Email is required.";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!phone?.trim()) {
    return "Phone number is required.";
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    return "Phone number must contain exactly 10 digits.";
  }

  if (!password) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return null;
};

export const validateLogin = ({
  email,
  password,
}) => {
  if (!email?.trim()) {
    return "Email is required.";
  }

  if (!password) {
    return "Password is required.";
  }

  return null;
};