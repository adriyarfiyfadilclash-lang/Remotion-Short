# Gaya Video: ADRIY Exploded View

Gaya baku untuk video pendek yang membedah benda buatan manusia: gadget, mesin, alat rumah tangga, kendaraan, dan perkakas. Isinya menunjukkan bagian-bagian di dalam benda dan cara kerjanya.

Contoh acuannya ada di `contoh-gaya/exploded/`:
- `ContohExploded`: tiga gambar terurai (smartphone, motor DC, lampu LED)
- `TurMotor`: video tur kamera masuk-keluar

Pemilik kanal sudah menyetujui bentuk, detail, dan gerak kamera di bawah, jadi **pertahankan persis**. Pakai ulang:
- `contoh-gaya/exploded/pustaka.tsx` (kanvas, cahaya, label, `Tembus`)
- `contoh-gaya/exploded/detail.tsx` (tekstur, sekrup, heliks, lilitan, bantalan, bubut)
- `contoh-gaya/exploded/Tur.tsx` (pengatur gerak kamera)

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- `ThreeCanvas` dengan `shadows` dan `alpha`, supaya latar cetak biru dari CSS terlihat. Pantulan lingkungan memakai `RoomEnvironment` + `PMREMGenerator`, tanpa file dari luar. Jangan pakai `@react-three/drei`.
- Semua mesh memberi dan menerima bayangan (`AktifkanBayangan`). Key light punya shadow map 2048.
- Semua gerak dihitung dari `useCurrentFrame()`, tanpa angka acak.
- Render gambar: `npx remotion still contoh-gaya/exploded/index.ts <Komposisi> out/x.png --frame=N`
- Render video: `npx remotion render contoh-gaya/exploded/index.ts TurMotor out/x.mp4`. Untuk pratinjau cepat, tambahkan `--scale=0.5`.

## 2. Palet dan bahan
| Elemen | Nilai |
|---|---|
| Latar | radial `#12263a` → `#07111d`, grid ganda cyan (120 px dan 24 px) |
| Aksen nomor, garis, dan judul kecil | emas `#e8b65d` |
| Aksen teknis (sumbu, kode, cincin lantai) | cyan `#8bc9ed` |
| Teks terang | `#e5edf4` / `#f2f6fa` |
| Lantai panggung | lingkaran `#07101a` penerima bayangan, 3 cincin cyan tipis |

Tiap bahan dibuat sesuai aslinya:
- **Aluminium dan baja**: metalness 0,85–0,95, roughness 0,1–0,3
- **Tembaga** `#c8743a` / `#d9894a`
- **Kuningan** `#d6a653`
- **Kaca**: physical, clearcoat, transparan
- **Plastik**: roughness 0,5
- **PCB**: tekstur kanvas dengan jalur tembaga, pad emas, dan tulisan silkscreen
- **Stiker baterai**: tekstur kanvas

Pencahayaan: hemisphere light, key light hangat `#fff1d6` dari kanan atas (berbayangan), rim dingin `#8bc9ed`, rim hangat `#ffb870`, dan sedikit fill dari depan.

## 3. Detail model (WAJIB)
- **Jumlah bagian**: tiap benda punya 8–9 bagian bernomor, termasuk komponen kecil yang sering terlewat (sekrup, kabel, konektor flex, pegas, bantalan, ring, isolator).
- **Bentuk tidak polos**:
  - Sudut dibulatkan (`RoundedBoxGeometry`).
  - Benda bulat dibuat dengan bubut (`Bubut`, pakai `halus` untuk kubah).
  - Ulir, pegas, dan lilitan memakai heliks atau lilitan sungguhan.
  - Rotor dibuat dari 13 lempeng baja berlapis.
  - Koil nirkabel berupa spiral datar.
- **Tulisan pada benda**: stiker, tekstur PCB, dan grill speaker dibuat dengan tekstur kanvas.
- **Bagian yang menyala**: layar, LED, dan flash memakai emissive yang makin terang saat benda dibongkar.
- **Akurasi**: ikuti susunan benda sebenarnya, misalnya urutan lapisan, magnet N/S, dan kontak sikat-komutator. Selalu cantumkan catatan "ilustrasi".

## 4. Pembongkaran
- Tiap bagian punya posisi asal (`ASAL_*`) dan arah pembongkaran (`ARAH_*`), sebagian besar di sepanjang satu sumbu (tegak untuk 9:16). Komponen samping boleh keluar ke kiri atau kanan, misalnya papan driver dan magnet.
- Kemajuan pembongkaran 0 → 1 memakai ease in-out cubic. Garis sumbu putus-putus cyan muncul saat benda terurai.
- Kamera dan posisi lantai diatur supaya benda yang terurai tidak menabrak judul (sampai sekitar y 400) dan daftar bagian (mulai sekitar y 1550).

## 5. Gerak kamera: tur masuk-keluar (WAJIB untuk video)
Pola dari `Tur.tsx`. Kamera diatur lewat daftar kunci `K(frame, target, jarak, azimut, elevasi, {fov, e, objY, objRot, tembus})`, lalu diinterpolasi dengan ease in-out cubic. Posisi kamera dihitung secara bola (spherical), sehingga geraknya melengkung mengelilingi benda.

1. **Pembuka**: benda **naik dari bawah** (objY −2,6 → 0) sambil **berputar menghadap kamera** (objRot −2,6 → 0). Kamera mulai jauh dan rendah (elevasi negatif), lalu naik dan mendekat. Judul besar tampil sekitar 4 detik.
2. **Tiap poin**:
   - **Masuk perlahan** (sekitar 1,3 detik) ke bagian itu, dengan jarak kamera 1,7–2,5 dari benda.
   - Kulit luar dan bagian yang menghalangi **memudar** lewat `Tembus` (0 = hilang, 0,1–0,3 = bayangan samar).
   - **Berhenti sekitar 2 detik** dengan kamera bergeser pelan, sambil kartu penjelasan tampil.
   - **Keluar** lagi ke tampilan utuh (jarak sekitar 7,6), dan semua bagian kembali padat.
3. **Poin berikutnya diambil dari sudut berbeda**: samping, dalam, atas, lalu bawah. Pakai efek pendukung bila relevan, misalnya percikan listrik, putaran rotor, atau LED menyala.
4. **Penutup**: benda **terurai** (e = 1), kamera mundur (jarak sekitar 13,6) dan mengorbit pelan. Semua penunjuk bernomor dan Daftar Bagian muncul.

## 6. Lapisan 2D
- **Kepala**: ikon wajik emas, tulisan "EXPLODED VIEW" (ukuran 30, jarak huruf 6), dan kotak kode monospace cyan, misalnya "EV-02 · MESIN". Info kamera "CAM x,x m · y°" di kanan atas.
- **Judul** di tengah (top 170):
  - Label kecil emas berjarak huruf lebar
  - Judul ExtraBold (ukuran 92)
  - Subjudul `#9eb7c8`
- **Penunjuk**:
  - Titik emas pada bagian, garis siku putih
  - Lingkaran emas bernomor 01, 02, dan seterusnya, dengan huruf monospace
  - Nama bagian berhuruf kapital
  - Penunjuk dibagi kiri dan kanan, dengan jarak tegak minimal 118 px supaya tidak bertumpuk
- **Kartu poin** (saat tur), di bawah (top sekitar 1330):
  - Strip emas di kiri dan lencana "POIN n/N"
  - Judul (ukuran 42) dan penjelasan 1–2 kalimat (ukuran 34)
  - Garis penunjuk dari bagian ke kartu
- **Bar progres**: titik-titik emas di bawah, satu per poin.
- **Daftar Bagian**: tabel dua kolom di bawah (bottom 110) dengan kepala "DAFTAR BAGIAN" monospace emas.
- **Catatan kejujuran** paling bawah, misalnya "ILUSTRASI · TATA LETAK BERBEDA TIAP MODEL".
- Font **Poppins** lokal, dan **DejaVu Sans Mono** untuk kode dan angka.

## 7. Isi
- Satu poin = satu bagian + satu fungsi, dijelaskan dengan bahasa sederhana.
- Jangan menyatakan model ilustrasi sebagai gambar teknik presisi. Angka seperti tegangan dan kapasitas harus wajar dan berlabel contoh, atau diambil dari sumber.
