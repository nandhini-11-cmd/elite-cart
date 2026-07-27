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
        p-6
        border
      "
    >
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-blue-600 mt-3">
        {value}
      </h2>
    </div>
  );
};

export default DashboardCard;