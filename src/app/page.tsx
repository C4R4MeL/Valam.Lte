import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const steps = [
  { img: "/images/garden_nilam.png", title: "Panen & Penyulingan", desc: "Petani dan penyuling menghasilkan minyak nilam per batch." },
  { img: "/images/lab_test.png", title: "Uji Laboratorium", desc: "Sampel diuji, hasilnya menjadi CoA digital." },
  { img: "/images/distilasi_steel.png", title: "Tampil di Katalog", desc: "Batch terverifikasi masuk katalog dan siap dipesan." },
];

const stats = [
  { value: "10", label: "Batch contoh" },
  { value: "34,2%", label: "PA tertinggi" },
  { value: "8", label: "Kabupaten asal" },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-valam-green-900 text-white">
        <Image src="/images/hero_bg.png" alt="" fill priority className="object-cover opacity-30 -z-10" />
        <div className="container py-24 md:py-32 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-valam-gold-300">Platform B2B Minyak Nilam</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            Minyak nilam Aceh dengan mutu yang bisa dibuktikan.
          </h1>
          <p className="mt-6 text-lg text-valam-green-100 max-w-2xl">
            Valam menghubungkan buyer dengan supplier terverifikasi, lengkap dengan CoA digital dan jejak asal batch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-valam-gold-400 text-valam-green-950 hover:bg-valam-gold-300">
              <Link href="/katalog">Lihat Katalog</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-valam-green-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary text-center">Cara Kerja</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="overflow-hidden rounded-xl bg-white border border-border">
                <div className="relative h-44">
                  <Image src={s.img} alt={s.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-valam-gold-500">LANGKAH {i + 1}</p>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <dl className="grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 text-3xl md:text-5xl font-bold text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
