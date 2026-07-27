import { useNavigate } from "react-router-dom";


 
const CategoryCard = ({
  category,
}) => {
   const navigate = useNavigate();
  return (
    <div
  onClick={() =>
    navigate(`/products?category=${category._id}`)
  }
  className="
  group
  rounded-2xl
  bg-white
  shadow-sm
  hover:shadow-xl
  transition
  duration-300
  overflow-hidden
  cursor-pointer
  "
>
      <div
        className="
        aspect-square

        overflow-hidden
        "
      >

        <img
          src={category.categoryImage.url}
          alt={category.categoryName}
          className="
          h-full

          w-full

          object-cover

          group-hover:scale-110

          transition

          duration-300
          "
        />

      </div>

      <div className="p-4">

        <h3
          className="
          text-center

          font-semibold

          text-slate-700
          "
        >
          {category.categoryName}
        </h3>

      </div>

    </div>
  );
};

export default CategoryCard;