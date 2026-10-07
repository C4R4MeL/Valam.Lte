"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/mock-data";

type Row = { label: string; spec: string; result: string; pass: boolean };

// Acuan spesifikasi minyak nilam (mengacu ISO 3757), nilai simulasi untuk proyek ini.
function buildRows(p: Product): Row[] {
  return [
    { label: "Patchouli Alcohol (PA)", spec: "≥ 30 %", result: `${p.pa_percentage} %`, pass: p.pa_percentage >= 30 },
    { label: "Kadar Air", spec: "≤ 3,0 %", result: `${p.moisture} %`, pass: p.moisture <= 3 },
    { label: "Berat Jenis (20°C)", spec: "0,950 – 0,975", result: p.specific_gravity.toFixed(3), pass: p.specific_gravity >= 0.95 && p.specific_gravity <= 0.975 },
    { label: "Indeks Bias (20°C)", spec: "1,507 – 1,515", result: p.refractive_index.toFixed(3), pass: p.refractive_index >= 1.507 && p.refractive_index <= 1.515 },
    { label: "Putaran Optik", spec: "−66° – −40°", result: `${p.optical_rotation}°`, pass: p.optical_rotation >= -66 && p.optical_rotation <= -40 },
  ];
}

export function CoAViewer({ product }: { product: Product }) {
  if (!product.tested_at) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        CoA belum tersedia. Batch ini masih dalam pengujian laboratorium.
      </div>
    );
  }

  const rows = buildRows(product);
  const testedAt = new Date(product.tested_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const certNo = `COA/VAL/${product.batch_code}`;

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg">
      <div className="no-print flex items-center justify-between bg-zinc-900 px-6 py-4 text-white">
        <span className="flex items-center gap-2 font-semibold tracking-wide">
          DIGITAL CoA
        </span>
        <Button size="sm" className="bg-valam-gold-400 text-zinc-950 hover:bg-valam-gold-300" onClick={() => window.print()}>
          Cetak / Simpan PDF
        </Button>
      </div>

      <div className="p-8 sm:p-10">
        <div className="border-b-2 border-valam-green-900 pb-5">
          <h3 className="text-2xl font-bold uppercase tracking-widest text-valam-green-900">Certificate of Analysis</h3>
          <p className="mt-1 text-sm text-zinc-600">No. {certNo}</p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-zinc-500">Kode batch</dt><dd className="font-semibold">{product.batch_code}</dd></div>
          <div><dt className="text-zinc-500">Tanggal uji</dt><dd className="font-semibold">{testedAt}</dd></div>
          <div><dt className="text-zinc-500">Supplier</dt><dd className="font-semibold">{product.supplier_name}</dd></div>
          <div><dt className="text-zinc-500">Asal</dt><dd className="font-semibold">{product.origin_village}, {product.origin_district}</dd></div>
        </dl>

        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-zinc-500">
              <th className="py-2 font-medium">Parameter</th>
              <th className="py-2 font-medium">Spesifikasi</th>
              <th className="py-2 font-medium">Hasil</th>
              <th className="py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-zinc-100">
                <td className="py-2.5">{r.label}</td>
                <td className="py-2.5 text-zinc-600">{r.spec}</td>
                <td className="py-2.5 font-semibold">{r.result}</td>
                <td className={`py-2.5 text-right font-semibold ${r.pass ? "text-valam-green-500" : "text-amber-600"}`}>
                  {r.pass ? "Lulus" : "Di luar spesifikasi"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-6 text-xs text-zinc-500">Dokumen simulasi untuk keperluan pembelajaran (UTS Praktek POPL).</p>
      </div>
    </div>
  );
}
