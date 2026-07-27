const DashboardCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-5
        sm:p-6
        hover:shadow-md
        transition
      "
    >
      <p
        className="
          text-gray-500
          text-sm
          sm:text-base
        "
      >
        {title}
      </p>

      <h2
        className="
          text-3xl
          sm:text-4xl
          font-bold
          text-blue-600
          mt-3
          break-words
        "
      >
        {value}
      </h2>
    </div>
  );
};

export default DashboardCard;