import Link from "next/link";

export default function PromoCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-200 bg-gradient-to-r from-[#d4b890] via-[#c8a879] to-[#a58547] p-8 text-center shadow-sm ${className}`}>
      <h3 className="heading-3 text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
        Step Into Style with LegendLuxury
      </h3>
      <p className="mt-2 typo-base text-neutral-800">
        Custom CROCS made just for you. Add charms, colors, and your personality.
      </p>
      <div className="mt-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-5 py-2 typo-base font-semibold text-neutral-900 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-accent-600"
        >
          Customize Now <span aria-hidden="true">➜</span>
        </Link>
      </div>
    </div>
  );
}

