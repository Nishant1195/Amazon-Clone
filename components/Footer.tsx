export default function Footer(){
    return(
        <footer className="text-sm text-gray-700 bg-gray-50 mt-auto">
            <div className="bg-gray-700 hover:bg-gray-600 text-white text-center py-4 cursor-pointer transition-colors font-medium">
                Back to top
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 md:px-16 py-10 bg-gray-800 text-white">
                {[
                    {
                        title: "Get to Know Us",
                        links: ["About Us", "Careers", "Press Releases", "Amazon Science"]
                    },
                    {
                        title: "Make Money with Us",
                        links: ["Sell on Amazon", "Become an Affiliate", "Advertise Your Products", "Self-Publish with Us"]
                    },
                    {
                        title: "Payment Products",
                        links: ["Amazon Business Card", "Shop with Points", "Reload Your Balance", "Amazon Currency Converter"]
                    },
                    {
                        title: "Let Us Help You",
                        links: ["Your Account", "Your Orders", "Shipping Rates & Policies", "Returns & Replacements"]
                    }
                ].map(section => (
                    <div key={section.title}>
                        <h4 className="font-bold mb-3 text-white text-base">{section.title}</h4>
                        <ul className="space-y-2 text-gray-300">
                            {section.links.map(link => (
                                <li key={link} className="hover:underline cursor-pointer hover:text-white transition-colors">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="bg-gray-900 text-center py-6 border-t border-gray-700">
                <div className="text-white font-bold text-lg mb-2">Amazon Clone</div>
                <div className="text-gray-400 text-xs">© 2024 Amazon Clone. All rights reserved.</div>
            </div>
        </footer>
    )
}