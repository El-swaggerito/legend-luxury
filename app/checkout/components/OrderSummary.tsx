"use client";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

export default function OrderSummary() {
  const { items, total } = useCart();
  const shipping = 10.0; // Flat rate for example
  const tax = total * 0.08; // Approx 8% tax
  const finalTotal = total + shipping + tax;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-bold text-neutral-900 font-serif">Order Summary</h2>
      
      {items.length === 0 ? (
        <p className="text-neutral-500">Your cart is empty.</p>
      ) : (
        <ul className="mb-6 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-md border border-neutral-200 bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-500 text-xs font-bold text-white">
                  {item.qty}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="text-sm font-medium text-neutral-900 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-neutral-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col justify-center text-right">
                <p className="text-sm font-semibold text-neutral-900">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-neutral-900">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-neutral-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span className="font-medium text-neutral-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 border-t border-neutral-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-neutral-900">Total</span>
          <div className="text-right">
            <span className="text-sm text-neutral-500 mr-2">USD</span>
            <span className="text-2xl font-bold text-accent-600">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-2 opacity-60 grayscale transition-all hover:grayscale-0">
        {/* Trust Badges Placeholder */}
        <div className="h-8 rounded bg-neutral-200/50 flex items-center justify-center text-[10px] font-bold">VISA</div>
        <div className="h-8 rounded bg-neutral-200/50 flex items-center justify-center text-[10px] font-bold">MC</div>
        <div className="h-8 rounded bg-neutral-200/50 flex items-center justify-center text-[10px] font-bold">AMEX</div>
        <div className="h-8 rounded bg-neutral-200/50 flex items-center justify-center text-[10px] font-bold">DISC</div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
        <span className="h-3 w-3 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center">🔒</span>
        Secure SSL Encryption
      </div>
    </div>
  );
}
