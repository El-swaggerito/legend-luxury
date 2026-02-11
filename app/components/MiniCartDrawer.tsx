"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function MiniCartDrawer() {
  const router = useRouter();
  const { miniCartOpen, toggleMiniCart, items, total, updateQty, removeItem, clear } =
    useCart();
  const { formatPrice } = useCurrency();

  return (
    <>
      {miniCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={toggleMiniCart}
          aria-hidden="true"
        />
      )}
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col transform bg-white shadow-2xl transition-transform ${
          miniCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 className="text-lg font-bold text-black">Your Cart</h2>
          <button
            onClick={toggleMiniCart}
            className="rounded-full p-2 text-black hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <p className="text-sm text-black">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex gap-3 rounded-lg border border-neutral-200 p-3">
                <div className="relative h-16 w-16 flex-none overflow-hidden rounded">
                  <Image
                    src={i.image}
                    alt={i.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-black">{i.title}</p>
                      <p className="text-xs text-black font-medium">{formatPrice(i.price)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(i.id)}
                      className="rounded p-1 text-black hover:bg-neutral-50"
                      aria-label={`Remove ${i.title}`}
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <label htmlFor={`qty-${i.id}`} className="sr-only">
                      Quantity
                    </label>
                    <input
                      id={`qty-${i.id}`}
                      type="number"
                      min={1}
                      max={99}
                      value={i.qty}
                      onChange={(e) => updateQty(i.id, parseInt(e.target.value || "1", 10))}
                      className="w-16 rounded border border-neutral-300 px-2 py-1 text-sm text-black"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-neutral-200 px-4 py-4 pb-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-black">Subtotal</span>
          <span className="text-lg font-bold text-black">{formatPrice(total)}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            className="flex-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            aria-label="Checkout"
            onClick={() => {
              toggleMiniCart();
              router.push("/checkout");
            }}
          >
            Checkout
          </button>
          <button
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
            onClick={clear}
            aria-label="Clear cart"
          >
            Clear
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}

