import { ProductCard } from "@/components/marketplace/ProductCard";
import { products } from "@/lib/mock-data";

export const metadata = { title: "Katalog — Valam" };

export default function KatalogPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-primary">Katalog Minyak Nilam</h1>
      <p className="mt-2 text-muted-foreground">{products.length} batch tersedia dari supplier Aceh.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
