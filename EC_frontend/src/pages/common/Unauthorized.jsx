const Unauthorized = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">

        <h1 className="text-5xl font-bold text-red-600">
          403
        </h1>

        <p className="text-slate-600 mt-4">
          You are not authorized to access this page.
        </p>

      </div>
    </div>
  );
};

export default Unauthorized;