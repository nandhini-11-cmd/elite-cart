const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">

      {label && (
        <label className="font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
        w-full
        rounded-xl
        border
        border-slate-300
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        transition
        ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;