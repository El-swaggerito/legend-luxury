"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PromoCard from "../components/PromoCard";
import FilterPanel, { Section } from "../components/FilterPanel";
import RecommendedGrid from "../components/RecommendedGrid";
import CharmsGrid from "../components/CharmsGrid";

export default function ShopPage() {
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});

  return (
    <main>
      <section aria-label="Shop banner" className="relative isolate overflow-hidden min-h-[500px] flex items-center justify-center">
        <Image
          src="/images/Header.png"
          alt="Shop Banner"
          fill
          priority
          className="object-cover z-[-1]"
        />
        <div className="absolute inset-0 bg-black/30 z-[-1]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center z-10">
          <h1 className="text-white" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[32px] md:text-[44px] font-medium">Shop</span>
          </h1>
          <p className="mt-2 typo-base text-white/90">
            <Link href="/" className="underline">Home</Link> <span aria-hidden="true">›</span> <span>Shop</span>
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      <section aria-label="Shop content" className="mx-auto max-w-7xl bg-white px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <FilterPanel
            className="min-w-0"
            onChange={(state) => setFilters(state)}
            sections={[
              { title: "Availability", name: "avail", type: "radio", options: [
                { label: "All", value: "all", checked: true },
                { label: "Best Sellers", value: "best" },
                { label: "New Arrivals", value: "new" },
                { label: "On Sales", value: "sales" },
              ]},
              { title: "Category", name: "cat", type: "radio", options: [
                { label: "All", value: "all", checked: true },
                { label: "Crocs", value: "crocs" },
                { label: "Charms", value: "charms" },
              ]},
              { title: "Price Tier", name: "price", type: "radio", options: [
                { label: "All Prices", value: "all", checked: true },
                { label: "Under $20", value: "u20" },
                { label: "$20 to $50", value: "20-50" },
                { label: "$50 to $100", value: "50-100" },
                { label: "$100 to $200", value: "100-200" },
                { label: "Over $200", value: "o200" },
              ]},
            ]}
          />

          <div className="min-w-0">
            {(filters.cat === "all" || filters.cat === "crocs") && (
              <RecommendedGrid 
                className="!px-0" 
                filters={filters}
              />
            )}
            
            
            {(filters.cat === "all" || filters.cat === "charms") && (
              <CharmsGrid 
              gridClassName="grid gap-3 grid-cols-2 sm:gap-6 sm:grid-cols-3 lg:grid-cols-3" 
              className="mt-8 !px-0"
              filters={filters}
              />
            )}
            <PromoCard className="mt-8" />
          </div>
        </div>
      </section>
    </main>
  );
}

