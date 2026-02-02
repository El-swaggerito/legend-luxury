"use client"
import Image from "next/image";
import Link from "next/link";
import CharmOverlay from "./CharmOverlay";
import { useCart } from "../context/CartContext";

type Badge = "HOT" | "25% OFF" | "BEST DEALS" | "SALE" | null;

const cards: Array<{
  id: string;
  img: string;
  title: string;
  badge: Badge;
}> = [
  { id: "c1", img: "/images/ind blocks (1).png", title: "Blush Bloom Clogs – Floral Edition", badge: "HOT" },
  { id: "c2", img: "/images/ind blocks (2).png", title: "Blush Bloom Clogs – Floral Edition", badge: null },
  { id: "c3", img: "/images/ind blocks (3).png", title: "Blush Bloom Clogs – Floral Edition", badge: "25% OFF" },
  { id: "c4", img: "/images/ind blocks (1).png", title: "Blush Bloom Clogs – Floral Edition", badge: null },
  { id: "c5", img: "/images/ind blocks (2).png", title: "Blush Bloom Clogs – Floral Edition", badge: null },
  { id: "c6", img: "/images/ind blocks (3).png", title: "Blush Bloom Clogs – Floral Edition", badge: "BEST DEALS" },
  { id: "c7", img: "/images/ind blocks (1).png", title: "Blush Bloom Clogs – Floral Edition", badge: null },
  { id: "c8", img: "/images/ind blocks (2).png", title: "Blush Bloom Clogs – Floral Edition", badge: "SALE" },
];

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

export default function RecommendedGrid({ className = "" }: { className?: string }) {
  const { addItem } = useCart();

  return (
    <section aria-label="Recommended Crocs" className={`mx-auto max-w-7xl bg-white px-4 py-12 ${className}`}>
      <h2 className="mb-8 text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
        <span className="text-[28px] md:text-[32px] font-medium">Recommended Crocs</span>
      </h2>
      <ul className="grid gap-4 grid-cols-1 min-[450px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {cards.map((c) => (
          <li
            key={c.id}
            className="group relative rounded-xl border border-neutral-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in"
          >
            <BadgeLabel badge={c.badge} />
            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 90vw, (max-width:1024px) 44vw, 22vw"
              />
              <CharmOverlay
                product={{
                  id: c.id,
                  title: c.title,
                  price: 80,
                  image: c.img,
                  category: "Recommended",
                }}
              />
            </div>
            <div className="mt-3 px-1">
              <div className="flex items-center gap-1 text-warning-500">
                <span aria-hidden="true">★★★★★</span>
                <span className="typo-small text-neutral-500">(738)</span>
              </div>
              <p className="mt-1 clamp-2 typo-base font-semibold text-neutral-900">{c.title}</p>
              <div className="mt-2">
                <ColorDots />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="typo-base font-bold text-neutral-900">$80.00</div>
                  <div className="typo-small text-neutral-400 line-through">$100.00</div>
                </div>
                <button
                  onClick={() =>
                    addItem({
                      id: c.id,
                      title: c.title,
                      price: 80,
                      image: c.img,
                    })
                  }
                  className="rounded-full bg-accent-600 px-4 py-2 typo-small font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-600 transition-transform active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
