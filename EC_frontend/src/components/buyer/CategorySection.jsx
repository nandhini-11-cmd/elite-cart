import { useEffect, useState } from "react";

import { getCategories } from "../../services/categoryService";

import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {
      try {
        const data =
          await getCategories();

        setCategories(data);

      } catch (err) {

        setError(
          "Unable to load categories."
        );

      } finally {

        setLoading(false);

      }
    };

  if (loading)
    return <Loader />;

  if (error)
    return (
      <EmptyState
        title="Oops!"
        description={error}
      />
    );

  if (!categories.length)
    return (
      <EmptyState
        title="No Categories"
        description="Categories not available."
      />
    );

  return (
    <section
      className="
      max-w-7xl

      mx-auto

      px-5

      py-16
      "
    >

      <div className="flex justify-between items-center">

        <h2
          className="
          text-3xl

          font-bold

          text-slate-800
          "
        >
          Shop By Categories
        </h2>

      </div>

      <div
        className="
        mt-10

        grid

        grid-cols-2

        sm:grid-cols-3

        md:grid-cols-4

        lg:grid-cols-6

        gap-6
        "
      >

        {categories.map((category) => (

          <CategoryCard
            key={category._id}
            category={category}
          />

        ))}

      </div>

    </section>
  );
};

export default CategorySection;