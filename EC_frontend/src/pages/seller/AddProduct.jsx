import ProductForm from "../../components/seller/ProductForm";

const AddProduct = () => {
  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Add New Product
      </h1>

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <ProductForm />

      </div>

    </div>
  );
};

export default AddProduct;