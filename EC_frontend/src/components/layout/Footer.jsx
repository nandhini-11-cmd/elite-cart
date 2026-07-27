import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>

            <h2 className="text-2xl font-bold text-blue-400">
              EliteCart
            </h2>

            <p className="mt-5 text-slate-300 leading-7">
              Discover premium products from trusted sellers.
              Shop securely with a modern shopping experience.
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-lg">
              Shop
            </h3>

            <ul className="space-y-3 mt-5 text-slate-300">

              <li>All Products</li>

              <li>New Arrivals</li>

              <li>Best Sellers</li>

              <li>Offers</li>

            </ul>

          </div>

          <div>

            <h3 className="font-semibold text-lg">
              Company
            </h3>

            <ul className="space-y-3 mt-5 text-slate-300">

              <li>About</li>

              <li>Contact</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

            </ul>

          </div>

          <div>

            <h3 className="font-semibold text-lg">
              Follow Us
            </h3>

            <div className="flex gap-4 mt-5">

              <button className="bg-white/10 hover:bg-blue-600 transition p-3 rounded-full">
                <FaFacebookF />
              </button>

              <button className="bg-white/10 hover:bg-pink-500 transition p-3 rounded-full">
                <FaInstagram />
              </button>

              <button className="bg-white/10 hover:bg-sky-500 transition p-3 rounded-full">
                <FaTwitter />
              </button>

              <button className="bg-white/10 hover:bg-blue-700 transition p-3 rounded-full">
                <FaLinkedinIn />
              </button>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-12 pt-6 text-center text-sm text-slate-400">

          © {new Date().getFullYear()} EliteCart.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;