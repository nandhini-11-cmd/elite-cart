import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-blue-600">
          404
        </h1>

        <p className="mt-4 text-slate-600">
          Page Not Found
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;