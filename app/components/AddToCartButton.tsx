"use client";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartButton({
  id, title, price, image,
}: {
  id: string; title: string; price: number; image: string;
}) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem({ id, title, price, image })}
      className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition active:scale-95"
    >
      Add to Cart
    </button>
  );
}