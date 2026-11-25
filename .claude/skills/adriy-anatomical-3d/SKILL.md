---
name: adriy-anatomical-3d
description: "Membuat video Remotion bergaya ADRIY Anatomical 3D: anatomi dan biologi 3D (organ, sistem tubuh, pembedahan konseptual, label medis, kamera, dan pencahayaan medis) dengan React Three Fiber. Gunakan untuk video edukasi kesehatan atau anatomi, misalnya cara kerja jantung, paru-paru, atau sistem saraf."
---

# ADRIY Anatomical 3D

> Isi panduan di bawah diambil dari `library/README.md`.

# ADRIY Anatomical 3D — Tahap 7: Anatomical Final Project

Tahap final yang menggabungkan sumber Tahap 1–6 dan menyediakan tujuh komponen orkestrasi untuk produksi video anatomi 3D.

## Tujuh komponen tahap final

1. `AnatomicalScene3D` — wadah Canvas React Three Fiber dengan pengaturan kamera dan latar.
2. `AnatomicalSequenceDirector` — pemilih adegan berdasarkan durasi frame.
3. `OrganFocusSequence` — mengaktifkan kelompok organ pada rentang frame tertentu.
4. `MedicalExplainerScene` — lapisan judul dan subjudul edukasi.
5. `DissectionExplainerScene` — pengendali waktu tampil adegan pembedahan konseptual.
6. `AnatomicalTitleCard` — kartu judul pembuka atau penutup.
7. `AnatomicalFinalComposition` — komposisi siap pakai yang menyatukan Canvas, judul, dan penanda frame.

## Menjalankan

```bash
npm install
npm run start
```

Render contoh:

```bash
npm run render
```

Komposisi `AnatomicalFinalProjectShowcase`: 1920×1080, 30 FPS, 210 frame (7 detik).

## Susunan pustaka

- `Core` — anatomi dasar dan rangka tubuh.
- `Dissection` — pembukaan lapisan dan potongan anatomi.
- `OrganSystems` — organ dan sistem tubuh.
- `BiologicalMotion` — gerakan proses biologis konseptual.
- `MedicalCameraLighting` — kamera dan pencahayaan.
- `MedicalEffectsLabels` — efek visual dan label.
- `FinalProject` — pengendali adegan dan komposisi produksi akhir.

## Alur produksi yang disarankan

1. Tentukan topik dan tujuan edukasi.
2. Pilih model dari `Core` atau `OrganSystems`.
3. Susun urutan adegan dengan `AnatomicalSequenceDirector`.
4. Gunakan `OrganFocusSequence` dan `DissectionExplainerScene` untuk mengatur bagian yang tampil.
5. Atur kamera dan lampu dari `MedicalCameraLighting`.
6. Tambahkan penunjuk, sorotan, pemindaian, dan label dari `MedicalEffectsLabels`.
7. Bungkus seluruh adegan dengan `AnatomicalFinalComposition`.
8. Uji komposisi di Remotion Studio dan render sesuai durasi video.

## Catatan

Pustaka ini ditujukan untuk visualisasi dan edukasi. Bentuk organ, gerakan biologis, efek rontgen, dan ukuran yang dibuat secara prosedural bukan simulasi fisiologis atau data klinis tervalidasi.

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
