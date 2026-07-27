import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Image</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Status</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category._id}
              className="border-t"
            >
              <td className="p-4">
              
                  <img
  src={category.categoryImage?.url}
  alt={category.categoryName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </td>

              <td className="p-4 font-semibold">
                {category.categoryName}
              </td>

              <td className="p-4">
                {category.description}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm
                  ${
                    category.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {category.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      onEdit(category)
                    }
                    className="bg-yellow-500 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(category._id)
                    }
                    className="bg-red-600 text-white p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>

                </div>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-10"
              >
                No Categories Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default CategoryTable;