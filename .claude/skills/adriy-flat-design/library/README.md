# ADRIY — Flat Design Final Project

Proyek Remotion terpadu yang menggabungkan enam pustaka Flat Design.

## Isi proyek

1. Flat Animation
2. Flat Transition
3. Flat Typography
4. Flat Shapes & Icons
5. Flat Infographics
6. Flat Effects & Motion

Setiap pustaka memiliki folder `src`, contoh komposisi, dan dokumentasi. Komponen diekspor melalui berkas `src/index.ts` masing-masing pustaka.

## Menjalankan

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
npm install
npm run start
```

Remotion Studio akan menampilkan enam komposisi contoh. Pilih salah satu untuk melihat dan mengatur waktu pratinjau.

## Render

Contoh perintah:

```bash
npm run render:animation
npm run render:transition
npm run render:typography
npm run render:shapes
npm run render:infographics
npm run render:effects
```

Hasil video disimpan di folder `out` (buat folder tersebut bila belum ada).

## Pengaturan dasar

- Ukuran: 1920 × 1080
- Laju bingkai: 30 fps
- Bahasa contoh: teks singkat berbahasa Indonesia dan label visual
- Gaya: Flat Design, bentuk sederhana, warna tegas, animasi bersih

## Menggunakan komponen di video sendiri

Impor komponen dari indeks pustaka, misalnya:

```tsx
import { FlatTitleReveal } from "./libraries/flat-typography/src";

<FlatTitleReveal text="FAKTA MENARIK" accent="#2563EB" />
```

Lihat README pada setiap folder pustaka untuk daftar komponen dan properti.

## Catatan kompatibilitas

Paket ini menyatukan kode sumber dan contoh dari enam modul sebelumnya. Belum dijalankan dengan `npm install`, pemeriksaan TypeScript, Remotion Studio, atau proses render pada lingkungan ini. Jalankan pemeriksaan tersebut di perangkat/proyek tujuan sebelum produksi. Versi paket Remotion dan React ditetapkan sebagai rentang awal; sesuaikan bila proyek induk memakai versi berbeda.
