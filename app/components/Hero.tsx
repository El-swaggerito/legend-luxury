"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const scrollToVibe = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("vibe-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("play-showreel"));
    }
  };

  return (
    <section aria-label="Promotions" className="relative isolate overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-2 top-10 h-20 w-20 md:left-6 md:top-16 md:h-28 md:w-28">
        <Image src="/decors/herodeco1.png" alt="" fill className="object-contain" sizes="112px" />
      </div>
      <div className="pointer-events-none absolute left-24 top-48 h-12 w-12 md:left-40 md:top-56">
        <Image src="/decors/herodeco2.png" alt="" fill className="object-contain" sizes="48px" />
      </div>
      <div className="pointer-events-none absolute left-10 top-40 h-8 w-8 md:left-20 md:top-44">
        <Image src="/decors/herodeco2.png" alt="Heart sticker" fill className="object-contain" sizes="32px" />
      </div>
      <div className="pointer-events-none absolute right-10 top-20 h-16 w-16 md:right-20 md:top-24">
        <Image src="/decors/herodeco3.png" alt="" fill className="object-contain" sizes="64px" />
      </div>
      <div className="pointer-events-none absolute right-6 bottom-24 h-14 w-14 md:right-12 md:bottom-32">
        <Image src="/decors/herodeco4.png" alt="" fill className="object-contain" sizes="56px" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-1 text-neutral-900 font-bold leading-[1.1] md:text-[56px] md:leading-[1.05]">
            <span className="block">
              Express <span className="brush-underline">Yourself</span> with Custom-
            </span>
            <span className="block">
              <span className="highlight-blob highlight-green">Designed</span> Crocs and{" "}
              <span className="highlight-blob highlight-pink">Charms!</span>
            </span>
          </h1>
          <p className="mt-4 typo-small text-neutral-500">
            Custom Crocs with 1000s of charms — because your vibe changes, and so can your shoes.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/shop" className="inline-flex items-center gap-1 rounded-full bg-accent-600 px-6 py-2 typo-base font-semibold text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-600">
              Buy Now <span aria-hidden="true">▾</span>
            </Link>
            <button
              onClick={scrollToVibe}
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-2 typo-base font-semibold text-neutral-800 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              Watch showreel
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-x-hidden">
          <ul className="flex gap-4">
            {[
              { id: "card1", title: "summer festivals", img: "/images/ind blocks (1).png" },
              { id: "card2", title: "Glowstep Nights", img: "/images/ind blocks (2).png" },
              { id: "card3", title: "summer festivals", img: "/images/ind blocks (3).png" },
              { id: "card4", title: "Glowstep Nights", img: "/images/ind blocks (2).png" },
              { id: "card5", title: "summer festivals", img: "/images/ind blocks (1).png" }
            ].map((c) => (
              <li key={c.id} className="relative w-64 flex-none overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="absolute left-3 top-3 rounded-full bg-neutral-900/80 px-2 py-1 typo-small text-white">
                  {c.title}
                </div>
                <div className="relative aspect-[4/3] w-full">
                  <Image src={c.img} alt={c.title} fill className="object-cover" sizes="256px" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

