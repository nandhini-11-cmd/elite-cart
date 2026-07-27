import { useEffect, useState } from "react";

const ProductImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-5
      "
    >
      {/* Main Image */}

   <div
  className="
  rounded-xl
  overflow-hidden
  border
  bg-gray-100
  flex
  items-center
  justify-center
  "
>
  {selectedImage && (
    <img
      src={selectedImage}
      alt={product.name}
      className="
      w-full
      h-72
      sm:h-96
      object-contain
      "
    />
  )}
</div>

      {/* Thumbnails */}

      <div
        className="
        mt-5
        grid
        grid-cols-4
        gap-3
        "
      >
        {product.images?.map((image, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedImage(image.url)
            }
            className={`
              border
              rounded-lg
              overflow-hidden
              ${
                selectedImage === image.url
                  ? "border-blue-600"
                  : "border-gray-300"
              }
            `}
          >
            <img
              src={image.url}
              alt={product.name}
              className="
              w-full
              h-20
              object-cover
              "
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;