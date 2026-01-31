export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "classic-clog-black",
    title: "Classic Clog",
    price: 49.99,
    image: "/images/products/classic-black.svg",
    badge: "Best Seller",
    category: "Men",
  },
  {
    id: "classic-clog-white",
    title: "Classic Clog",
    price: 49.99,
    image: "/images/products/classic-white.svg",
    badge: "New",
    category: "Women",
  },
  {
    id: "echo-clog",
    title: "Echo Clog",
    price: 69.99,
    image: "/images/products/echo.svg",
    category: "Men",
  },
  {
    id: "crush-sandal",
    title: "Crush Sandal",
    price: 59.99,
    image: "/images/products/crush-sandal.svg",
    category: "Women",
  },
  {
    id: "kids-classic",
    title: "Kids Classic Clog",
    price: 39.99,
    image: "/images/products/kids-classic.svg",
    category: "Kids",
  },
  {
    id: "mega-crush",
    title: "Mega Crush Clog",
    price: 79.99,
    image: "/images/products/mega-crush.svg",
    category: "Women",
  },
  {
    id: "jibbitz-pack",
    title: "Jibbitz Charm Pack",
    price: 14.99,
    image: "/images/products/jibbitz-pack.svg",
    category: "Jibbitz Charms",
  },
  {
    id: "work-clog",
    title: "On-The-Clock Work Clog",
    price: 54.99,
    image: "/images/products/work.svg",
    category: "Men",
  },
];

