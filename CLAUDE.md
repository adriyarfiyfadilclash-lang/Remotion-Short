# Remotion-Short

Video pendek edukasi 9:16 dengan Remotion.

## Gaya baku: ADRIY Anatomical 3D
Semua video baru di repo ini WAJIB mengikuti gaya yang dijelaskan di `docs/GAYA-ADRIY-ANATOMICAL-3D.md`, kecuali pemilik meminta gaya lain. Contoh acuannya adalah video jantung di `src/`. Pakai ulang komponen yang sudah ada (`Latar`, `Teks`, `Overlay`, `Maskot`, `Audio`, dan pola organ prosedural di `src/lib/bentuk.ts`), jangan membuat gaya baru dari nol.

## Gaya baku kedua: ADRIY Cosmic Motion
Untuk topik luar angkasa (planet, bintang, galaksi, astronomi), WAJIB pakai gaya di `docs/GAYA-ADRIY-COSMIC-MOTION.md`. Pemilik sudah menyetujui bentuk dan detailnya, jadi pertahankan persis. Pakai ulang komponen di `contoh-gaya/cosmic/pustaka.tsx`.

## Gaya baku ketiga: ADRIY Scientific 3D
Untuk topik sains mikro (molekul, kimia, DNA, genetika, sel), WAJIB pakai gaya di `docs/GAYA-ADRIY-SCIENTIFIC-3D.md`. Pemilik sudah menyetujui bentuk dan detailnya, jadi pertahankan persis. Pakai ulang komponen di `contoh-gaya/scientific/pustaka.tsx`.

## Gaya baku keempat: ADRIY Exploded View
Untuk membedah benda buatan manusia (gadget, mesin, alat rumah tangga, kendaraan), WAJIB pakai gaya di `docs/GAYA-ADRIY-EXPLODED-VIEW.md`, termasuk pola gerak kamera tur masuk-keluar untuk video. Pemilik sudah menyetujui bentuk, detail, dan gerak kameranya, jadi pertahankan persis. Pakai ulang `contoh-gaya/exploded/pustaka.tsx`, `detail.tsx`, dan `Tur.tsx`.

Pustaka gaya ADRIY lain ada di `.claude/skills/` dan hanya dipakai bila diminta.
