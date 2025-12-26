import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* ✅ RAZORPAY SCRIPT — MUST BE HERE */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <Header />
         <main className="flex-1">
          {children}
           <Toaster position="top-right" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
