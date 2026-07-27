import { FaBoxOpen } from "react-icons/fa";

const EmptyState = ({
  title = "Nothing Found",
  description = "There is no data available.",
}) => {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-20
      px-5
      text-center
      "
    >
      <div
        className="
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-full
        bg-slate-100
        "
      >
        <FaBoxOpen
          size={40}
          className="text-slate-400"
        />
      </div>

      <h2
        className="
        mt-6
        text-2xl
        font-bold
        text-slate-700
        "
      >
        {title}
      </h2>

      <p
        className="
        mt-3
        max-w-md
        text-slate-500
        leading-7
        "
      >
        {description}
      </p>
    </div>
  );
};

export default EmptyState;