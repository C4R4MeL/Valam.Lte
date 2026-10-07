import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ParameterGauge } from "@/components/marketplace/ParameterGauge";
import { RadarChart } from "@/components/marketplace/RadarChart";
import { CoAViewer } from "@/components/qc/CoAViewer";
import { getProductById, products } from "@/lib/mock-data";
import { formatRupiah, getPatchouliTier, getTierColorClass, isVerified, cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const verified = isVerified(product.status);
  const tier = getPatchouliTier(product.pa_percentage);

  // Normalisasi 0–100 untuk radar: A = hasil lab, B = batas standar.
  const radarData = [
    { subject: "PA", A: Math.min((product.pa_percentage / 35) * 100, 100), B: (30 / 35) * 100, fullMark: 100 },
    { subject: "Kadar Air", A: Math.max(100 - (product.moisture / 3) * 100, 0), B: 0, fullMark: 100 },
    { subject: "Berat Jenis", A: ((product.specific_gravity - 0.95) / 0.025) * 100, B: 50, fullMark: 100 },
    { subject: "Indeks Bias", A: ((product.refractive_index - 1.507) / 0.008) * 100, B: 50, fullMark: 100 },
  ];

  return (
    <div className="container py-10">
      <Link href="/katalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        Kembali ke katalog
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
          <Image src={product.image} alt={`Minyak nilam ${product.batch_code}`} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {verified ? (
              <Badge className="gap-1">Terverifikasi</Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">Dalam Uji Lab</Badge>
            )}
            {product.is_eudr && <Badge variant="outline" className="gap-1">EUDR</Badge>}
            {verified && (
              <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-semibold", getTierColorClass(tier))}>{tier}</span>
            )}
          </div>

          <p className="mt-4 font-mono text-sm text-muted-foreground">{product.batch_code}</p>
          <h1 className="mt-1 text-3xl font-bold text-primary">{product.supplier_name}</h1>
          <p className="mt-2 flex items-center gap-1 text-muted-foreground">
                        {product.origin_village}, {product.origin_district}
          </p>

          <p className="mt-6 text-3xl font-bold text-primary">{formatRupiah(product.price_per_kg)}<span className="text-base font-normal text-muted-foreground"> / kg</span></p>

          <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-white text-sm">
            {[
              ["Stok tersedia", `${product.available_volume_kg} kg`],
              ["Minimum order (MOQ)", `${product.moq_kg} kg`],
              ["Kadar PA", verified ? `${product.pa_percentage} %` : "Menunggu hasil uji"],
              ["Kadar air", verified ? `${product.moisture} %` : "Menunggu hasil uji"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {verified && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary">Profil Mutu</h2>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <ParameterGauge label="Kadar PA" value={product.pa_percentage} max={40} minStandard={30} unit="%" />
              <ParameterGauge label="Kadar Air" value={product.moisture} max={5} minStandard={3} unit="%" isReversed />
            </div>
            <RadarChart data={radarData} />
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Certificate of Analysis</h2>
        <CoAViewer product={product} />
      </section>
    </div>
  );
}
