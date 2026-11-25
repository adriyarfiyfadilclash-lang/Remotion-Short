# Skill Add-on — Exploded View Effects

## Tujuan
Menambahkan efek pendukung yang memperjelas struktur, arah pemisahan, dan area penting pada objek.

## Alur penggunaan
1. Gunakan `ExplodedParticleField3D` untuk aksen saat komponen mulai terurai.
2. Tambahkan `ExplodedPulseRing3D` pada titik pemisahan atau pusat dudukan.
3. Gerakkan `ComponentScanSweep3D` ketika memperkenalkan struktur objek.
4. Gunakan `ExplodedEnergyArc3D` untuk menuntun mata ke bagian yang sedang dibahas.
5. Tambahkan `ExplodedDust3D` secara halus untuk memberi kedalaman.
6. Terapkan material emisif atau `Edges` pada mesh tertentu bila perlu penekanan visual.

## Prinsip visual
- Efek harus membantu penjelasan, bukan menjadi pusat perhatian.
- Jangan menutupi bentuk komponen dengan partikel yang terlalu rapat.
- Batasi warna aksen menjadi satu atau dua warna utama.
- Hindari kilatan cepat yang mengganggu keterbacaan.
- Sesuaikan durasi efek dengan urutan narasi dan gerak komponen.

## Batasan
Komponen glow dan highlight merupakan pembungkus/penanda, bukan sistem pascaproses glow atau outline otomatis. Untuk hasil tersebut, implementasikan material atau tahap pascaproses secara terpisah.
