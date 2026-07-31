import { useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import useReview from "../../hooks/useReview";

import { deleteReview } from "../../services/reviewService";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { ROLES } from "../../utils/roles";

const ReviewSection = ({ product }) => {
  const { user } = useAuth();
  console.log("User:", user);
console.log("Role:", user?.role);

  const { reviews, loading, fetchReviews } =
    useReview(product._id);

  const [selectedReview, setSelectedReview] =
    useState(null);

  const handleEdit = (review) => {
    setSelectedReview(review);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);

      toast.success("Review Deleted Successfully");

      fetchReviews();

      setSelectedReview(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete review."
      );
    }
  };

  const myReview = reviews.find(
  (review) =>
    review.user._id === user?.userId
);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        Customer Reviews
      </h2>

      {/* Review List */}

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl p-6 text-center">
          No Reviews Yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Review Form */}

      {user?.role === ROLES.BUYER &&
  (!myReview || selectedReview) && (
    <ReviewForm
      productId={product._id}
      selectedReview={selectedReview}
      fetchReviews={fetchReviews}
      clearSelection={() =>
        setSelectedReview(null)
      }
    />
)}
    </section>
  );
};

export default ReviewSection;