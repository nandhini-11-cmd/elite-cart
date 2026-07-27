import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search products...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>

      <FaSearch
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        py-3
        pl-11
        pr-4
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500
        "
      />

    </div>
  );
};

export default SearchBar;