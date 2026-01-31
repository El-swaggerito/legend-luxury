import Image from "next/image";

export default function FeatureGrid() {
  return (
    <section aria-label="Explore possibilities" className="mx-auto max-w-7xl bg-white px-4 py-12">
      <h2 className="mx-auto mb-8 max-w-[900px] text-center font-medium" style={{ fontFamily: "var(--font-serif)" }}>
        <span className="text-neutral-900 text-[28px] md:text-[36px]">Explore endless possibilities.</span>
      </h2>
      <div className="mx-auto max-w-5xl feature-grid">
        <div className="feature-card card1" style={{ background: "var(--color-accent-50)" }}>
          <p className="feature-title clamp-2">Customization</p>
          <p className="clamp-3 typo-base text-neutral-700 absolute left-5 bottom-5 right-5">
            Switch your charms as often as you switch your vibe. Explore, mix, match, and create designs that are bold, playful, or minimal as you want.
          </p>
          <div className="absolute left-6 top-10" style={{ width: 160, height: 160, transform: "rotate(-12deg)" }}>
            <div className="relative w-full h-full">
              <Image src="/decors/image 10.png" alt="Sticker sheet" fill className="object-contain" />
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2" style={{ width: 170, height: 170, transform: "rotate(4deg)" }}>
            <div className="relative w-full h-full">
              <Image src="/decors/image 9.png" alt="Pattern sheet" fill className="object-contain" />
            </div>
          </div>
          <div className="absolute left-5 bottom-16" style={{ width: 340, height: 100 }}>
            <div className="relative w-full h-full">
              <Image src="/decors/div.customization-ui.png" alt="Customization toolbar" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="feature-card card2" style={{ background: "var(--hi-pink)" }}>
          <p className="feature-title clamp-2">Thousands of Charms, Infinite Combos</p>
          <ul className="absolute left-5 top-20 space-y-1 typo-base text-neutral-900">
            <li>Glam & Glitter ✨</li>
            <li>Foodie Love 🍩</li>
            <li>Nature & Adventure 🌿</li>
            <li>…and much more.</li>
          </ul>
          <div className="absolute right-40 -top-6" style={{ width: 160, height: 160, transform: "rotate(-10deg)" }}>
            <div className="relative w-full h-full">
              <Image src="/decors/image 11.png" alt="Charm sheet 1" fill className="object-contain" />
            </div>
          </div>
          <div className="absolute right-20 top-10" style={{ width: 170, height: 170, transform: "rotate(8deg)" }}>
            <div className="relative w-full h-full">
              <Image src="/decors/image 10.png" alt="Charm sheet 2" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="feature-card card3" style={{ background: "var(--hi-green)" }}>
          <p className="feature-title clamp-2">From Streetwear to Chic</p>
          <p className="clamp-3 typo-base text-neutral-800 absolute left-5 bottom-5 right-5">
            Turn heads at brunch, concerts, beach days, or cozy nights in.
          </p>
          <div className="absolute left-10 top-0" style={{ width: 160, height: 160 }}>
            <div className="relative w-full h-full">
              <Image src="/decors/div.wallet-cards-group.png" alt="Wallet cards group" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="feature-card card4" style={{ background: "var(--warning-50, #fef3c7)" }}>
          <p className="feature-title clamp-2">Your Style. Your Story. Your Crocs.</p>
          <p className="clamp-3 typo-base text-neutral-800 absolute left-5 bottom-5 right-5">
            From toddlers to trendsetters, we have something for everyone.
          </p>
          <div className="absolute left-8 bottom-12" style={{ width: 180, height: 120 }}>
            <div className="relative w-full h-full">
              <Image src="/decors/37689 1.png" alt="Crocs collage" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
