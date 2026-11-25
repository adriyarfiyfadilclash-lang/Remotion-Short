# ADRIY Realistic 3D — Final Project

Proyek Remotion terpadu yang menggabungkan enam pustaka Realistic 3D menjadi satu proyek.

## Isi proyek
1. Animation — gerak, rotasi, orbit, skala, lintasan, dan partikel.
2. Transitions — perpindahan adegan berbasis kedalaman dan objek 3D.
3. Typography — teks 3D metalik, neon, label, pelat, dan animasi teks.
4. Objects & Materials — objek primitif, material, kaca, logam, wireframe, bentuk ekstrusi, pedestal.
5. Camera & Lighting — kamera sinematik, dolly, orbit, shake, studio lighting, rim light, spotlight, bayangan.
6. Environment & FX — kabut, langit prosedural, bintang, debu, partikel, debris, shockwave, aura, lantai grid.

## Showcase di Remotion Studio
- `Realistic3D-Animation`
- `Realistic3D-Transitions`
- `Realistic3D-Typography`
- `Realistic3D-Objects-Materials`
- `Realistic3D-Camera-Lighting`
- `Realistic3D-Environment-FX`

Semua komposisi memakai 1920×1080 dan 30 fps. Durasi masing-masing 6 detik, kecuali showcase transisi 12 detik.

## Menjalankan
Persyaratan: Node.js versi LTS yang kompatibel dengan Remotion.

```bash
npm install
npm run start
```

Pemeriksaan tipe:
```bash
npm run typecheck
```

Contoh render:
```bash
npm run render:animation
npm run render:transitions
npm run render:typography
npm run render:objects
npm run render:camera
npm run render:environment
```

## Catatan penting
- `Extruded3DTitle` membutuhkan berkas font typeface JSON Three.js yang kompatibel. Siapkan font lokal dan berikan path yang sesuai pada komponen.
- Beberapa komponen menggunakan `@react-three/drei` untuk teks dan titik partikel.
- Untuk hasil bayangan, aktifkan `shadows` pada `ThreeCanvas` dan `castShadow` pada objek/lampu yang relevan.
- Gunakan satu pengendali kamera utama per adegan.
- Periksa intensitas cahaya dan jumlah partikel agar render tetap lancar.
- Proyek ini adalah paket sumber yang digabungkan. Belum dilakukan `npm install`, pemeriksaan TypeScript, pembukaan Remotion Studio, maupun render aktual pada lingkungan pengguna.
