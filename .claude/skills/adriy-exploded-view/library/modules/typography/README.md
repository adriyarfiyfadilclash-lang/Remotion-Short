# ADRIY Exploded View — Typography

Pustaka tipografi dan anotasi teknis 3D untuk menjelaskan bagian, nomor komponen, ukuran, dan detail struktur dalam animasi Exploded View.

## 7 komponen
- `ExplodedLabel3D` — label teks 3D dengan animasi kemunculan.
- `ComponentNumber3D` — penanda nomor komponen.
- `LeaderLine3D` — garis penunjuk ke bagian objek.
- `DimensionLine3D` — garis ukuran dengan label dimensi.
- `TechnicalCallout3D` — keterangan teknis dengan garis penghubung.
- `PartNameTag3D` — papan nama dan kode komponen.
- `AnnotationGroup3D` — pengelompokan anotasi dengan animasi reveal.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

## Contoh
```tsx
<group>
  <ComponentNumber3D number="01" position={[1, 1, 0]} />
  <ExplodedLabel3D text="OUTER CASING" position={[1.3, 1, 0]} />
  <LeaderLine3D points={[[0, 0, 0], [0.6, 0.6, 0], [1, 1, 0]]} />
</group>
```

Semua komponen digunakan di dalam `ThreeCanvas`. Posisi anotasi perlu disesuaikan dengan sudut kamera dan letak komponen.

## Catatan
- Komponen teks memakai `Text` dari Drei. Untuk hasil konsisten tanpa mengambil font dari jaringan, sediakan font lokal yang sesuai dan atur properti `font` pada komponen teks sesuai kebutuhan proyek.
- `LeaderLine3D` menggambar garis berdasarkan titik yang diberikan.
- `DimensionLine3D` saat ini menampilkan garis ukuran sederhana dengan tanda ujung.
- Pastikan label tidak menutupi bagian penting dari objek.
- Seluruh animasi reveal menggunakan nomor bingkai Remotion.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
