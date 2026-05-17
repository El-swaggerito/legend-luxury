import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const { items, total, currency, shipping } = await req.json();

  if (!items?.length || !total || !shipping) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  const token = req.cookies.get("auth_token")?.value;
  const payload = token ? verifyToken(token) : null;

  const orderId = crypto.randomUUID();

  const { error: orderError } = await supabaseAdmin
    .from("Order")
    .insert({
      id: orderId,
      userId: payload?.id ?? null,
      total,
      currency,
      email: shipping.email,
      name: `${shipping.firstName} ${shipping.lastName}`,
      address: shipping.address,
      apartment: shipping.apartment ?? null,
      city: shipping.city,
      state: shipping.state,
      zip: shipping.zip,
      country: shipping.country,
      phone: shipping.phone,
      status: "PAID",
    });

  if (orderError) {
    console.error("Order error:", orderError);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }

  const orderItems = items.map((item: any) => ({
    id: crypto.randomUUID(),
    orderId,
    productId: item.id,
    title: item.title,
    price: item.price,
    quantity: item.qty,
    image: item.image,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from("OrderItem")
    .insert(orderItems);

  if (itemsError) {
    console.error("OrderItems error:", itemsError);
  }

  return NextResponse.json({ orderId });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ orders: [] });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ orders: [] });

  const { data } = await supabaseAdmin
    .from("Order")
    .select("*, OrderItem(*)")
    .eq("userId", payload.id)
    .order("createdAt", { ascending: false });

  return NextResponse.json({ orders: data ?? [] });
}