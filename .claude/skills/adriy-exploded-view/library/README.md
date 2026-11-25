# ADRIY Exploded View — Proyek Final

Proyek terpadu yang menggabungkan enam pustaka Exploded View menjadi satu susunan Remotion.

## Isi proyek
- `modules/animation` — animasi pembongkaran dan gerak komponen.
- `modules/transition` — perpindahan antaradegan dan transisi terurai.
- `modules/typography` — label, nomor komponen, garis penunjuk, dan anotasi 3D.
- `modules/components-assembly` — komponen mekanis, baut, soket, dan urutan perakitan.
- `modules/camera-lighting` — kamera sinematik, orbit, dolly, pencahayaan, dan panggung.
- `modules/effects` — partikel, pulsa, garis energi, pemindaian, dan debu.
- `src/ExplodedViewFinalShowcase.tsx` — contoh adegan gabungan.
- `src/Root.tsx` — komposisi Remotion.

## Spesifikasi contoh
- Ukuran: 1920 × 1080
- Laju bingkai: 30 fps
- Durasi: 240 bingkai (8 detik)
- Nama komposisi: `ExplodedViewFinalShowcase`

## Cara menjalankan
```bash
npm install
npm run studio
```

Untuk merender:
```bash
npm run render
```

Untuk pemeriksaan tipe:
```bash
npm run check
```

## Catatan integrasi
Semua enam modul tetap disimpan sebagai pustaka mandiri di dalam folder `modules/`, masing-masing memiliki README, SKILL-ADDON, contoh, dan daftar pemeriksaan. `src/index.ts` menyediakan ekspor gabungan.

Contoh final menggunakan komponen terpilih dari modul komponen/perakitan, kamera/pencahayaan, efek, dan tipografi. Modul animasi dan transisi tetap tersedia untuk dipakai pada adegan produksi berikutnya.

## Batasan dan status
- Ini adalah proyek sumber Remotion, bukan video hasil render.
- Proyek belum diuji dengan `npm install`, pemeriksaan TypeScript, Remotion Studio, atau render.
- Model mekanis dalam contoh merupakan ilustrasi prosedural sederhana, bukan model CAD presisi.
- Komponen label 3D menggunakan `Text` dari `@react-three/drei`; untuk render tanpa jaringan, pastikan font lokal tersedia dan dikonfigurasi sesuai kebutuhan versi Drei.
- Efek glow/highlight tertentu adalah pembungkus atau penanda; efek pascaproses dan garis tepi aktual perlu konfigurasi tambahan sesuai dokumentasi modul.
