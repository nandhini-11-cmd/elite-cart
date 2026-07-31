import { useEffect, useState } from "react";

import { getProductReviews } from "../services/reviewService";

const useReview = (productId) => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchReviews = async () => {
    if (!productId) return;

    try {
      setLoading(true);

      const data =
        await getProductReviews(productId);

      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return {
    reviews,
    loading,
    fetchReviews,
  };
};

export default useReview;