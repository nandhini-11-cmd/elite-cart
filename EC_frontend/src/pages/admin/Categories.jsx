import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

import CategoryTable from "../../components/admin/CategoryTable";
import CategoryForm from "../../components/admin/CategoryForm";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data.categories || data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const initialValues = {
    categoryName: "",
    description: "",
    categoryImage: "",
    isActive: true,
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append(
        "categoryName",
        values.categoryName
      );

      formData.append(
        "description",
        values.description
      );

      formData.append(
        "isActive",
        values.isActive
      );

      if (
        values.categoryImage instanceof File
      ) {
        formData.append(
          "categoryImage",
          values.categoryImage
        );
      }

      if (selectedCategory) {
        await updateCategory(
          selectedCategory._id,
          formData
        );

        toast.success(
          "Category Updated Successfully"
        );
      } else {
        await createCategory(formData);

        toast.success(
          "Category Added Successfully"
        );
      }

      fetchCategories();

      setShowForm(false);

      setSelectedCategory(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this category?"
      )
    ) {
      return;
    }

    try {
      await deleteCategory(id);

      toast.success(
        "Category Deleted"
      );

      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const filteredCategories =
    categories.filter((category) =>
      category.categoryName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
          mb-6
        "
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowForm(true);
          }}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-xl
            w-full
            sm:w-auto
          "
        >
          + Add Category
        </button>
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          mb-6
          border
          rounded-xl
          px-4
          py-3
        "
      />

      {/* Table */}

      <CategoryTable
        categories={filteredCategories}
        onEdit={(category) => {
          setSelectedCategory(category);

          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal */}

      {showForm && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            justify-center
            items-center
            p-4
            z-50
          "
        >
          <div
            className="
              bg-white
              rounded-2xl
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              p-6
            "
          >
            <CategoryForm
              initialValues={
                selectedCategory ||
                initialValues
              }
              onSubmit={handleSubmit}
              isEdit={!!selectedCategory}
            />

            <button
              onClick={() =>
                setShowForm(false)
              }
              className="
                mt-4
                w-full
                bg-gray-500
                hover:bg-gray-600
                text-white
                py-3
                rounded-xl
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;