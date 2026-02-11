"use client";
import { createContext, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuX } from "react-icons/lu";
import { useCurrency } from "./CurrencyContext";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
};

type QuickViewContextValue = {
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
};

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { formatPrice } = useCurrency();

  const openQuickView = (product: Product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);

  return (
    <QuickViewContext.Provider value={{ openQuickView, closeQuickView }}>
      {children}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={closeQuickView}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={closeQuickView}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-neutral-500 hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <LuX className="h-6 w-6" />
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-neutral-50">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col p-8">
                <div className="mb-auto">
                  {selectedProduct.category && (
                    <span className="text-sm font-medium text-accent-600">
                      {selectedProduct.category}
                    </span>
                  )}
                  <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                    {selectedProduct.title}
                  </h2>
                  <div className="mt-4 text-xl font-bold text-neutral-900">
                    {formatPrice(selectedProduct.price)}
                  </div>
                  <p className="mt-4 text-neutral-600 leading-relaxed">
                    {selectedProduct.description || "Experience comfort and style with this premium item. Perfect for any occasion and built with our signature comfort technology."}
                  </p>
                </div>

                <div className="mt-8 flex gap-4 border-t border-neutral-100 pt-8">
                  <Link
                    href={`/product/${selectedProduct.id}`}
                    className="flex-1 rounded-full bg-accent-600 px-6 py-3 text-center font-semibold text-white transition-transform hover:opacity-90 active:scale-95"
                    onClick={closeQuickView}
                  >
                    View Details
                  </Link>
                  <button
                    onClick={closeQuickView}
                    className="flex-1 rounded-full border border-neutral-200 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </QuickViewContext.Provider>
  );
}

export const useQuickView = () => {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
};
