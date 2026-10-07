import type { Product } from "./mock-data";
import { getPatchouliTier, type Tier } from "./utils";

export type SortKey = "terbaru" | "harga-asc" | "harga-desc" | "pa-desc";

export type Filters = {
  query: string;
  district: string; // "" = semua
  tier: Tier | ""; // "" = semua
  minPa: number;
  eudrOnly: boolean;
  sort: SortKey;
};

export const defaultFilters: Filters = {
  query: "",
  district: "",
  tier: "",
  minPa: 0,
  eudrOnly: false,
  sort: "terbaru",
};

export function filterProducts(list: Product[], f: Filters): Product[] {
  const q = f.query.trim().toLowerCase();

  const result = list.filter((p) => {
    if (q) {
      const haystack = `${p.batch_code} ${p.supplier_name} ${p.origin_village} ${p.origin_district}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.district && p.origin_district !== f.district) return false;
    if (f.tier && getPatchouliTier(p.pa_percentage) !== f.tier) return false;
    if (p.pa_percentage < f.minPa) return false;
    if (f.eudrOnly && !p.is_eudr) return false;
    return true;
  });

  const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
    terbaru: (a, b) => (b.tested_at ?? "").localeCompare(a.tested_at ?? ""),
    "harga-asc": (a, b) => a.price_per_kg - b.price_per_kg,
    "harga-desc": (a, b) => b.price_per_kg - a.price_per_kg,
    "pa-desc": (a, b) => b.pa_percentage - a.pa_percentage,
  };
  return [...result].sort(sorters[f.sort]);
}
