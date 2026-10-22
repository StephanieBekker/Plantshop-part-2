import "./globals.css";
import "./spire.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";
import OrderNotification from "@/components/checkout/OrderNotification";

export const metadata = {
  title: "SPIRE",
  description: "SPIRE plant shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Keep the wrapper used by the existing SPIRE styles */}
        <div id="root">
          <CartProvider>
            <Navbar />
            {children}
            <OrderNotification />
            <Footer />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
