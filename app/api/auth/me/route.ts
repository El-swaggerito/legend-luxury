import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ user: null });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ user: null });

  const { data } = await supabase
    .from("User")
    .select("id, name, email, image")
    .eq("id", payload.id)
    .single();

  if (!data) return NextResponse.json({ user: null });

  return NextResponse.json({ user: data });
}