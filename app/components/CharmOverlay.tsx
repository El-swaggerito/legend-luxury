"use client";
import { LuHeart, LuShoppingCart, LuEye } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useQuickView, Product } from "../context/QuickViewContext";

type CharmOverlayProps = {
  product: Product;
};

export default function CharmOverlay({ product }: CharmOverlayProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

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

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div className="absolute inset-0 z-10 hidden items-center justify-center pointer-events-none group-hover:flex">
      <div className="flex gap-2 rounded-full bg-white/90 p-2 shadow-sm animate-in fade-in zoom-in-95 pointer-events-auto">
        <button
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
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
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-accent-600 transition-colors"
        >
          <LuShoppingCart className="h-5 w-5" />
        </button>
        <button
          aria-label="Quick view charm"
          onClick={handleQuickView}
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-accent-600 transition-colors"
        >
          <LuEye className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
