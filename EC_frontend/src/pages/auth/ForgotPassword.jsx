import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-blue-600">
          Forgot Password
        </h1>

        <p className="text-slate-600 mt-4">
          Password reset functionality will be added in the next version.
        </p>

        <Link
          to="/login"
          className="inline-block mt-8 text-blue-600 font-semibold"
        >
          ← Back to Login
        </Link>

      </div>
    </div>
  );
};

export default ForgotPassword;