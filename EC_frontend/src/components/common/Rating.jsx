import { FaStar } from "react-icons/fa";

const Rating = ({
  rating = 0,
  reviews = 0,
}) => {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      "
    >
      <div className="flex">

        {[1, 2, 3, 4, 5].map((star) => (

          <FaStar
            key={star}
            size={16}
            className={
              star <= rating
                ? "text-yellow-400"
                : "text-slate-300"
            }
          />

        ))}

      </div>

      <span className="text-sm text-slate-500">
        ({reviews})
      </span>
    </div>
  );
};

export default Rating;