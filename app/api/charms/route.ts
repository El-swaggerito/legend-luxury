import { NextResponse } from "next/server";
import { getCharms } from "../../lib/server-products";

export async function GET() {
  try {
    const charms = getCharms();
    charms.sort((a, b) => a.title.localeCompare(b.title));
    return NextResponse.json({ charms });
  } catch (err) {
    console.error("API Error /api/charms:", err);
    return NextResponse.json({ error: "Failed to enumerate charms" }, { status: 500 });
  }
}
