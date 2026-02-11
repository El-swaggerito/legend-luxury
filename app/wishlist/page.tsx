"use client";
import Link from "next/link";
import Image from "next/image";
import { LuHeart, LuShoppingCart } from "react-icons/lu";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl bg-white px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold font-serif text-neutral-900">Your Wishlist</h1>
      <p className="mb-8 text-neutral-600">Your wishlist is currently empty.</p>
        <Link
          href="/"
          className="inline-block rounded-full bg-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-700"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-white px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold font-serif text-neutral-900">Your Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl border border-neutral-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-50">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-500 shadow-sm transition-colors hover:bg-red-50"
                aria-label="Remove from wishlist"
              >
                <LuHeart className="h-5 w-5 fill-current" />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1">{item.title}</h3>
              <p className="mt-1 font-bold text-neutral-900">{formatPrice(item.price)}</p>
              <button
                onClick={() =>
                  addItem({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  })
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
              >
                <LuShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
