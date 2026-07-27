import * as Yup from "yup";

export const loginSchema = Yup.object({

  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),

});

export const registerSchema = Yup.object({

  name: Yup.string()
    .min(3)
    .max(30)
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must contain 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6)
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    )
    .required("Confirm Password is required"),

  role: Yup.string()
    .required("Role is required"),

});
export const productSchema = Yup.object({

  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(120, "Maximum 120 characters")
    .required("Product name is required"),

  description: Yup.string()
    .min(10, "Minimum 10 characters")
    .max(3000, "Maximum 3000 characters")
    .required("Description is required"),

  brand: Yup.string()
    .required("Brand is required"),

  category: Yup.string()
    .required("Category is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  discountPrice: Yup.number()
    .typeError("Discount price must be a number")
    .min(0, "Discount cannot be negative"),

  stock: Yup.number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),

});