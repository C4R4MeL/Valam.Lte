"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { defaultFilters, type Filters, type SortKey } from "@/lib/filter-products";
import type { Tier } from "@/lib/utils";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type Props = {
  filters: Filters;
  districts: string[];
  onChange: (next: Filters) => void;
};

export function CatalogFilters({ filters, districts, onChange }: Props) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-5 rounded-xl border border-border bg-white p-5">
      <Input
        value={filters.query}
        onChange={(e) => set("query", e.target.value)}
        placeholder="Cari batch, supplier, daerah..."
        aria-label="Cari produk"
      />

      <label className="block text-sm font-medium">
        Daerah asal
        <select className={`${selectClass} mt-1`} value={filters.district} onChange={(e) => set("district", e.target.value)}>
          <option value="">Semua daerah</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium">
        Kualitas
        <select className={`${selectClass} mt-1`} value={filters.tier} onChange={(e) => set("tier", e.target.value as Tier | "")}>
          <option value="">Semua</option>
          <option value="Premium">Premium (PA ≥ 32%)</option>
          <option value="Standard">Standard (PA 28–32%)</option>
          <option value="Basic">Basic (PA &lt; 28%)</option>
        </select>
      </label>

      <label className="block text-sm font-medium">
        PA minimum: <span className="text-primary">{filters.minPa}%</span>
        <input
          type="range"
          min={0}
          max={35}
          step={1}
          value={filters.minPa}
          onChange={(e) => set("minPa", Number(e.target.value))}
          className="mt-2 w-full accent-[#1B5E3A]"
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={filters.eudrOnly}
          onChange={(e) => set("eudrOnly", e.target.checked)}
          className="h-4 w-4 accent-[#1B5E3A]"
        />
        Hanya patuh EUDR
      </label>

      <label className="block text-sm font-medium">
        Urutkan
        <select className={`${selectClass} mt-1`} value={filters.sort} onChange={(e) => set("sort", e.target.value as SortKey)}>
          <option value="terbaru">Terbaru diuji</option>
          <option value="harga-asc">Harga terendah</option>
          <option value="harga-desc">Harga tertinggi</option>
          <option value="pa-desc">PA tertinggi</option>
        </select>
      </label>

      <Button variant="outline" className="w-full" onClick={() => onChange(defaultFilters)}>
        Reset filter
      </Button>
    </div>
  );
}
