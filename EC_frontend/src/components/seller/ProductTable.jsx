import { Link } from "react-router-dom";

const ProductTable = ({
  products,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-slate-500"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  {/* Image */}

                  <td className="p-4">

                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      className="
                        w-14
                        h-14
                        sm:w-16
                        sm:h-16
                        rounded-lg
                        object-cover
                      "
                    />

                  </td>

                  {/* Name */}

                  <td className="p-4 font-medium">
                    {product.name}
                  </td>

                  {/* Category */}

                  <td className="p-4 capitalize">
                    {product.category?.categoryName}
                  </td>

                  {/* Price */}

                  <td className="p-4 font-semibold">
                    ₹{product.price}
                  </td>

                  {/* Stock */}

                  <td className="p-4">

                    {product.stock === 0 ? (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                        Out of Stock

                      </span>

                    ) : product.stock <= 5 ? (

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                        Low Stock ({product.stock})

                      </span>

                    ) : (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        In Stock ({product.stock})

                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        to={`/seller/products/edit/${product._id}`}
                        className="
                          bg-yellow-500
                          hover:bg-yellow-600
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          onDelete(product._id)
                        }
                        className="
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          transition
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProductTable;