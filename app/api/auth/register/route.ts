import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  const { data: existing } = await supabase
    .from("User")
    .select("id")
    .eq("email", email)
    .single();
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();
  const { data, error } = await supabase
    .from("User")
    .insert({ id, name, email, password: hashed, role: "user" })
    .select()
    .single();
  if (error || !data) {
    console.error("Supabase insert error:", JSON.stringify(error));
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 });
  }
  const token = signToken({ id: data.id, email: data.email });
  const res = NextResponse.json({ user: { id: data.id, name: data.name, email: data.email } });
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}