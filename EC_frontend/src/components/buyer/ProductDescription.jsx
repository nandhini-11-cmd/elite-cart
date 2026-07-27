const ProductDescription = ({ product }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        mt-8
      "
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Product Description
      </h2>

      <div className="space-y-4 text-gray-700 leading-8">
        <p>{product.description}</p>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-3">
            Product Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">
                Brand :
              </span>{" "}
              {product.brand}
            </div>

            <div>
              <span className="font-semibold">
                Category :
              </span>{" "}
              {product.category?.categoryName}
            </div>

            <div>
              <span className="font-semibold">
                Price :
              </span>{" "}
              ₹{product.price}
            </div>

            <div>
              <span className="font-semibold">
                Discount Price :
              </span>{" "}
              ₹{product.discountPrice}
            </div>

            <div>
              <span className="font-semibold">
                Discount :
              </span>{" "}
              {product.discountPercentage}%
            </div>

            <div>
              <span className="font-semibold">
                Stock :
              </span>{" "}
              {product.stock}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;