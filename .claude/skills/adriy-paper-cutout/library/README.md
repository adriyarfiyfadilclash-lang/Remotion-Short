# ADRIY Paper Cutout — Final Project

Proyek Remotion terpadu yang menggabungkan enam pustaka Paper Cutout.

## Isi proyek
- `src/paper/animation` — animasi potongan kertas.
- `src/paper/transition` — transisi kertas.
- `src/paper/typography` — tipografi.
- `src/paper/shapes-elements` — bentuk dan elemen.
- `src/paper/infographics` — infografis.
- `src/paper/texture-effects` — tekstur dan efek.
- `src/showcases` — enam komposisi contoh.
- `src/PaperCutoutShowreel.tsx` — rangkaian enam demo.
- `src/Root.tsx` — daftar komposisi Remotion.

## Komposisi
- `PaperCutoutShowreel`: 1920×1080, 30 fps, 1080 frame (36 detik).
- Enam komposisi showcase terpisah: masing-masing 1920×1080, 30 fps, 180 frame.

## Menjalankan
1. Ekstrak ZIP.
2. Buka folder proyek di terminal.
3. Jalankan `npm install`.
4. Jalankan `npm run start` untuk membuka Remotion Studio.
5. Pilih komposisi `PaperCutoutShowreel` atau salah satu showcase.
6. Gunakan `npm run render:showreel` untuk merender video gabungan.

## Catatan
Pustaka ini memakai React dan Remotion 4. Komposisi showcase diambil dari keenam modul dan digabungkan sebagai demo teknis. Beberapa komposisi showcase mungkin perlu penyesuaian tata letak ketika dipakai pada ukuran atau rasio lain.

**Status pengujian:** proyek telah dirakit dan struktur ZIP dibuat, tetapi belum diverifikasi melalui `npm install`, pemeriksaan TypeScript, Remotion Studio, atau proses render. Jalankan pengujian tersebut di lingkungan proyek sebelum produksi.
