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

function getBaseName(title: string): string {
  // 1. Remove trailing numbers (e.g. "Sweet Knot 2" -> "Sweet Knot")
  // 2. Remove "in Color" suffix (e.g. "Blush Bite in Red" -> "Blush Bite")
  // 3. Remove "Color" prefix if it looks like a modifier? (Riskier, skipping for now to be safe)
  
  let base = title;
  
  // Handle "Name N"
  base = base.replace(/\s+\d+$/, "");
  
  // Handle "Name in Color" (case insensitive)
  base = base.replace(/\s+in\s+[a-zA-Z\s]+$/i, "");
  
  // Custom grouping for "Barbie" charms
  if (base.toLowerCase().startsWith("barbie")) {
    return "Barbie Collection";
  }

  return base.trim();
}

export function getCharms(): Product[] {
  try {
    const root = path.join(process.cwd(), "public", "images", "charms");
    if (!fs.existsSync(root)) return [];

    const categories = fs.readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    const allCharms: Product[] = [];
    
    // 1. Scan all files
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

        allCharms.push({
          id,
          title,
          img,
          category: toTitleCase(cat),
          badge: null,
          price,
          rating: 4.8,
          reviews: 120,
          description: `Add a touch of personality to your Crocs with the ${title} charm. Easy to insert and remove, this high-quality charm is perfect for customizing your look.`,
          variations: [],
          groupId: ""
        });
      }
    }

    // 2. Group Products
    const groups = new Map<string, Product[]>();
    
    for (const p of allCharms) {
      const baseName = getBaseName(p.title);
      // Create a unique group ID based on category + base name
      const groupId = `${p.category}-${baseName}`.toLowerCase().replace(/\s+/g, "-");
      
      p.groupId = groupId;
      
      if (!groups.has(groupId)) {
        groups.set(groupId, []);
      }
      groups.get(groupId)!.push(p);
    }

    // 3. Assign variations to leaders
    const finalProducts: Product[] = [];
    
    for (const [groupId, group] of groups.entries()) {
      // Sort group members to pick a consistent leader (e.g. shortest title, or ending in 1)
      group.sort((a, b) => a.title.length - b.title.length || a.title.localeCompare(b.title));
      
      // Create a simplified list of variations to avoid circular JSON references
      // We map the group to new objects that have 'variations' set to empty array
      const variationList = group.map(p => ({
        ...p,
        variations: []
      }));

      // Assign variations to ALL members so they can link to each other
      for (const member of group) {
        member.variations = variationList;
      }
      
      finalProducts.push(...group);
    }

    return finalProducts;
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
