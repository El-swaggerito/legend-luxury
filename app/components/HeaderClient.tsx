"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { LuShoppingCart, LuHeart, LuUser, LuMenu, LuX } from "react-icons/lu";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function HeaderClient() {
  const pathname = usePathname();
  const { cartCount, toggleMiniCart } = useCart();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const getLinkClass = (path: string, isMobile = false) => {
    const isActive = pathname === path;
    const baseClass = isMobile 
      ? "block w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors" 
      : "typo-base px-3 py-2 rounded-md transition-colors";
      
    return `${baseClass} ${
      isActive
        ? "bg-neutral-100 text-accent-600 font-medium"
        : "text-neutral-800 hover:text-accent-600 hover:bg-neutral-50"
    }`;
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="bg-accent-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <p className="typo-small">Welcome to LegendLuxury.</p>
          <div className="flex items-center gap-4">
            <span className="typo-small">Follow us:</span>
            <Link href="/#twitter" aria-label="Twitter" className="text-white/90 hover:text-white">
              <FaTwitter className="h-4 w-4" />
            </Link>
            <Link href="/#facebook" aria-label="Facebook" className="text-white/90 hover:text-white">
              <FaFacebook className="h-4 w-4" />
            </Link>
            <Link href="/#instagram" aria-label="Instagram" className="text-white/90 hover:text-white">
              <FaInstagram className="h-4 w-4" />
            </Link>
            <span className="mx-2 h-5 w-px bg-white/30" />
            <button className="typo-small inline-flex items-center gap-1">Eng <span aria-hidden="true">▾</span></button>
            <button className="typo-small inline-flex items-center gap-1">USD <span aria-hidden="true">▾</span></button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden rounded-full p-2 text-neutral-800 hover:bg-neutral-50"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <LuMenu className="h-6 w-6" />
          </button>
          <Link href="/" aria-label="LegendLuxury Home" className="heading-2 text-accent-600">LegendLuxury</Link>
        </div>

        <nav ref={navRef} aria-label="Primary" className="hidden lg:flex items-center gap-4">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/shop" className={getLinkClass("/shop")}>
            Shop
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About Us
          </Link>
          <Link href="/gallery" className={getLinkClass("/gallery")}>
            Gallery
          </Link>
          {/* <Link href="/blog" className={getLinkClass("/blog")}>
            Blog
          </Link> */}
          <Link href="/contact" className={getLinkClass("/contact")}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="relative rounded-full p-2 text-accent-600 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-accent-600"
            aria-label="Open shopping cart"
            onClick={toggleMiniCart}
          >
            <LuShoppingCart className="h-6 w-6" />
            <span
              aria-live="polite"
              className="absolute -right-0.5 -top-0.5 inline-flex min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-semibold text-white"
            >
              {cartCount}
            </span>
          </button>
          <button
            className="hidden sm:block rounded-full p-2 text-accent-600 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-accent-600"
            aria-label="Wishlist"
          >
            <Link href="/wishlist">
              <LuHeart className="h-6 w-6" />
            </Link>
          </button>
          <button className="hidden sm:block rounded-full p-2 text-accent-600 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-accent-600" aria-label="Account">
            <LuUser className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <span className="heading-3 text-accent-600">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close menu"
          >
            <LuX className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/" className={getLinkClass("/", true)}>Home</Link>
          <Link href="/shop" className={getLinkClass("/shop", true)}>Shop</Link>
          <Link href="/about" className={getLinkClass("/about", true)}>About Us</Link>
          <Link href="/gallery" className={getLinkClass("/gallery", true)}>Gallery</Link>
          <Link href="/blog" className={getLinkClass("/blog", true)}>Blog</Link>
          <Link href="/contact" className={getLinkClass("/contact", true)}>Contact</Link>
          
          <div className="my-2 border-t border-neutral-200" />
          
          <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-neutral-800 hover:bg-neutral-50">
            <LuHeart className="h-5 w-5 text-accent-600" /> Wishlist
          </Link>
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-neutral-800 hover:bg-neutral-50 text-left">
            <LuUser className="h-5 w-5 text-accent-600" /> Account
          </button>
        </nav>
      </div>
    </header>
  );
}
