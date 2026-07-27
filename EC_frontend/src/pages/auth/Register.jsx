import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";

import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";

import { registerSchema } from "../../utils/validationSchemas";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

 const [showPassword, setShowPassword] =
  useState(false);

const [
  showConfirmPassword,
  setShowConfirmPassword,
] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  };

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      await register(values);

      toast.success(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">

        <h1 className="text-3xl font-bold text-blue-600">

          Create Account

        </h1>

        <p className="text-slate-500 mt-2">

          Join Elite Cart today

        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className="mt-8">

              <Input
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />

              <Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />

              <Input
                label="Phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                showPassword={showConfirmPassword}

togglePassword={() =>
  setShowConfirmPassword(
    !showConfirmPassword
  )
}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.confirmPassword
                }
                touched={
                  touched.confirmPassword
                }
                showPassword={showPassword}
                togglePassword={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              />

              <div className="mb-6">

                <label className="block mb-2 font-semibold">

                  Register As

                </label>

                <select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="buyer">
                    Buyer
                  </option>

                  <option value="seller">
                    Seller
                  </option>
                </select>

              </div>

              <Button
                type="submit"
                loading={isSubmitting}
              >
                Register
              </Button>

            </Form>
          )}
        </Formik>

        <p className="text-center mt-8">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;