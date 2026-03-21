export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
};

import { RECOMMENDED_PRODUCTS } from "../data/static-products";

export const products: Product[] = RECOMMENDED_PRODUCTS.map((p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  image: p.img,
  badge: p.badge ?? undefined,
  category: "Crocs",
}));
