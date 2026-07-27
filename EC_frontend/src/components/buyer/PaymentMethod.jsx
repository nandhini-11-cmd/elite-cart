import { FaMoneyBillWave } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        {/* Razorpay */}

        <label
          className="
            flex
            items-center
            gap-4
            border
            rounded-xl
            p-4
            cursor-pointer
          "
        >
          <input
            type="radio"
            value="Razorpay"
            checked={paymentMethod === "Razorpay"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <SiRazorpay
            className="text-blue-600"
            size={24}
          />

          <span className="font-medium">
            Razorpay
          </span>
        </label>

        {/* Cash On Delivery */}

        <label
          className="
            flex
            items-center
            gap-4
            border
            rounded-xl
            p-4
            cursor-pointer
          "
        >
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />

          <FaMoneyBillWave
            className="text-green-600"
            size={22}
          />

          <span className="font-medium">
            Cash On Delivery
          </span>

        </label>

      </div>

    </div>
  );
};

export default PaymentMethod;