"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Currency = "CAD" | "USD";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("currency");
    if (saved === "USD" || saved === "CAD") {
      setCurrency(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("currency", currency);
    }
  }, [currency, mounted]);

  const formatPrice = (price: number) => {
    let finalPrice = price;
    if (currency === "USD") {
      finalPrice = price * 0.74; // Exchange rate: 1 CAD = 0.74 USD
    }
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(finalPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
