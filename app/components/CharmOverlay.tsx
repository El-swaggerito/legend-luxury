"use client";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type CharmOverlayProps = {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
  };
};

export default function CharmOverlay({ product }: CharmOverlayProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 sm:inset-0 sm:flex-row sm:items-center sm:justify-center sm:bg-black/20 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 pointer-events-none">
      <div className="flex flex-col gap-2 sm:flex-row sm:rounded-full sm:bg-white/90 sm:p-2 sm:shadow-sm sm:animate-in sm:fade-in sm:zoom-in-95 pointer-events-auto">
        <button
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm sm:shadow-none sm:bg-transparent transition-colors ${
            isWishlisted
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "text-neutral-700 hover:bg-neutral-100 hover:text-accent-600"
          }`}
        >
          <LuHeart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
        <button
          aria-label="Add charm to cart"
          onClick={handleAddToCart}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm sm:shadow-none sm:bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-accent-600 transition-colors"
        >
          <LuShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}