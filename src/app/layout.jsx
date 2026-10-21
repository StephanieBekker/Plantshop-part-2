import "./globals.css";
import "./spire.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
