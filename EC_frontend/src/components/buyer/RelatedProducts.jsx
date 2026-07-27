import ProductCard from "./ProductCard";

const RelatedProducts = ({
  products,
  currentProductId,
}) => {
  const relatedProducts = (products || [])
  .filter(
    (item) => item._id !== currentProductId
  )
  .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section
      className="
      mt-10
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        text-slate-800
        mb-6
        "
      >
        You may also like
      </h2>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >
        {relatedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;