"use client"
import Image from "next/image";
import Link from "next/link";
import CharmOverlay from "./CharmOverlay";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

import { RECOMMENDED_PRODUCTS, Badge } from "../data/static-products";

function BadgeLabel({ badge }: { badge: Badge }) {
  if (!badge) return null;
  const styles: Record<Exclude<Badge, null>, string> = {
    HOT: "bg-error-500 text-white",
    "25% OFF": "bg-warning-500 text-white",
    "BEST DEALS": "bg-info-500 text-white",
    SALE: "bg-success-600 text-white",
  };
  return (
    <span className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${styles[badge]}`}>
      {badge}
    </span>
  );
}

function ColorDots() {
  return (
    <div className="flex items-center gap-2">
      <span className="typo-small text-neutral-500">Color Options:</span>
      <span className="inline-block h-3.5 w-3.5 rounded-full bg-neutral-300" />
      <span className="inline-block h-3.5 w-3.5 rounded-full bg-neutral-300" />
      <span className="inline-block h-3.5 w-3.5 rounded-full bg-neutral-300" />
    </div>
  );
}

export default function RecommendedGrid({ 
  className = "",
  filters
}: { 
  className?: string;
  filters?: Record<string, string | string[]>;
}) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const filteredProducts = RECOMMENDED_PRODUCTS.filter((p) => {
    // Category Filter
    if (filters?.cat && filters.cat !== "all" && filters.cat !== "crocs") {
      return false;
    }

    // Availability Filter
    if (filters?.avail && filters.avail !== "all") {
      if (filters.avail === "best" && p.badge !== "BEST DEALS" && p.badge !== "HOT") return false;
      if (filters.avail === "new" && p.badge !== "HOT") return false;
      if (filters.avail === "sales" && p.badge !== "SALE" && p.badge !== "25% OFF") return false;
    }

    // Price Filter
    if (filters?.price && filters.price !== "all") {
      const price = p.price;
      switch (filters.price) {
        case "u20": if (price >= 20) return false; break;
        case "20-50": if (price < 20 || price >= 50) return false; break;
        case "50-100": if (price < 50 || price >= 100) return false; break;
        case "100-200": if (price < 100 || price >= 200) return false; break;
        case "o200": if (price < 200) return false; break;
      }
    }

    return true;
  });

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section aria-label="Recommended Crocs" className={`mx-auto max-w-7xl bg-white px-4 py-12 ${className}`}>
      <h2 className="mb-8 text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
        <span className="text-[28px] md:text-[32px] font-medium">Recommended Crocs</span>
      </h2>
      <StaggerContainer as="ul" className="grid gap-4 grid-cols-1 min-[450px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {filteredProducts.map((c) => (
          <StaggerItem
            as="li"
            key={c.id}
            className="group relative rounded-xl border border-neutral-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <BadgeLabel badge={c.badge} />
            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
              <Link href={`/product/${c.id}`} className="block w-full h-full">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 90vw, (max-width:1024px) 44vw, 22vw"
                />
              </Link>
              <CharmOverlay
                product={{
                  id: c.id,
                  title: c.title,
                  price: c.price,
                  image: c.img,
                  category: c.category,
                }}
              />
            </div>
            <div className="mt-3 px-1">
              <div className="flex items-center gap-1 text-warning-500">
                <span aria-hidden="true">★★★★★</span>
                <span className="typo-small text-neutral-500">({c.reviews})</span>
              </div>
              <Link href={`/product/${c.id}`} className="block">
                <p className="mt-1 clamp-2 typo-base font-semibold text-neutral-900 hover:text-accent-600 transition-colors">{c.title}</p>
              </Link>
              <div className="mt-2">
                <ColorDots />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="typo-base font-bold text-neutral-900">{formatPrice(c.price)}</div>
                  {c.originalPrice && (
                    <div className="typo-small text-neutral-400 line-through">{formatPrice(c.originalPrice)}</div>
                  )}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      id: c.id,
                      title: c.title,
                      price: c.price,
                      image: c.img,
                    })
                  }
                  className="rounded-full bg-accent-600 px-4 py-2 typo-small font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-600 transition-transform active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
