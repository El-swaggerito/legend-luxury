
"use client";

import { useState } from "react";
import Image from "next/image";
import { LuHeart, LuMinus, LuPlus, LuShare2, LuStar } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "../data/static-products";

export default function ProductView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M8/W10");
  const [selectedColor, setSelectedColor] = useState("Default");

  const isShoe = ["Clogs", "Men", "Women", "Kids", "Unisex"].includes(product.category);
  const isCharm = !isShoe;
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    const variantId = isShoe ? `${product.id}-${selectedSize}` : `${product.id}-${selectedColor}`;
    
    let variantTitle = product.title;
    if (isShoe) {
      variantTitle = `${product.title} (Size: ${selectedSize})`;
    } else if (selectedColor !== "Default") {
      variantTitle = `${product.title} (${selectedColor})`;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: variantId,
        title: variantTitle,
        price: product.price,
        image: product.img,
      });
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-100">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[product.img, product.img, product.img, product.img].map((img, i) => (
            <button
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 hover:border-accent-600 focus:ring-2 focus:ring-accent-600 focus:outline-none"
            >
              <Image src={img} alt="" fill className="object-contain p-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <div className="mb-6 border-b border-neutral-200 pb-6">
          <div className="flex items-center justify-between">
            <h1 className="heading-2 text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
              {product.title}
            </h1>
            <button 
              type="button"
              onClick={() => toggleWishlist({ id: product.id, title: product.title, price: product.price, image: product.img })}
              className={`rounded-full p-2 transition-colors ${isWishlisted ? "bg-red-50 text-red-500" : "text-neutral-400 hover:bg-neutral-100"}`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <LuHeart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center text-warning-500">
              <LuStar className="fill-current h-5 w-5" />
              <LuStar className="fill-current h-5 w-5" />
              <LuStar className="fill-current h-5 w-5" />
              <LuStar className="fill-current h-5 w-5" />
              <LuStar className="fill-current h-5 w-5" />
            </div>
            <span className="text-neutral-500 typo-base">{product.reviews} Reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="heading-2 text-neutral-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-neutral-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Attribute Selector */}
          {isShoe ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-neutral-900">Size</label>
                <button className="text-accent-600 underline typo-small">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["M4/W6", "M5/W7", "M6/W8", "M7/W9", "M8/W10", "M9/W11", "M10/W12", "M11"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border py-2.5 text-center typo-small transition-all ${
                      selectedSize === size
                        ? "border-accent-600 bg-accent-600 text-white shadow-md"
                        : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-neutral-900">Color</label>
              </div>
              <div className="flex gap-3">
                {["Default", "Gold", "Silver", "Rose Gold"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-accent-600 ring-2 ring-accent-100 ring-offset-2"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                    aria-label={`Select ${color}`}
                    title={color}
                  >
                    <span 
                      className={`absolute inset-1 rounded-full shadow-sm ${
                        color === "Default" ? "bg-gradient-to-br from-neutral-100 to-neutral-300" :
                        color === "Gold" ? "bg-gradient-to-br from-yellow-300 to-yellow-500" :
                        color === "Silver" ? "bg-gradient-to-br from-gray-200 to-gray-400" :
                        "bg-gradient-to-br from-rose-200 to-rose-400"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center rounded-full border border-neutral-300 bg-white px-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-neutral-500 hover:text-neutral-900"
              >
                <LuMinus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-neutral-500 hover:text-neutral-900"
              >
                <LuPlus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-neutral-900 px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Add to Cart
            </button>
          </div>

          {/* Description */}
          <div className="prose prose-neutral mt-8">
            <h3 className="text-lg font-semibold text-neutral-900">Description</h3>
            <p className="text-neutral-600 mt-2 leading-relaxed">
              {product.description || "Classic comfort meets modern style. These shoes feature our signature lightweight construction, ventilation ports for breathability, and pivoting heel straps for a more secure fit."}
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-neutral-600">
              <li>Incredibly light and fun to wear</li>
              <li>Water-friendly and buoyant; weighs only ounces</li>
              <li>Ventilation ports add breathability and help shed water and debris</li>
              <li>Easy to clean and quick to dry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
