import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full collection of premium custom Crocs and charms. Filter by category, price, and style to find your perfect pair.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}