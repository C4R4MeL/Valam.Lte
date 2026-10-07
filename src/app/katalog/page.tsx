"use client";

import { useMemo, useState } from "react";
import { CatalogFilters } from "@/components/marketplace/CatalogFilters";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { defaultFilters, filterProducts, type Filters } from "@/lib/filter-products";
import { districts, products } from "@/lib/mock-data";

export default function KatalogPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const visible = useMemo(() => filterProducts(products, filters), [filters]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Katalog Minyak Nilam</h1>
      <p className="mt-2 text-muted-foreground">
        Menampilkan {visible.length} dari {products.length} batch.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <CatalogFilters filters={filters} districts={districts} onChange={setFilters} />
        </aside>

        <section>
          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Tidak ada batch yang cocok. Coba ubah atau reset filter.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
