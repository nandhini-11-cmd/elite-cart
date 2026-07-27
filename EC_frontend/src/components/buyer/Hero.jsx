import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-center
            px-5
            sm:px-8
            lg:px-10
            py-16
            lg:py-24
          "
        >

          {/* Left */}

          <div>

            {/* Badge */}

            <div className="flex flex-wrap items-center gap-4">

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-blue-500/20
                  px-5
                  py-2
                  text-blue-200
                  text-sm
                  font-semibold
                "
              >
                New Arrivals....
              </span>

              <span className="text-yellow-300 font-medium">
                ⭐⭐⭐⭐⭐ 1000+ Happy Customers
              </span>

            </div>

            {/* Heading */}

            <h1
              className="
                mt-8
                text-white
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-extrabold
                leading-tight
              "
            >
              Everything You Need

              <span className="text-blue-400">
                {" "}
                In One Place
              </span>

            </h1>

            {/* Description */}

            <p
              className="
                mt-6
                text-blue-100
                text-lg
                leading-8
                max-w-xl
              "
            >
              Shop electronics, fashion, furniture, beauty,
              home essentials and much more with secure
              checkout, trusted sellers and lightning-fast
              delivery.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-blue-600
                  px-8
                  py-4
                  text-white
                  font-semibold
                  hover:bg-blue-700
                  transition
                "
              >
                Shop Now

                <FaArrowRight />

              </Link>

              

            </div>

            {/* Features */}

            <div className="mt-10 flex flex-wrap gap-4">

              <div
                className="
                  bg-white/10
                  backdrop-blur-md
                  rounded-xl
                  px-5
                  py-3
                  text-white
                "
              >
                🚚 Free Shipping
              </div>

              <div
                className="
                  bg-white/10
                  backdrop-blur-md
                  rounded-xl
                  px-5
                  py-3
                  text-white
                "
              >
                🔒 Secure Payments
              </div>

              

            </div>

            {/* Stats */}

            <div className="flex gap-12 mt-12 text-white">

              <div>

                <h2 className="text-3xl font-bold">
                  100+
                </h2>

                <p className="text-blue-200">
                  Products
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  1+
                </h2>

                <p className="text-blue-200">
                  Customers
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  10+
                </h2>

                <p className="text-blue-200">
                  Sellers
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center relative">

            {/* Offer Badge */}

            <div
              className="
                absolute
                -left-6
                top-12
                bg-red-500
                text-white
                px-6
                py-3
                rounded-2xl
                shadow-xl
                rotate-[-12deg]
                font-bold
                text-lg
              "
            >
              30% OFF
            </div>

            {/* Image */}

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
              alt="Shopping"
              className="
                rounded-3xl
                shadow-2xl
                object-cover
                h-[520px]
                transition-all
                duration-500
                hover:scale-105
                hover:rotate-2
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;