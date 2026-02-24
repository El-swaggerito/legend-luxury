
export type Badge = "HOT" | "25% OFF" | "BEST DEALS" | "SALE" | null;

export interface Product {
  id: string;
  img: string;
  title: string;
  badge: Badge;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
  variations?: Product[];
  groupId?: string;
}

export const RECOMMENDED_PRODUCTS: Product[] = [
  { 
    id: "c1", 
    img: "/images/ind blocks (1).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: "HOT",
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c2", 
    img: "/images/ind blocks (2).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: null,
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c3", 
    img: "/images/ind blocks (3).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: "25% OFF",
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c4", 
    img: "/images/ind blocks (1).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: null,
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c5", 
    img: "/images/ind blocks (2).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: null,
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c6", 
    img: "/images/ind blocks (3).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: "BEST DEALS",
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c7", 
    img: "/images/ind blocks (1).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: null,
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
  { 
    id: "c8", 
    img: "/images/ind blocks (2).png", 
    title: "Blush Bloom Clogs – Floral Edition", 
    badge: "SALE",
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 738,
    category: "Clogs",
    description: "Experience the ultimate comfort with our Blush Bloom Clogs. Featuring a stunning floral design, these clogs are perfect for adding a touch of nature to your everyday style. Lightweight, durable, and easy to clean."
  },
];
