import { FaSearch } from "react-icons/fa";

const SearchFilters = ({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-5
      mb-8
      "
    >
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        "
      >
        {/* Search */}

        <div className="relative">
          <FaSearch
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
            w-full
            rounded-xl
            border
            border-gray-300
            py-3
            pl-11
            pr-4
            outline-none
            focus:border-blue-500
            "
          />
        </div>

        {/* Categories */}

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="
          rounded-xl
          border
          border-gray-300
          p-3
          outline-none
          focus:border-blue-500
          "
        >
          <option value="">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.categoryName}
            </option>
          ))}
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
          rounded-xl
          border
          border-gray-300
          p-3
          outline-none
          focus:border-blue-500
          "
        >
          <option value="">
            Sort By
          </option>

          <option value="price">
            Price Low to High
          </option>

          <option value="-price">
            Price High to Low
          </option>

          <option value="-createdAt">
            Latest
          </option>

          <option value="name">
            Name (A-Z)
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;