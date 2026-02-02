"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type FilterChip = {
  key: string;
  icon?: string;
};

function Chip({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Filter by ${label}`}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 typo-small shrink-0 snap-start ${
        active ? "border-accent-600 bg-accent-100 text-accent-600" : "border-neutral-200 bg-white text-neutral-700"
      }`}
    >
      {icon ? (
        <span className="relative h-4 w-4">
          <Image src={icon} alt="" fill className="object-contain" sizes="16px" />
        </span>
      ) : (
        <span className="inline-block h-4 w-4" />
      )}
      <span>{label}</span>
    </button>
  );
}

export default function CharmsFilterBar({
  filters,
  active,
  onSelect,
  className = "",
}: {
  filters: FilterChip[];
  active: string;
  onSelect: (key: string) => void;
  className?: string;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_VISIBLE = 6;

  const canPrev = startIndex > 0;
  const canNext = startIndex + ITEMS_VISIBLE < filters.length;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(filters.length - ITEMS_VISIBLE, prev + 1));
  };

  const visibleFilters = filters.slice(startIndex, startIndex + ITEMS_VISIBLE);

  return (
    <div className={`relative flex items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        aria-label="Previous filters"
        disabled={!canPrev}
        onClick={handlePrev}
        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-neutral-700 transition-opacity ${
          canPrev ? "hover:bg-neutral-50" : "opacity-40 cursor-not-allowed"
        }`}
      >
        ‹
      </button>

      <div className="overflow-hidden flex-1 min-w-0">
        <div className="flex gap-3 transition-transform duration-300 ease-in-out">
          {visibleFilters.map((f) => (
            <Chip
              key={f.key}
              active={active === f.key}
              label={f.key}
              icon={f.icon}
              onClick={() => onSelect(f.key)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Next filters"
        disabled={!canNext}
        onClick={handleNext}
        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-neutral-700 transition-opacity ${
          canNext ? "hover:bg-neutral-50" : "opacity-40 cursor-not-allowed"
        }`}
      >
        ›
      </button>
    </div>
  );
}
