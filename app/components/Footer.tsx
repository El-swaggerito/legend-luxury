import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-0 border-t border-neutral-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div>
            <Link href="/" className="heading-2 text-accent-600">LegendLuxury</Link>
            <p className="mt-3 typo-base text-neutral-600">
              Our vision is to provide convenience and help increase your sales business.
            </p>
          </div>
          <nav aria-label="About">
            <h3 className="heading-4 text-neutral-900">About</h3>
            <ul className="mt-3 space-y-2 typo-base text-neutral-700">
              <li><Link href="/" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Home</Link></li>
              <li><Link href="/shop" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Shop Crocs</Link></li>
              <li><Link href="/shop" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Charms</Link></li>
              <li><Link href="/shop" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Explore Styles</Link></li>
            </ul>
          </nav>
          <nav aria-label="Community">
            <h3 className="heading-4 text-neutral-900">Community</h3>
            <ul className="mt-3 space-y-2 typo-base text-neutral-700">
              <li><Link href="/blog" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Blog – Crocs Culture</Link></li>
              <li><Link href="/contact" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Shipping & Returns</Link></li>
              <li><Link href="/" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">FAQs</Link></li>
            </ul>
          </nav>
          <nav aria-label="Socials">
            <h3 className="heading-4 text-neutral-900">Socials</h3>
            <ul className="mt-3 space-y-2 typo-base text-neutral-700">
              <li>
                <Link href="/#pinterest" className="inline-flex items-center gap-2 hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded" aria-label="Pinterest">
                  <FaPinterest className="h-4 w-4" /> Pinterest
                </Link>
              </li>
              <li>
                <Link href="/#instagram" className="inline-flex items-center gap-2 hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded" aria-label="Instagram">
                  <FaInstagram className="h-4 w-4" /> Instagram
                </Link>
              </li>
              <li>
                <Link href="/#twitter" className="inline-flex items-center gap-2 hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded" aria-label="Twitter">
                  <FaTwitter className="h-4 w-4" /> Twitter
                </Link>
              </li>
              <li>
                <Link href="/#facebook" className="inline-flex items-center gap-2 hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded" aria-label="Facebook">
                  <FaFacebook className="h-4 w-4" /> Facebook
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <hr className="my-8 border-neutral-200" />
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <p className="typo-small text-neutral-500">© {new Date().getFullYear()} LegendLuxury. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 typo-small text-neutral-700">
            <Link href="/" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Privacy & Policy</Link>
            <Link href="/" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Terms & Condition</Link>
            <Link href="/" className="hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-600 rounded">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
