import Link from "next/link";
import PromoCard from "../components/PromoCard";
import FilterPanel, { Section } from "../components/FilterPanel";
import RecommendedGrid from "../components/RecommendedGrid";
import CharmsGrid from "../components/CharmsGrid";

export default function ShopPage() {
  return (
    <main>
      <section aria-label="Shop banner" className="relative isolate overflow-hidden bg-gradient-to-b from-accent-600 to-accent-100">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
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
            className=""
            sections={[
              { title: "Availability", name: "avail", type: "radio", options: [
                { label: "Best Sellers", value: "best", checked: true },
                { label: "New Arrivals", value: "new" },
                { label: "On Sales", value: "sales" },
                { label: "In Stock", value: "stock" },
              ]},
              { title: "Category", name: "cat", type: "radio", options: [
                { label: "All", value: "all", checked: true },
                { label: "Crocs", value: "crocs" },
                { label: "Charms", value: "charms" },
              ]},
              { title: "Gender", name: "gen", type: "radio", options: [
                { label: "Unisex", value: "unisex", checked: true },
                { label: "Men", value: "men" },
                { label: "Women", value: "women" },
                { label: "Kids", value: "kids" },
              ]},
              { title: "Size", name: "size", type: "radio", options: [
                { label: "US 4 – 12 (Adults)", value: "adult", checked: true },
                { label: "Kids Sizes (C1 – C13, J1 – J6)", value: "kids" },
                { label: "One Size (for charms)", value: "one" },
              ]},
              { title: "Price Tier", name: "price", type: "radio", options: [
                { label: "All Price", value: "all", checked: true },
                { label: "Under $20", value: "u20" },
                { label: "$25 to $100", value: "25-100" },
                { label: "$100 to $300", value: "100-300" },
                { label: "$300 to $500", value: "300-500" },
                { label: "$500 to $1,000", value: "500-1000" },
                { label: "$1,000 to $10,000", value: "1000-10000" },
              ]},
            ]}
            priceRange={{ min: 0, max: 1000, valueMin: 50, valueMax: 500 }}
            searchable
          />

          <div>
            <RecommendedGrid />
            <PromoCard className="mt-8" />
            <CharmsGrid gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" className="mt-8 !px-0" />
          </div>
        </div>
      </section>
    </main>
  );
}
