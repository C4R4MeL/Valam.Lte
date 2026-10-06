import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn, formatRupiah, getPatchouliTier, getTierColorClass, isVerified } from "@/lib/utils";
import type { Product } from "@/lib/mock-data";

export function ProductCard({ product }: { product: Product }) {
  const verified = isVerified(product.status);
  const tier = getPatchouliTier(product.pa_percentage);

  return (
    <Link
      href={`/katalog/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 bg-zinc-100">
        <Image
          src={product.image}
          alt={`Minyak nilam ${product.batch_code}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {verified ? (
            <Badge className="gap-1 bg-primary">Terverifikasi</Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">Dalam Uji Lab</Badge>
          )}
          {product.is_eudr && (
            <Badge variant="outline" className="gap-1 bg-white">EUDR</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-mono text-muted-foreground">{product.batch_code}</p>
        <h3 className="mt-1 font-semibold leading-snug">{product.supplier_name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    {product.origin_village}, {product.origin_district}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-muted p-2">
            <p className="text-xs text-muted-foreground">Kadar PA</p>
            <p className="font-semibold">{verified ? `${product.pa_percentage}%` : "—"}</p>
          </div>
          <div className="rounded-lg bg-muted p-2">
            <p className="text-xs text-muted-foreground">Stok</p>
            <p className="font-semibold">{product.available_volume_kg} kg</p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-lg font-bold text-primary">{formatRupiah(product.price_per_kg)}</p>
            <p className="text-xs text-muted-foreground">per kg · MOQ {product.moq_kg} kg</p>
          </div>
          {verified && (
            <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-semibold", getTierColorClass(tier))}>
              {tier}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
