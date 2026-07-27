const AdminDashboardCard = ({
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
      p-6
    "
    >
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-blue-600 mt-3">
        {value}
      </h2>
    </div>
  );
};

export default AdminDashboardCard;