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
