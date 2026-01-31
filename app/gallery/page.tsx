import Image from "next/image";
import Link from "next/link";
import PromoCard from "../components/PromoCard";

const products: Array<{ src: string; alt: string; title: string; subtitle: string; rating: string }> = [
  { src: "/images/img-placeholder.png", alt: "Croc Royale in black", title: "CROC ROYALE", subtitle: "The original and most popular Crocs.", rating: "5.0 / 94 reviews" },
  { src: "/images/img-placeholder-1.png", alt: "Velvetstep crocs", title: "VELVETSTEP CROCS", subtitle: "Same comfort with added height.", rating: "5.0 / 94 reviews" },
  { src: "/images/img-placeholder-2.png", alt: "Funkyfeet crocs", title: "FUNKYFEET CROCS", subtitle: "Warm and cozy with a fuzzy lining.", rating: "4.8 / 94 reviews" },
  { src: "/images/img-placeholder-3.png", alt: "Galaxy crocs", title: "GALAXY CROCS", subtitle: "Rugged design with adjustable heel strap.", rating: "3.8 / 94 reviews" },
  { src: "/images/img-placeholder-4.png", alt: "Charmd stickers pack", title: "CHARMD STICKERS", subtitle: "For instant DIYs.", rating: "5.0 / 94 reviews" },
  { src: "/images/img-placeholder-5.png", alt: "Glowkicks crocs", title: "GLOWKICKS CROCS", subtitle: "Glow in the dark or neon styles.", rating: "5.0 / 94 reviews" },
  { src: "/images/img-placeholder-6.png", alt: "Herofeet crocs", title: "HEROFET CROCS", subtitle: "Superhero-themed.", rating: "4.8 / 94 reviews" },
  { src: "/images/img-placeholder-7.png", alt: "Melody fadel crocs", title: "MELODY FADEL", subtitle: "Loud UX Designer at Apple.", rating: "3.8 / 94 reviews" },
];

export default function GalleryPage() {
  return (
    <main>
      <section aria-label="Gallery banner" className="relative isolate overflow-hidden bg-gradient-to-b from-accent-600 to-accent-100">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-white" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[32px] md:text-[44px] font-medium">Gallery</span>
          </h1>
          <p className="mt-2 typo-base text-white/90">
            <Link href="/" className="underline">Home</Link> <span aria-hidden="true">›</span> <span>Gallery</span>
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      <section aria-label="Gallery grid" className="mx-auto max-w-7xl bg-white px-4 py-10">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, idx) => {
            const isTall = idx % 4 === 0 || idx % 4 === 2;
            return (
              <li key={p.src} className="product-card border-neutral-200">
                <figure className={`product-image ${isTall ? "tall" : "short"}`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover"
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
              </li>
            );
          })}
        </ul>
      </section>
      <section aria-label="Gallery promo" className="mx-auto max-w-7xl bg-white px-4 pb-12">
        <PromoCard />
      </section>
    </main>
  );
}
