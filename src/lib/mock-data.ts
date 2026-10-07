export type Product = {
  id: string;
  batch_code: string;
  supplier_name: string;
  status: "VERIFIED" | "IN_LAB";
  origin_village: string;
  origin_district: string;
  pa_percentage: number;
  moisture: number;
  available_volume_kg: number;
  moq_kg: number;
  price_per_kg: number;
  image: string;
  tested_at: string | null;
  is_eudr: boolean;
  specific_gravity: number;
  refractive_index: number;
  optical_rotation: number;
};

// Data simulasi (tanpa backend). Parameter lab turunan dihitung deterministik.
type Seed = Omit<Product, "image" | "specific_gravity" | "refractive_index" | "optical_rotation">;

const seeds: Seed[] = [
  { id: "1", batch_code: "VAL-ACEH-001", supplier_name: "Koperasi Nilam Aceh Barat", status: "VERIFIED", origin_village: "Pasi Mali", origin_district: "Aceh Barat", pa_percentage: 32.5, moisture: 2.1, available_volume_kg: 500, moq_kg: 50, price_per_kg: 850000, tested_at: "2026-06-20T10:00:00Z", is_eudr: true },
  { id: "2", batch_code: "VLM-2606-002", supplier_name: "Tani Makmur Jaya", status: "VERIFIED", origin_village: "Pante Ceureumen", origin_district: "Aceh Barat", pa_percentage: 31.8, moisture: 2.8, available_volume_kg: 250, moq_kg: 50, price_per_kg: 830000, tested_at: "2026-06-21T14:30:00Z", is_eudr: false },
  { id: "3", batch_code: "VLM-2606-003", supplier_name: "Koperasi Atsiri Gayo", status: "IN_LAB", origin_village: "Terangun", origin_district: "Gayo Lues", pa_percentage: 0, moisture: 0, available_volume_kg: 1000, moq_kg: 50, price_per_kg: 900000, tested_at: null, is_eudr: false },
  { id: "4", batch_code: "VLM-2606-004", supplier_name: "Nilam Sejahtera Selatan", status: "VERIFIED", origin_village: "Kluet Utara", origin_district: "Aceh Selatan", pa_percentage: 34.2, moisture: 1.8, available_volume_kg: 150, moq_kg: 50, price_per_kg: 950000, tested_at: "2026-06-18T09:15:00Z", is_eudr: true },
  { id: "5", batch_code: "VLM-2606-005", supplier_name: "Koperasi Tani Nusantara", status: "VERIFIED", origin_village: "Peudada", origin_district: "Bireuen", pa_percentage: 30.5, moisture: 3.0, available_volume_kg: 800, moq_kg: 50, price_per_kg: 800000, tested_at: "2026-06-22T11:00:00Z", is_eudr: false },
  { id: "6", batch_code: "VAL-ACEH-007", supplier_name: "Koperasi Nilam Aceh Selatan", status: "VERIFIED", origin_village: "Lhok Ketapang", origin_district: "Aceh Selatan", pa_percentage: 32.8, moisture: 0.9, available_volume_kg: 300, moq_kg: 10, price_per_kg: 830000, tested_at: "2026-06-30T10:00:00Z", is_eudr: true },
  { id: "7", batch_code: "VAL-ACEH-005", supplier_name: "Koperasi Produsen Atsiri Gayo", status: "VERIFIED", origin_village: "Takengon Barat", origin_district: "Aceh Tengah", pa_percentage: 34.0, moisture: 0.7, available_volume_kg: 250, moq_kg: 10, price_per_kg: 840000, tested_at: "2026-06-28T08:00:00Z", is_eudr: true },
  { id: "8", batch_code: "VAL-ACEH-006", supplier_name: "Koperasi Produsen Atsiri Gayo", status: "VERIFIED", origin_village: "Wih Pesam", origin_district: "Bener Meriah", pa_percentage: 30.8, moisture: 1.0, available_volume_kg: 180, moq_kg: 10, price_per_kg: 760000, tested_at: "2026-06-27T08:00:00Z", is_eudr: false },
  { id: "9", batch_code: "VAL-ACEH-008", supplier_name: "Koperasi Nilam Aceh Selatan", status: "VERIFIED", origin_village: "Singkil Barat", origin_district: "Aceh Singkil", pa_percentage: 28.5, moisture: 1.4, available_volume_kg: 220, moq_kg: 10, price_per_kg: 670000, tested_at: "2026-06-26T08:00:00Z", is_eudr: false },
  { id: "10", batch_code: "VAL-ACEH-003", supplier_name: "KUD Makmur Sejahtera", status: "VERIFIED", origin_village: "Terangun", origin_district: "Gayo Lues", pa_percentage: 29.8, moisture: 1.3, available_volume_kg: 400, moq_kg: 10, price_per_kg: 720000, tested_at: "2026-06-25T08:00:00Z", is_eudr: false },
];

export const products: Product[] = seeds.map((s, i) => ({
  ...s,
  image: "/images/premium_oil_dark.png",
  specific_gravity: Number((0.955 + (i % 5) * 0.004).toFixed(3)),
  refractive_index: Number((1.508 + (i % 6) * 0.001).toFixed(3)),
  optical_rotation: -(48 + ((i * 3) % 14)),
}));

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const districts = Array.from(new Set(products.map((p) => p.origin_district))).sort();
