# Skill Add-on — Exploded View Animation

Gunakan modul ini untuk menjelaskan isi dan susunan benda dengan memisahkan bagian-bagiannya secara visual.

## Urutan animasi yang disarankan
1. Tampilkan benda dalam kondisi utuh.
2. Beri jeda singkat agar bentuk awal dikenali.
3. Pisahkan komponen utama terlebih dahulu.
4. Pisahkan komponen kecil dengan jeda bertahap.
5. Tahan posisi exploded agar penonton dapat mengamati.
6. Satukan kembali komponen bila alur cerita membutuhkannya.

## Pemilihan komponen
- Gunakan `ExplodedAssembly` sebagai pengendali progres.
- Gunakan `ExplodedPart` untuk arah dan jarak bebas.
- Gunakan `ExplodedAxisPart` untuk pemisahan lurus pada satu sumbu.
- Gunakan `ExplodedPartReveal` untuk urutan kemunculan.
- Gunakan `ExplodedPartFloat` atau `ExplodedPartOrbit` dengan intensitas kecil saja.
- Gunakan `AssemblySequence` untuk gerakan perakitan kembali.

## Aturan kualitas
1. Jaga jarak antarbagian agar tidak saling menutupi.
2. Pertahankan orientasi komponen bila detail bentuk perlu dibaca.
3. Jangan mengubah skala terlalu banyak karena dapat mengaburkan ukuran asli.
4. Urutkan pemisahan dari komponen besar ke komponen kecil.
5. Sisakan waktu observasi pada posisi terurai.
6. Pastikan semua komponen kembali tepat ke posisi rakitan.
7. Uji pada resolusi akhir dan periksa setiap bagian tidak keluar dari bingkai.
