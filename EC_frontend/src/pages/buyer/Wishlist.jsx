const Wishlist = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-4xl font-bold text-slate-800">
          Wishlist
        </h1>

        <p className="mt-4 text-slate-500 text-lg">
          This feature is currently under development.
        </p>

        <p className="mt-2 text-slate-400">
          Wishlist functionality will be available in an upcoming update.
        </p>

        <button
          disabled
          className="
            mt-8
            px-6
            py-3
            rounded-xl
            bg-blue-600
            text-white
            opacity-60
            cursor-not-allowed
          "
        >
          Coming Soon
        </button>

      </div>
    </div>
  );
};

export default Wishlist;