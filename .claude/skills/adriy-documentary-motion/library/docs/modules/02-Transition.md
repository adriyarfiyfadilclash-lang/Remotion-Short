# Documentary Transition — Skill Add-on

## Tujuan
Menghubungkan adegan dokumenter secara halus, terarah, dan sesuai alur cerita.

## Komponen
- `DocumentaryCrossfade`: larut silang sederhana.
- `DocumentaryFilmWipe`: wipe editorial dari empat arah.
- `DocumentaryFlashFrame`: kilatan singkat sebagai aksen cut.
- `DocumentaryBlurDissolve`: perpindahan dengan fokus yang perlahan tajam.
- `DocumentaryDipToBlack`: turun ke hitam lalu kembali.
- `DocumentaryMatchCut`: pergeseran dua adegan yang bentuk/geraknya saling berhubungan.

## Prinsip penggunaan
1. Pilih transisi berdasarkan hubungan narasi, bukan sekadar variasi.
2. Crossfade cocok untuk perpindahan waktu, memori, atau arsip.
3. Wipe cocok untuk pergantian bab, lokasi, atau topik.
4. Dip-to-black cocok untuk jeda emosional atau penanda bab.
5. Match cut harus menghubungkan bentuk, arah gerak, atau komposisi yang serupa.
6. Flash hanya aksen sesaat; hindari kilatan berulang atau terlalu terang.
7. Jangan menumpuk banyak transisi dalam satu perpindahan.

## Catatan teknis
- Komponen memakai React dan Remotion.
- Gunakan `Sequence` untuk mengatur awal/akhir adegan.
- `DocumentaryMatchCut` mengharapkan dua tampilan adegan yang sudah disiapkan.
- Periksa durasi transisi agar tidak menutupi informasi penting.
