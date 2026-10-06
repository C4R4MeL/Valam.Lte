# Valam

Platform B2B minyak nilam Aceh: katalog produk, Certificate of Analysis (CoA) digital, dan traceability asal batch.

Proyek UTS Praktek POPL — Universitas Syiah Kuala.

## Tim

| Anggota | NIM |
|---|---|
| (Muhammad Farhan Alafif) | (2408107010075) |
| (Muhammad Yazid Arrazi) | (2408107010072) |

## Teknologi

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Docker

Image publik: https://hub.docker.com/r/USERNAME/valam

```bash
# jalankan dari Docker Hub
docker run -p 3000:3000 USERNAME/valam:v1-UTS

# atau build sendiri
docker build -t xirenaa/valam:v1-UTS .
docker run -p 3000:3000 xirenaa/valam:v1-UTS
```

Dockerfile memakai tiga tahap: `deps` (npm ci), `builder` (next build, output standalone), `runner` (node:20-alpine, user non-root, hanya berkas hasil build).
