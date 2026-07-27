const OrderReview = ({ cart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Order Review
      </h2>

      <div className="space-y-5">

        {cart?.items?.map((item) => (

          <div
            key={item._id}
            className="flex gap-4 border-b pb-5"
          >

            <img
              src={item.product.images[0].url}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-lg border"
            />

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {item.product.name}
              </h3>

              <p className="text-gray-500">
                {item.product.brand}
              </p>

              <p className="mt-2">
                Qty :
                <span className="font-semibold ml-2">
                  {item.quantity}
                </span>
              </p>

              <p className="text-blue-600 font-bold mt-2">
                ₹{item.totalPrice}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default OrderReview;