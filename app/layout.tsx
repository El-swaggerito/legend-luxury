import type { Metadata } from "next";
import { Inter_Tight, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MiniCartDrawer from "./components/MiniCartDrawer";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";
import { QuickViewProvider } from "./context/QuickViewContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { AuthProvider } from "./context/AuthContext";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Legend Luxury",
  description: "Discover Legend Luxury crocs where comfort meets luxury. Shop premium, stylish crocs designed for durability, confidence, and all-day wear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${merriweather.variable} antialiased`}>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <QuickViewProvider>
                  <SearchProvider>
                    <Header />
                    {children}
                    <Footer />
                    <MiniCartDrawer />
                  </SearchProvider>
                </QuickViewProvider>
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
