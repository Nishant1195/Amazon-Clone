"use client";

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
          
          <FooterColumn
            title="Get to Know Us"
            links={["About Us", "Careers", "Press Releases", "Amazon Science"]}
          />
          <FooterColumn
            title="Make Money with Us"
            links={[
              "Sell on Amazon",
              "Become an Affiliate",
              "Advertise Your Products",
              "Self-Publish with Us",
            ]}
          />
          <FooterColumn
            title="Payment Products"
            links={[
              "Amazon Business Card",
              "Shop with Points",
              "Reload Your Balance",
              "Amazon Currency Converter",
            ]}
          />
          <FooterColumn
            title="Let Us Help You"
            links={[
              "Your Account",
              "Your Orders",
              "Shipping Rates & Policies",
              "Returns & Replacements",
            ]}
          />
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div className="text-center sm:text-left">
      <h4 className="font-bold mb-3 text-base">{title}</h4>
      <ul className="space-y-2 text-gray-300">
        {links.map((link) => (
          <li
            key={link}
            className="hover:text-white hover:underline cursor-pointer"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
