# Documentary Animation — Skill Add-on

## Tujuan
Membuat gerakan visual dokumenter yang tenang, informatif, sinematik, dan tidak terasa seperti iklan.

## Komponen
- `DocumentaryKenBurns`: gerakan kamera perlahan pada foto/rekaman.
- `DocumentaryPhotoReveal`: membuka foto arsip secara editorial.
- `DocumentaryParallax`: kedalaman 2.5D dari beberapa lapisan gambar.
- `DocumentaryFilmFrame`: bingkai sinematik, vignette, dan tekstur grain.
- `DocumentaryImageSequence`: rangkaian foto dengan perpindahan lembut.

## Aturan visual
1. Gerakan harus mendukung cerita, bukan menarik perhatian tanpa alasan.
2. Gunakan zoom/pan perlahan; hindari gerakan cepat yang tidak diperlukan.
3. Utamakan foto, arsip, peta, dan gambar yang relevan dengan narasi.
4. Sisakan ruang untuk teks dan subtitle.
5. Gunakan parallax hanya jika layer foreground, middle-ground, dan background memang terpisah.
6. Grain dan vignette harus halus; jangan sampai mengurangi keterbacaan.

## Catatan teknis
- Komponen menggunakan API Remotion dan React.
- `DocumentaryParallax` adalah komposit 2D/2.5D, bukan model 3D.
- Siapkan aset gambar sendiri di folder `public`.
- Periksa lisensi dan hak penggunaan semua arsip/foto.
- Pastikan durasi `Sequence` cukup untuk animasi dan hindari gambar kosong.
