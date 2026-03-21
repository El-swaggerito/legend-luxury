
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

const CROCS_IMAGE_FILES = [
  "black&chaincrocs.JPG",
  "darkpinkcrocs.JPG",
  "light-pinkcrocs.JPG",
  "purplecrocs.JPG",
  "white&bluecrocs.JPG",
  "white&redcros.JPG",
] as const;

function fileStem(file: string) {
  return file.replace(/\.[^.]+$/, "");
}

function formatCrocsTitle(file: string) {
  let base = fileStem(file);
  base = base.replace(/cros$/i, "crocs");
  base = base.replace(/darkpink/i, "dark pink");
  base = base.replace(/lightpink/i, "light pink");
  base = base.replace(/crocs$/i, " crocs");
  base = base.replace(/&/g, " & ");
  base = base.replace(/[-_]+/g, " ");
  base = base.replace(/\s+/g, " ").trim();

  return base
    .split(" ")
    .map((word) => {
      if (word === "&") return "&";
      if (word.toLowerCase() === "crocs") return "Crocs";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function crocsIdFromFile(file: string) {
  let base = fileStem(file).toLowerCase();
  base = base.replace(/cros$/, "crocs");
  base = base.replace(/&/g, "and");
  base = base.replace(/[^a-z0-9]+/g, "-");
  base = base.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return base;
}

const CROCS_BADGES: Badge[] = ["HOT", "BEST DEALS", "25% OFF", "SALE", null, null];

export const RECOMMENDED_PRODUCTS: Product[] = CROCS_IMAGE_FILES.map((file, index) => {
  const title = formatCrocsTitle(file);
  return {
    id: crocsIdFromFile(file),
    img: `/images/products/${file}`,
    title,
    badge: CROCS_BADGES[index] ?? null,
    price: 100,
    originalPrice: 120,
    rating: 5,
    reviews: 94,
    category: "Clogs",
    description: `Step into comfort and style with ${title}. Lightweight, durable, and made for everyday wear.`,
  };
});
