import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

type Charm = {
  id: string;
  title: string;
  img: string;
  category: string;
  badge?: "HOT" | "25% OFF" | "BEST DEALS" | "SALE";
};

function toTitleCase(s: string): string {
  const cleaned = s.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return cleaned
    .split(/(\s+|-)/)
    .map((part) => (part === "-" || /\s+/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

export async function GET() {
  try {
    const root = path.join(process.cwd(), "public", "images", "charms");
    const categories = fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

    const charms: Charm[] = [];
    for (const cat of categories) {
      const catDir = path.join(root, cat);
      const files = fs.readdirSync(catDir, { withFileTypes: true }).filter((f) => f.isFile());
      for (const f of files) {
        const ext = path.extname(f.name).toLowerCase();
        if (![".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(ext)) continue;
        const title = toTitleCase(path.basename(f.name, ext));
        const img = `/images/charms/${cat}/${f.name}`;
        const id = `${cat}-${title}`.toLowerCase().replace(/\s+/g, "-");
        charms.push({ id, title, img, category: cat });
      }
    }

    charms.sort((a, b) => a.title.localeCompare(b.title));
    return NextResponse.json({ charms });
  } catch (err) {
    return NextResponse.json({ error: "Failed to enumerate charms" }, { status: 500 });
  }
}
