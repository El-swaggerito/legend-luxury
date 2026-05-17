"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuX, LuTrash2, LuShoppingBag, LuArrowRight } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function MiniCartDrawer() {
  const router = useRouter();
  const { miniCartOpen, toggleMiniCart, items, total, updateQty, removeItem, clear } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <>
      {miniCartOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 transition-opacity cursor-pointer" onClick={toggleMiniCart} aria-hidden="true" />
      )}
      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          miniCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <LuShoppingBag className="h-5 w-5 text-accent-600" />
            <h2 className="text-lg font-bold text-neutral-900">Your Cart</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-accent-600 px-2 py-0.5 text-xs font-semibold text-white">{items.length}</span>
            )}
          </div>
          <button onClick={toggleMiniCart} className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 transition-colors" aria-label="Close cart">
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <LuShoppingBag className="h-10 w-10 text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-neutral-500 mb-6">Looks like you haven't added anything yet.</p>
              <button
                onClick={() => { toggleMiniCart(); router.push("/shop"); }}
                className="flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700 transition-colors"
              >
                Browse Shop <LuArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-3">
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg bg-white border border-neutral-200">
                    <Image src={i.image} alt={i.title} fill className="object-contain p-1" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-neutral-900 line-clamp-2">{i.title}</p>
                      <button onClick={() => removeItem(i.id)} className="flex-shrink-0 rounded-full p-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label={`Remove ${i.title}`}>
                        <LuTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-accent-600 mt-1">{formatPrice(i.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(i.id, i.qty - 1)} disabled={i.qty <= 1} className="h-7 w-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 transition-colors text-sm font-bold">−</button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} className="h-7 w-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors text-sm font-bold">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-5 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Subtotal</span>
              <span className="text-lg font-bold text-neutral-900">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-neutral-400">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={() => { toggleMiniCart(); router.push("/checkout"); }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
            >
              Checkout <LuArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => { toggleMiniCart(); router.push("/shop"); }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              Continue Shopping
            </button>
            <button onClick={clear} className="w-full text-xs text-neutral-400 hover:text-red-500 transition-colors py-1">
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}