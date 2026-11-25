# Documentary Sound & Atmosphere — Skill Add-on

## Tujuan
Membuat lapisan audio dokumenter yang mendukung narasi: suara lingkungan, musik latar, narasi, dan efek suara.

## Komponen
- `DocumentaryAudioBed`: musik/ambience kontinu dengan fade otomatis.
- `DocumentaryVoiceover`: jalur narasi dengan offset dan fade.
- `DocumentarySoundCue`: efek suara satu kali pada frame tertentu.
- `DocumentaryDuckedBed`: musik/ambience yang volumenya diturunkan pada rentang narasi.
- `DocumentarySoundscape`: menumpuk beberapa lapisan ambience.
- `DocumentaryAudioFade`: klip audio pada rentang frame tertentu dengan fade.

## Panduan audio
1. Narasi harus paling jelas dan menjadi fokus utama.
2. Musik latar jangan menutupi suara narator.
3. Turunkan ambience saat dialog atau narasi penting.
4. Gunakan suara lingkungan yang sesuai lokasi dan periode cerita.
5. Efek suara hanya digunakan jika membantu pemahaman atau suasana.
6. Hindari efek dramatis berlebihan yang memanipulasi makna peristiwa.
7. Periksa clipping, puncak volume, noise, dan keseimbangan stereo.

## Alur kerja
1. Susun narasi terlebih dahulu.
2. Tempatkan ambience dasar.
3. Tambahkan musik sesuai emosi dan tempo cerita.
4. Atur ducking pada bagian narasi.
5. Tambahkan efek suara pada frame yang tepat.
6. Dengarkan hasil dari awal sampai akhir menggunakan headphone dan speaker.

## Catatan teknis
- Komponen menggunakan `<Audio>` dari Remotion.
- Semua file audio harus disediakan sendiri di folder `public/audio`.
- Nilai `volume` adalah skala 0 sampai 1.
- `duckRanges` memakai nomor frame komposisi, bukan detik.
- Untuk konversi waktu ke frame: `frame = detik × fps`.
- Komponen ini tidak menyediakan audio atau lisensi musik; gunakan aset yang hak penggunaannya jelas.
