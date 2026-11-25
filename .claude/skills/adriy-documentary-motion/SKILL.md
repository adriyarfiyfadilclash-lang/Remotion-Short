---
name: adriy-documentary-motion
description: "Membuat video Remotion bergaya ADRIY Documentary Motion: dokumenter sinematik dengan pergerakan kamera pelan (Ken Burns), grain film, light leak, subtitle, cap tanggal, photo reveal, match cut, dan audio ambience. Gunakan untuk video sejarah, kisah nyata, atau dokumenter."
---

# ADRIY Documentary Motion

> Isi panduan di bawah diambil dari `library/docs/SKILL.md`.

# ADRIY Documentary Motion Skill v1.0

## Tujuan
Membuat video dokumenter sinematik di Remotion dengan gerakan visual terukur, tipografi editorial, suasana audio, dan penyampaian informasi yang jelas.

## Enam perpustakaan inti
1. Animation — Ken Burns, reveal foto, parallax 2.5D, film frame, image sequence.
2. Transition — crossfade, wipe, flash, blur dissolve, dip-to-black, match cut.
3. Typography — title, lower third, date stamp, quote, subtitle, chapter heading.
4. Camera Movement — push, pull, pan, tilt, handheld, drift.
5. Effects — grain, vignette, light leak, dust, atmosphere, gate weave, color wash.
6. Sound & Atmosphere — audio bed, voiceover, sound cue, ducking, soundscape, audio fade.

## Bahasa visual
- Sinematik, observasional, informatif, dan tidak berlebihan.
- Utamakan foto, arsip, peta, bukti visual, dan konteks cerita.
- Gerakan lambat dan memiliki alasan naratif.
- Palet warna natural atau sedikit muted; aksen warna secukupnya.
- Tipografi editorial: serif untuk judul, sans-serif untuk data dan subtitle.
- Efek visual dan musik tidak boleh memanipulasi makna fakta.

## Alur kerja produksi
1. Susun naskah dan struktur cerita.
2. Pilih aset visual yang relevan dan legal.
3. Tentukan urutan adegan serta durasi.
4. Terapkan gerakan kamera dan animasi.
5. Tambahkan tipografi, tanggal, lokasi, dan sumber.
6. Terapkan transisi dan efek seperlunya.
7. Bangun narasi, ambience, musik, dan efek suara.
8. Periksa keterbacaan, akurasi, audio, dan hasil render.

## Prinsip fakta dan arsip
- Beri label pada ilustrasi, rekonstruksi, dan visual generatif.
- Jangan menyajikan ilustrasi sebagai foto arsip asli.
- Verifikasi tanggal, lokasi, kutipan, dan atribusi.
- Catat sumber aset dan izin penggunaannya.

## Struktur komponen
Semua komponen diekspor melalui `src/index.ts`; ekspor per kelompok tersedia di:
`animation.ts`, `transition.ts`, `typography.ts`, `camera.ts`, `effects.ts`, `audio.ts`.

## Batasan
Komponen kamera dan efek adalah komposit 2D/2.5D berbasis React/CSS, bukan simulasi kamera atau optik 3D fisik. Komponen audio membutuhkan aset audio yang disediakan sendiri.

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
