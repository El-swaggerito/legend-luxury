import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ reviews: [] });
  const { data } = await supabaseAdmin
    .from("Review")
    .select("*")
    .eq("productSlug", slug)
    .order("createdAt", { ascending: false });
  return NextResponse.json({ reviews: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { productSlug, name, rating, comment } = await req.json();
  if (!productSlug || !name || !rating || !comment) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const { data, error } = await supabaseAdmin
    .from("Review")
    .insert({ id, productSlug, name, rating: Number(rating), comment })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ review: data });
}