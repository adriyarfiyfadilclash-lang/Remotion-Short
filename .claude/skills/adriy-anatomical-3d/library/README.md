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
