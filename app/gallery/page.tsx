import Image from "next/image";
import Link from "next/link";
import PromoCard from "../components/PromoCard";
import { RECOMMENDED_PRODUCTS } from "../data/static-products";

const products: Array<{ id: string; src: string; alt: string; title: string; subtitle: string; rating: string }> = [...RECOMMENDED_PRODUCTS, ...RECOMMENDED_PRODUCTS]
  .slice(0, 8)
  .map((p) => ({
    id: p.id,
    src: p.img,
    alt: p.title,
    title: p.title.toUpperCase(),
    subtitle: "Classic comfort with a bold, clean look.",
    rating: `${p.rating.toFixed(1)} / ${p.reviews} reviews`,
  }));

export default function GalleryPage() {
  return (
    <main>
      <section aria-label="Gallery banner" className="relative isolate overflow-hidden min-h-[500px] flex items-center justify-center">
        <Image
          src="/images/Header.png"
          alt="Gallery Banner"
          fill
          priority
          className="object-cover z-[-1]"
        />
        <div className="absolute inset-0 bg-black/30 z-[-1]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center z-10">
          <h1 className="text-white" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[32px] md:text-[44px] font-medium">Gallery</span>
          </h1>
          <p className="mt-2 typo-base text-white/90">
            <Link href="/" className="underline">Home</Link> <span aria-hidden="true">›</span> <span>Gallery</span>
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      <section aria-label="Gallery grid" className="w-full bg-white px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, idx) => {
              const isTall = idx % 4 === 0 || idx % 4 === 2;
              return (
                <li key={`${p.id}-${idx}`} className="product-card border-neutral-200">
                  <Link
                    href={`/product/${p.id}`}
                    className="group block h-full transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                    aria-label={`View ${p.alt}`}
                  >
                    <figure className={`product-image ${isTall ? "tall" : "short"}`}>
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 22vw"
                        priority={idx < 4}
                      />
                    </figure>
                    <div className="product-content">
                      <h3 className="product-title typo-base">{p.title}</h3>
                      <p className="product-subtitle typo-base">{p.subtitle}</p>
                      <div className="product-rating">
                        <span className="stars" aria-hidden="true">★★★★★</span>
                        <span className="value">{p.rating.split("/")[0].trim()}</span>
                        <span className="reviews">{"/ " + p.rating.split("/")[1].trim()}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section aria-label="Gallery promo" className="w-full bg-white px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <PromoCard />
        </div>
      </section>
    </main>
  );
}
