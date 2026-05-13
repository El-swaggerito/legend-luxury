"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CharmsFilterBar, { FilterChip as FilterChipType } from "./CharmsFilterBar";
import CharmOverlay from "./CharmOverlay";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

type Charm = {
  id: string;
  title: string;
  img: string;
  category: string;
  price: number;
  badge?: "HOT" | "25% OFF" | "BEST DEALS" | "SALE";
  variations?: Charm[];
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
  return cat
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function toTitleCase(s: string): string {
  const cleaned = s.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return cleaned
    .split(/(\s+|-)/)
    .map((part) =>
      part === "-" || /\s+/.test(part)
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
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
    <span
      className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${styles[badge]}`}
    >
      {badge}
    </span>
  );
}

export default function CharmsGrid({
  className = "",
  gridClassName = "grid gap-3 grid-cols-2 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4",
  distinctCategories = false,
  hideFilters = false,
  limit,
  filters,
}: {
  className?: string;
  gridClassName?: string;
  distinctCategories?: boolean;
  hideFilters?: boolean;
  limit?: number;
  filters?: Record<string, string | string[]>;
}) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
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
      .catch(() => setCharms([]));
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    charms.forEach((c) => set.add(c.category));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [charms]);

  const filtersList: FilterChip[] = useMemo(
    () =>
      categories.map((key) => ({
        key,
        icon: ICONS[key] ?? "/decors/all.png",
      })),
    [categories]
  );

  const visible = useMemo(() => {
    let result = charms;

    // Shop-level filters
    if (filters) {
      if (filters.cat && filters.cat !== "all" && filters.cat !== "charms") {
        return [];
      }
      if (filters.avail && filters.avail !== "all") {
        if (filters.avail === "best")
          result = result.filter((c) => c.badge === "BEST DEALS" || c.badge === "HOT");
        else if (filters.avail === "new")
          result = result.filter((c) => c.badge === "HOT");
        else if (filters.avail === "sales")
          result = result.filter((c) => c.badge === "SALE" || c.badge === "25% OFF");
      }
      if (filters.price && filters.price !== "all") {
        result = result.filter((c) => {
          switch (filters.price) {
            case "u20": return c.price < 20;
            case "20-50": return c.price >= 20 && c.price < 50;
            case "50-100": return c.price >= 50 && c.price < 100;
            case "100-200": return c.price >= 100 && c.price < 200;
            case "o200": return c.price >= 200;
            default: return true;
          }
        });
      }
    }

    // Subcategory filter from CharmsFilterBar
    if (active !== "All") {
      result = result.filter((c) => c.category === active);
    }

    // Grouping: only show one representative per group (the leader)
    // Defensive: if variations is missing or empty, still show the charm
    result = result.filter((c) => {
      if (!c.variations || c.variations.length === 0) return true;
      return c.id === c.variations[0].id;
    });

    if (distinctCategories) {
      const seen = new Set<string>();
      result = result.filter((c) => {
        if (seen.has(c.category)) return false;
        seen.add(c.category);
        return true;
      });
    }

    return limit ? result.slice(0, limit) : result;
  }, [active, charms, distinctCategories, limit, filters]);

  // Hide entire section only when no charms loaded at all
  if (charms.length === 0) return null;

  return (
    <section
      aria-label="Recommended Charms"
      className={`w-full bg-white px-4 py-12 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2
          className="mb-6 text-center text-neutral-900"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="text-[28px] md:text-[32px] font-medium">
            Recommended Charms
          </span>
        </h2>

        {!hideFilters && (
          <div className="mb-6 -mx-4">
            <CharmsFilterBar
              filters={filtersList as FilterChipType[]}
              active={active}
              onSelect={(key) => setActive(key)}
              className="mx-4"
            />
          </div>
        )}

        {visible.length === 0 ? (
          <p className="text-center text-neutral-400 py-12 text-sm">
            No charms found in this category yet.
          </p>
        ) : (
          <StaggerContainer
            key={active}
            className={gridClassName}
            as="ul"
            staggerDelay={0.05}
          >
            {visible.map((c) => (
              <StaggerItem
                as="li"
                key={c.id}
                className="group relative rounded-xl border border-neutral-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <BadgeLabel badge={c.badge} />
                <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
                  <Link href={`/product/${c.id}`} className="block w-full h-full">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
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
                    <span className="typo-small text-neutral-500">(738)</span>
                  </div>
                  <Link href={`/product/${c.id}`} className="block">
                    <p className="mt-1 clamp-2 typo-base font-semibold text-neutral-900 hover:text-accent-600 transition-colors">
                      {c.title}
                    </p>
                  </Link>

                  {c.variations && c.variations.length > 1 && (
                    <div className="mt-1 flex items-center gap-1">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {c.variations.slice(0, 3).map((v) => (
                          <div
                            key={v.id}
                            className="relative inline-block h-4 w-4 rounded-full ring-1 ring-white"
                          >
                            <Image
                              src={v.img}
                              alt=""
                              fill
                              className="rounded-full object-cover"
                              sizes="16px"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-medium">
                        +{c.variations.length - 1} styles
                      </span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="typo-base font-bold text-neutral-900">
                      {formatPrice(c.price)}
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
        )}
      </div>
    </section>
  );
}