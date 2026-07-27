import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";
import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";

import { loginSchema } from "../../utils/validationSchemas";
import { ROLES } from "../../utils/roles";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      const response = await login(values);
      console.log(response.user);
console.log(response.user.role);

      toast.success("Login Successful");
      console.log("Logged in User:", response.user);
console.log("Role:", response.user.role);
console.log("Seller Constant:", ROLES.SELLER);

      switch (response.user.role) {
        case ROLES.ADMIN:
          navigate("/admin/dashboard");
          break;

        case ROLES.SELLER:
          navigate("/seller/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-16">

        <div>

          <h1 className="text-5xl font-bold text-white">
            Elite Cart
          </h1>

          <p className="mt-8 text-blue-100 text-lg leading-8">

            Discover premium products from trusted sellers.

            Shop smarter with secure payments and fast delivery.

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

          <h2 className="text-3xl font-bold text-slate-800">

            Welcome Back

          </h2>

          <p className="text-slate-500 mt-2">

            Login to continue shopping

          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Form className="mt-8">

                <Input
                  label="Email Address"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  showPassword={showPassword}
                  togglePassword={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                />

                <div className="flex justify-end mb-6">

                  <Link
                    to="/forgot-password"
                    className="text-blue-600 text-sm"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <Button
                  type="submit"
                  loading={isSubmitting}
                >
                  Login
                </Button>

              </Form>
            )}
          </Formik>

          <p className="text-center mt-8 text-slate-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-600 font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;