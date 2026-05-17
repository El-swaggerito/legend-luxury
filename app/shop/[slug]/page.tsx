import { getProductById } from "@/app/lib/server-products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug);
  if (!product) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/shop" className="text-sm text-purple-600 underline mb-6 inline-block">
        Back to Shop
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-950">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
            {product.category}
          </p>
          <h1 className="text-2xl font-bold text-neutral-900">{product.title}</h1>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span>★★★★★</span>
            <span className="text-neutral-400 ml-1">(738 reviews)</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            CA${product.price.toFixed(2)}
          </p>
          {product.description && (
            <p className="text-neutral-600 text-sm leading-relaxed">
              {product.description}
            </p>
          )}
          <AddToCartButton
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.img}
          />
        </div>
      </div>
    </main>
  );
}