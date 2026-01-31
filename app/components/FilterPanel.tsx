"use client";
import { useEffect, useMemo, useState } from "react";

export type Choice = {
  label: string;
  value: string;
  checked?: boolean;
};

export type Section = {
  title: string;
  name: string;
  type: "radio" | "checkbox";
  options: Choice[];
};

export type PriceRange = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange?: (min: number, max: number) => void;
};

export interface FilterPanelProps {
  sections: Section[];
  priceRange?: PriceRange;
  onChange?: (state: Record<string, string | string[]>) => void;
  className?: string;
  searchable?: boolean;
  onSearchChange?: (query: string) => void;
}

/**
 * FilterPanel
 * A reusable, responsive filter component that renders grouped filter sections
 * (radio/checkbox) and an optional price range control. It maintains internal state
 * and emits changes via onChange. Styling aligns with filter-card utilities.
 */
export default function FilterPanel({
  sections,
  priceRange,
  onChange,
  className = "",
  searchable = false,
  onSearchChange,
}: FilterPanelProps) {
  const initialState = useMemo(() => {
    const state: Record<string, string | string[]> = {};
    sections.forEach((s) => {
      if (s.type === "radio") {
        const checked = s.options.find((o) => o.checked);
        state[s.name] = checked ? checked.value : s.options[0]?.value ?? "";
      } else {
        state[s.name] = s.options.filter((o) => o.checked).map((o) => o.value);
      }
    });
    return state;
  }, [sections]);

  const [state, setState] = useState<Record<string, string | string[]>>(initialState);
  const [query, setQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(priceRange?.valueMin ?? 0);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange?.valueMax ?? 0);

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  useEffect(() => {
    if (priceRange?.onChange) priceRange.onChange(minPrice, maxPrice);
  }, [minPrice, maxPrice, priceRange]);

  return (
    <aside aria-label="Filters" className={`filter-card ${className}`}>
      {searchable && (
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            className="w-full rounded border border-neutral-300 px-2 py-2 typo-base"
            aria-label="Search content"
          />
        </div>
      )}

      {sections.map((s) => (
        <div key={s.name} className="mb-4">
          <h2 className="filter-title">{s.title}</h2>
          <div className="filter-list">
            {s.options.map((o) => (
              <label key={o.value}>
                <input
                  type={s.type}
                  name={s.name}
                  value={o.value}
                  checked={
                    s.type === "radio"
                      ? (state[s.name] as string) === o.value
                      : (state[s.name] as string[]).includes(o.value)
                  }
                  onChange={(e) => {
                    if (s.type === "radio") {
                      const next = { ...state, [s.name]: e.target.value };
                      setState(next);
                    } else {
                      const list = new Set(state[s.name] as string[]);
                      if (e.target.checked) list.add(o.value);
                      else list.delete(o.value);
                      const next = { ...state, [s.name]: Array.from(list) };
                      setState(next);
                    }
                  }}
                  aria-label={`${s.title}: ${o.label}`}
                />
                {o.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      {priceRange && (
        <div className="mt-4">
          <h2 className="filter-title">Price Range</h2>
          <div className="price-range">
            <div className="range-wrap">
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum price"
              />
            </div>
            <div className="inputs">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                aria-label="Min price"
                placeholder="Min price"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Max price"
                placeholder="Max price"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

