import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  addReview,
  updateReview,
} from "../../services/reviewService";

const ReviewForm = ({
  productId,
  selectedReview,
  fetchReviews,
  clearSelection,
}) => {
  const [rating, setRating] = useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (selectedReview) {
      setRating(selectedReview.rating);
      setComment(selectedReview.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [selectedReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return toast.error(
        "Comment is required."
      );
    }

    try {
      setLoading(true);

      if (selectedReview) {
        await updateReview(
          selectedReview._id,
          {
            rating,
            comment,
          }
        );

        toast.success(
          "Review Updated Successfully"
        );
      } else {
        await addReview(productId, {
          rating,
          comment,
        });

        toast.success(
          "Review Added Successfully"
        );
      }

      await fetchReviews();

      clearSelection();

      setRating(5);
      setComment("");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-xl
        shadow-sm
        p-6
        mt-8
      "
    >
      <h2 className="text-xl font-semibold mb-4">
        {selectedReview
          ? "Edit Review"
          : "Write a Review"}
      </h2>

      {/* Rating */}

      <div className="flex gap-2 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() =>
              setRating(star)
            }
          >
            <FaStar
              className={`text-2xl transition ${
                star <= rating
                  ? "text-yellow-500"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Comment */}

      <textarea
        rows={5}
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Write your review..."
        className="
          w-full
          border
          rounded-lg
          p-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
            disabled:bg-slate-400
          "
        >
          {loading
            ? "Saving..."
            : selectedReview
            ? "Update Review"
            : "Submit Review"}
        </button>

        {selectedReview && (
          <button
            type="button"
            onClick={clearSelection}
            className="
              bg-slate-200
              hover:bg-slate-300
              px-6
              py-3
              rounded-lg
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;