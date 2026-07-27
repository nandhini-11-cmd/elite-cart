import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import ProductForm from "../../components/seller/ProductForm";

import { getSellerProduct } from "../../services/productService";

const EditProducts = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const data =
      await getSellerProduct(id);

    setProduct(data);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <ProductForm
          edit={true}
          initialValues={{
            ...product,
            category: product.category?._id,
            images: [],
          }}
        />

      </div>

    </div>
  );
};

export default EditProducts;