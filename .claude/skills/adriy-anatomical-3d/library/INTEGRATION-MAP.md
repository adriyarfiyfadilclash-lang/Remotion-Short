# Peta Integrasi — Tahap 7

## Arsitektur produksi
`AnatomicalFinalComposition`
- `AnatomicalScene3D` — Canvas 3D dan kamera
- `AnatomicalSequenceDirector` — urutan adegan berdasarkan frame
- `OrganFocusSequence` — rentang tampil kelompok organ
- `DissectionExplainerScene` — rentang tampil adegan pembedahan
- `MedicalExplainerScene` — judul dan subjudul
- `AnatomicalTitleCard` — pembuka atau penutup

## Hubungan dengan tahap sebelumnya
- Tahap 1–3 menyediakan model tubuh, struktur, dan sistem organ.
- Tahap 4 menyediakan animasi proses biologis.
- Tahap 5 menyediakan kamera dan pencahayaan.
- Tahap 6 menyediakan efek, label, penunjuk, dan pengukuran.
- Tahap 7 mengatur seluruh elemen menjadi komposisi dan urutan video.

## Catatan teknis
`AnatomicalSequenceDirector` mengharapkan satu elemen anak untuk setiap durasi pada `segmentFrames`. Komponen ini memilih adegan secara langsung berdasarkan frame. Untuk transisi silang (crossfade), tambahkan pengaturan opasitas pada adegan atau gunakan interpolasi Remotion pada komposisi khusus.
