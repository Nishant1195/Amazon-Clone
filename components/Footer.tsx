export default function Footer() {
  return (
    <footer className="mt-auto text-sm text-gray-700 bg-gray-50">
      
      {/* BACK TO TOP */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-gray-700 hover:bg-gray-600 text-white text-center py-4 cursor-pointer transition-colors font-medium"
      >
        Back to top
      </div>

      {/* LINKS SECTION */}
      <div className="bg-gray-800 text-white px-6 sm:px-10 md:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* COLUMN 1 */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 text-base">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white hover:underline cursor-pointer">About Us</li>
              <li className="hover:text-white hover:underline cursor-pointer">Careers</li>
              <li className="hover:text-white hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:text-white hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 text-base">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:text-white hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:text-white hover:underline cursor-pointer">Advertise Your Products</li>
              <li className="hover:text-white hover:underline cursor-pointer">Self-Publish with Us</li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 text-base">Payment Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white hover:underline cursor-pointer">Amazon Business Card</li>
              <li className="hover:text-white hover:underline cursor-pointer">Shop with Points</li>
              <li className="hover:text-white hover:underline cursor-pointer">Reload Your Balance</li>
              <li className="hover:text-white hover:underline cursor-pointer">Amazon Currency Converter</li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 text-base">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white hover:underline cursor-pointer">Your Account</li>
              <li className="hover:text-white hover:underline cursor-pointer">Your Orders</li>
              <li className="hover:text-white hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:text-white hover:underline cursor-pointer">Returns & Replacements</li>
            </ul>
          </div>

        </div>
      </div>

      {/* BRAND BAR */}
      <div className="bg-gray-900 text-center py-6 border-t border-gray-700">
        <div className="text-white font-bold text-lg mb-1">
          Amazon Clone
        </div>
        <div className="text-gray-400 text-xs">
          © 2024 Amazon Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
