import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";

import useAuth from "../../hooks/useAuth";

const ReviewCard = ({
  review,
  onEdit,
  onDelete,
}) => {
  const { user } = useAuth();

  const isOwner =
  user?.userId === review.user._id;

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        p-5
        space-y-3
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-slate-800">
            {review.user.name}
          </h3>

          <p className="text-xs text-slate-500">
            {format(
              new Date(review.createdAt),
              "dd MMM yyyy"
            )}
          </p>
        </div>

        {isOwner && (
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(review)}
              className="
                text-blue-600
                hover:text-blue-800
              "
            >
              <FaEdit />
            </button>

            <button
              onClick={() =>
                onDelete(review._id)
              }
              className="
                text-red-600
                hover:text-red-800
              "
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Rating */}

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={
              star <= review.rating
                ? "text-yellow-500"
                : "text-slate-300"
            }
          />
        ))}
      </div>

      {/* Comment */}

      <p className="text-slate-700 leading-6">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;