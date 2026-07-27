import { FaMapMarkerAlt } from "react-icons/fa";

const ShippingAddress = ({
  shippingAddress,
  setShippingAddress,
}) => {
  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex items-center gap-2 mb-6">
        <FaMapMarkerAlt className="text-blue-600" />
        <h2 className="text-2xl font-bold">
          Shipping Address
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingAddress.phone}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="addressLine"
          placeholder="Address"
          value={shippingAddress.addressLine}
          onChange={handleChange}
          className="md:col-span-2 border rounded-xl p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingAddress.state}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={shippingAddress.pincode}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:border-blue-500"
        />

      </div>

    </div>
  );
};

export default ShippingAddress;