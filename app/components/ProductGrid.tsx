"use client";
import Image from "next/image";
import { products } from "../lib/products";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

export default function ProductGrid() {
  const { query } = useSearch();
  const { addItem } = useCart();

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <section aria-label="Recommended products" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="heading-2 text-neutral-900">Recommended For You</h2>
        <p className="typo-small text-neutral-600">{filtered.length} items</p>
      </div>
      <StaggerContainer as="ul" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <StaggerItem
            as="li"
            key={p.id}
            className="group rounded-xl border border-neutral-200 bg-white shadow-sm"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
              <Image
                src={p.image}
                alt={`${p.title} in category ${p.category}`}
                fill
                className="object-cover transition-transform group-hover:scale-[1.03]"
                sizes="(max-width:768px) 50vw, (max-width:1024px) 25vw, 20vw"
              />
              {p.badge && (
                <span className="absolute left-2 top-2 rounded-full bg-success-600 px-2 py-1 text-xs font-semibold text-white">
                  {p.badge}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 px-3 py-3">
              <h3 className="typo-base font-semibold text-neutral-900">{p.title}</h3>
              <p className="typo-small text-neutral-500">{p.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="typo-base font-bold text-neutral-900">${p.price.toFixed(2)}</span>
                <button
                  aria-label={`Add ${p.title} to cart`}
                  onClick={() =>
                    addItem({ id: p.id, title: p.title, price: p.price, image: p.image })
                  }
                  className="rounded-full bg-brand-600 px-3 py-1.5 typo-small font-semibold text-white hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

