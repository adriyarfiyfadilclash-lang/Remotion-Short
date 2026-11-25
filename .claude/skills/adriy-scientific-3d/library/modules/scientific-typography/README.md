# ADRIY Scientific 3D — Scientific Typography

Pustaka tipografi dan anotasi 3D untuk menjelaskan struktur, angka, rumus, sumbu, dan skala dalam visualisasi ilmiah.

## 7 komponen
- `ScientificTitle3D` — judul utama ilmiah dengan animasi kemunculan.
- `ScientificLabel3D` — label ringkas untuk nama struktur.
- `ScientificFormula3D` — tampilan rumus atau notasi ilmiah.
- `ScientificDataReadout3D` — label, nilai, dan satuan.
- `ScientificAxisLabel3D` — label sumbu diagram.
- `ScientificLeaderLine3D` — garis penunjuk ke objek.
- `ScientificScaleBar3D` — batang skala dengan pembagian.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

Gunakan komponen di dalam `ThreeCanvas`.

## Contoh
```tsx
<ScientificTitle3D text="STRUKTUR ATOM" position={[0, 1.5, 0]} />
<ScientificDataReadout3D label="ENERGI" value="13.6" unit="eV" />
<ScientificScaleBar3D length={1} divisions={4} label="1 nm" />
```

## Catatan teknis
- Komponen teks memakai `Text` dari `@react-three/drei`. Untuk render tanpa jaringan, siapkan dan konfigurasi font lokal sesuai versi Drei yang digunakan.
- Rumus ditampilkan sebagai teks biasa/Unicode, bukan pengolah LaTeX. Gunakan notasi teks yang didukung font.
- Nilai pada `ScientificDataReadout3D` dan satuan pada `ScientificScaleBar3D` harus berasal dari data yang benar. Komponen tidak memvalidasi satuan atau skala ilmiah.
- `ScientificLeaderLine3D` memakai garis dari Drei; sesuaikan koordinat dengan posisi objek dan kamera.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
