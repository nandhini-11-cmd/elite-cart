import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductBySlug, getProducts,} from "../../services/productService";

import Loader from "../../components/common/Loader";

import ProductImageGallery from "../../components/buyer/ProductImageGallery";
import ProductInfo from "../../components/buyer/ProductInfo";
import ProductDescription from "../../components/buyer/ProductDescription";
import RelatedProducts from "../../components/buyer/RelatedProducts";
import ReviewSection from "../../components/buyer/ReviewSection";


const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] =
  useState([]);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductBySlug(slug);

      setProduct(data);
      fetchRelatedProducts(data.category._id);
    } catch (error) {
      console.error(error);

      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (
  categoryId
) => {
  try {
    const data = await getProducts({
      category: categoryId,
    });

    setRelatedProducts(
      data.products || data || []
    );
  } catch (error) {
    console.log(error);
  }
};
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <p className="text-center text-red-500 text-lg">
          {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <p className="text-center text-lg">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          "
        >
          <ProductImageGallery product={product} />

          <ProductInfo product={product} />
        </div>

        <ProductDescription product={product} />
        <ReviewSection product={product} />

        <RelatedProducts
  products={relatedProducts}
  currentProductId={product._id}
/>

      </div>
    </section>
  );
};

export default ProductDetails;