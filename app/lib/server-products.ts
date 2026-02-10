
import fs from "node:fs";
import path from "node:path";
import { Product, RECOMMENDED_PRODUCTS } from "../data/static-products";

function toTitleCase(s: string): string {
  const cleaned = s.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return cleaned
    .split(/(\s+|-)/)
    .map((part) => (part === "-" || /\s+/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

export function getCharms(): Product[] {
  try {
    const root = path.join(process.cwd(), "public", "images", "charms");
    if (!fs.existsSync(root)) return [];

    const categories = fs.readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    const charms: Product[] = [];
    for (const cat of categories) {
      const catDir = path.join(root, cat);
      const files = fs.readdirSync(catDir, { withFileTypes: true }).filter((f) => f.isFile());
      for (const f of files) {
        const ext = path.extname(f.name).toLowerCase();
        if (![".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(ext)) continue;
        const title = toTitleCase(path.basename(f.name, ext));
        const img = `/images/charms/${cat}/${f.name}`;
        const id = `${cat}-${title}`.toLowerCase().replace(/\s+/g, "-");
        
        let price = 3.50; // Default price
        const catLower = cat.toLowerCase();
        if (catLower.includes("designer") || catLower.includes("chains")) {
          price = 4.50;
        }

        charms.push({
          id,
          title,
          img,
          category: toTitleCase(cat),
          badge: null,
          price,
          rating: 4.8,
          reviews: 120,
          description: `Add a touch of personality to your Crocs with the ${title} charm. Easy to insert and remove, this high-quality charm is perfect for customizing your look.`
        });
      }
    }
    return charms;
  } catch (err) {
    console.error("Failed to load charms:", err);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const staticProduct = RECOMMENDED_PRODUCTS.find((p) => p.id === id);
  if (staticProduct) return staticProduct;

  const charms = getCharms();
  return charms.find((p) => p.id === id);
}

export async function getAllProducts(): Promise<Product[]> {
  const charms = getCharms();
  return [...RECOMMENDED_PRODUCTS, ...charms];
}
