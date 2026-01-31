import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section aria-label="Call to action" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/homecta.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 rainbow-band" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
        <h2 className="text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
          <span className="text-[28px] md:text-[36px] font-medium">Try LegendLuxury Today</span>
        </h2>
        <p className="mt-3 typo-xl text-neutral-700">Ready to customize your dream CROCS?</p>
        <div className="mt-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 rounded-full bg-accent-600 px-6 py-2 typo-base font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-600"
            aria-label="Buy Now"
          >
            Buy Now <span aria-hidden="true">➜</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

