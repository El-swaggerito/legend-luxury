
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "../../lib/server-products";
import ProductView from "../../components/ProductView";
import RecommendedGrid from "../../components/RecommendedGrid";
import CharmsGrid from "@/app/components/CharmsGrid";
import ReviewSection from "@/app/components/ReviewSection";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | LegendLuxury`,
    description: product.description || `Buy ${product.title} at LegendLuxury.`,
    openGraph: {
      images: [product.img],
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-neutral-900">
            Shop
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 line-clamp-1">{product.title}</span>
        </nav>

        <ProductView product={product} />
        <ReviewSection productSlug={id} />

        {/* You May Also Like */}
        <div className="mt-24 border-t border-neutral-200 pt-16">
          <RecommendedGrid />
        </div>

        {/* You May Also Like */}
        <div className="mt-24 border-t border-neutral-200 pt-16">
          <CharmsGrid distinctCategories hideFilters limit={8} />
        </div>
      </div>
    </main>
  );
}
