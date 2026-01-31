"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CharmsFilterBar, { FilterChip as FilterChipType } from "./CharmsFilterBar";
import CharmOverlay from "./CharmOverlay";
import { useCart } from "../context/CartContext";

type Charm = {
  id: string;
  title: string;
  img: string;
  category: string;
  badge?: "HOT" | "25% OFF" | "BEST DEALS" | "SALE";
};

type FilterChip = {
  key: string;
  icon: string | undefined;
};

const ICONS: Record<string, string> = {
  All: "/decors/all.png",
  Animals: "/decors/animals.png",
  Bags: "/decors/bags.png",
  Bee: "/decors/bee.png",
  Bicycle: "/decors/bicycle.png",
  Chains: "/decors/chains.png",
  Butterfly: "/decors/butterfly.png",
  Cloth: "/decors/cloth.png",
  Flower: "/decors/flower.png",
  Ballet: "/decors/charm filters/ballet.png",
  Barbie: "/decors/charm filters/barbie.png",
  Blessed: "/decors/charm filters/blessed.png",
  Bow: "/decors/charm filters/bow.png",
  Brooch: "/decors/charm filters/brooch.png",
  Cross: "/decors/charm filters/cross.png",
  Designer: "/decors/charm filters/designer.png",
  Glasses: "/decors/charm filters/glasses.png",
  Kisses: "/decors/charm filters/kisses.png",
  Luck: "/decors/charm filters/luck.png",
  "Make Up": "/decors/charm filters/makeup.png",
  Mask: "/decors/charm filters/mask.png",
  Perfume: "/decors/charm filters/perfume.png",
  Queen: "/decors/charm filters/queen.png",
  Scissor: "/decors/charm filters/scissor.png",
  Shoe: "/decors/charm filters/shoe.png",
  Star: "/decors/charm filters/star.png",
  Teddy: "/decors/charm filters/teddy.png",
  Umbrella: "/decors/charm filters/umbrella.png",
};

function normalizeCategory(cat: string): string {
  const title = cat
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  return title;
}

function toTitleCase(s: string): string {
  const cleaned = s.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return cleaned
    .split(/(\s+|-)/)
    .map((part) => (part === "-" || /\s+/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function BadgeLabel({ badge }: { badge?: Charm["badge"] }) {
  if (!badge) return null;
  const styles: Record<NonNullable<Charm["badge"]>, string> = {
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

export default function CharmsGrid({
  className = "",
  gridClassName = "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
  distinctCategories = false,
  hideFilters = false,
  limit,
}: {
  className?: string;
  gridClassName?: string;
  distinctCategories?: boolean;
  hideFilters?: boolean;
  limit?: number;
}) {
  const { addItem } = useCart();
  const [active, setActive] = useState<string>("All");
  const [charms, setCharms] = useState<Charm[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/charms")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list: Charm[] = (data?.charms ?? []).map((c: Charm) => ({
          ...c,
          title: toTitleCase(c.title),
          category: normalizeCategory(c.category),
        }));
        setCharms(list);
      })
      .catch(() => {
        setCharms([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    charms.forEach((c) => set.add(c.category));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [charms]);

  const filters: FilterChip[] = useMemo(
    () =>
      categories.map((key) => ({
        key,
        icon: ICONS[key] ?? "/decors/all.png",
      })),
    [categories]
  );

  const visible = useMemo(() => {
    let result = charms;
    if (active !== "All") {
      result = charms.filter((c) => c.category === active);
    } else if (distinctCategories) {
      // Return only the first charm from each category
      const seen = new Set<string>();
      result = charms.filter((c) => {
        if (seen.has(c.category)) return false;
        seen.add(c.category);
        return true;
      });
    }

    if (limit) {
      return result.slice(0, limit);
    }
    return result;
  }, [active, charms, distinctCategories, limit]);

  return (
    <section aria-label="Recommended Charms" className={`mx-auto max-w-7xl bg-white px-4 py-12 ${className}`}>
      <h2 className="mb-6 text-center text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
        <span className="text-[28px] md:text-[32px] font-medium">Recommended Charms</span>
      </h2>

      {!hideFilters && (
        <div className="mb-6 -mx-4">
          <CharmsFilterBar
            filters={filters as FilterChipType[]}
            active={active}
            onSelect={(key) => setActive(key)}
            className="mx-4"
          />
        </div>
      )}

      <ul className={gridClassName}>
        {visible.map((c) => (
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
                  price: 80, // Hardcoded price as per UI
                  image: c.img,
                  category: c.category,
                }}
              />
            </div>
            <div className="mt-3 px-1">
              <div className="flex items-center gap-1 text-warning-500">
                <span aria-hidden="true">★★★★★</span>
                <span className="typo-small text-neutral-500">(738)</span>
              </div>
              <p className="mt-1 clamp-2 typo-base font-semibold text-neutral-900">{c.title}</p>
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
