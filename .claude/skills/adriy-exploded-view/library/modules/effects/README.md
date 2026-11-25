# ADRIY Exploded View — Effects

Modul efek visual untuk memperjelas pemisahan komponen dan memberi kedalaman pada adegan Exploded View.

## 7 komponen
- `ComponentGlow3D` — pembungkus penanda efek cahaya pada komponen.
- `ExplodedParticleField3D` — partikel yang menyebar dari pusat objek.
- `ExplodedPulseRing3D` — cincin pulsa untuk menandai area atau titik pemisahan.
- `ComponentScanSweep3D` — bidang pemindai yang bergerak melintasi objek.
- `ExplodedEnergyArc3D` — garis energi atau jalur teknis yang muncul bertahap.
- `ComponentHighlightFrame3D` — pembungkus penanda komponen yang perlu diberi garis tepi.
- `ExplodedDust3D` — debu halus yang bergerak perlahan.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

## Contoh
```tsx
<ExplodedParticleField3D count={80} startFrame={10} duration={45} />
<ExplodedPulseRing3D position={[0, 0, 0]} repeat />
```

Gunakan komponen di dalam `ThreeCanvas`.

## Catatan teknis penting
- Partikel memakai pola acak deterministik berbasis `seed`, sehingga posisi stabil antar-render.
- `ComponentGlow3D` adalah pembungkus metadata; untuk cahaya emisif nyata, atur `emissive` pada material mesh anak. Efek halo pascaproses memerlukan tahap render tambahan.
- `ComponentHighlightFrame3D` menyiapkan pembungkus penanda. Untuk garis tepi aktual, letakkan komponen `Edges` dari `@react-three/drei` di dalam mesh yang ingin disorot.
- `ComponentScanSweep3D` adalah bidang tipis; pastikan ukuran dan posisi sesuai dimensi objek.
- Gunakan partikel dan garis energi secukupnya agar informasi utama tetap mudah dibaca.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
