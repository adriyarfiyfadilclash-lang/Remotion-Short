# Gaya Video: ADRIY Realistic 3D

Gaya baku untuk video pendek tentang **material dan benda nyata**: logam, permata, kaca, es, air, dan produk. Tampilannya seperti **foto studio produk 3D**: bahan fisik (PBR), bayangan nyata, dan cahaya sinematik. Benda tidak boleh terlihat seperti mainan plastik.

Contoh acuannya ada di `contoh-gaya/realistic/Episode.tsx`, berisi seri "MATERIAL": Berlian, Emas, dan Es Batu. Pemilik kanal sudah menyetujuinya, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/realistic/pustaka.tsx`.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- `Kanvas` memakai `ThreeCanvas` dengan bayangan, tone mapping ACES, pantulan lingkungan `RoomEnvironment` melalui PMREM, dan kabut sewarna latar. Jangan pakai `@react-three/drei`.
- Render gambar: `npx remotion still contoh-gaya/realistic/index.ts ContohRealistic out/x.png --frame=N --timeout=120000`
- **Kamera di format 9:16:** sudut pandang horizontalnya sempit. Pakai fov sekitar 40 dengan jarak 10–12 unit, supaya benda (lebar 2–3,5 unit) tidak memenuhi layar dan konteksnya tetap terlihat. Gerak kamera: orbit pelan atau dolly maju kecil.

## 2. Bahan (PBR)
| Bahan | Pengaturan |
|---|---|
| Permata atau berlian | `meshPhysicalMaterial` dengan transmission 1, ior 2,42, dispersion 6–8, iridescence 0,6, clearcoat 1, envMapIntensity sekitar 3. Faset rata dari `LatheGeometry` non-indexed (16 segmen) |
| Emas | metalness 1, roughness sekitar 0,18, warna `#F2C14E`, clearcoat 0,4 |
| Logam lain | metalness 1, roughness 0,15–0,35 |
| Es | transparan 0,82, clearcoat, sedikit emissive biru, gelembung udara di dalamnya. Jangan pakai transmission di dalam benda transparan lain, karena hasilnya tidak terlihat |
| Air atau kaca tangki | transparan dengan opacity rendah dan `depthWrite` false. Kaca diberi garis tepi (`edgesGeometry`) |

Bentuk benda harus mengikuti aslinya, misalnya ingot trapesium, potongan brilian, atau kubus es membulat. Detail kecil seperti cap timbul "999.9" dibuat dengan `Teks3D`.

## 3. Studio dan atmosfer
- **Cahaya** (`Studio`): key light hangat dari kanan atas dengan bayangan 2048, fill lembut, dan **dua rim spotlight berwarna sesuai tema** (berlian biru-pink, emas jingga, es biru).
- **Lantai** (`Lantai`): gelap dan sedikit reflektif, dengan bayangan jatuh di atasnya.
- **Latar:** warna gelap sesuai tema, ditambah `CahayaLatar` (gradasi radial lembut, tidak boleh lingkaran bertepi tajam). Softbox terang bisa diletakkan di luar bingkai untuk pantulan faset.
- **Debu berkilau** (`Debu`) secukupnya.
- **Kilau bintang 2D** (berbentuk + yang berkedip) diproyeksikan ke faset permata.

## 4. Lapisan 2D
- **Kepala:** titik bercahaya warna aksen, tulisan "MATERIAL · 0X" (Anton, jarak huruf lebar), dan garis tipis.
- **Judul:** pertanyaan miring berwarna aksen, lalu judul Playfair 900 besar berwarna putih gading.
- **Spek:** titik dan cincin di benda (diproyeksikan dengan `keLayar`), garis tipis, lalu kartu kaca gelap bergaris aksen di kiri, berisi angka besar (Anton) dan keterangan singkat. Maksimal 3 kartu, disusun di kiri dan kanan supaya tidak menutupi benda.
- **Penutup:** garis gradien warna aksen, satu kalimat inti (serif), dan satu baris penjelasan.
- **Sumber** kecil di bawah, ditambah catatan "model 3D ilustrasi".

## 5. Warna aksen per tema
| Tema | Latar | Aksen |
|---|---|---|
| Berlian | `#08080A` dengan cahaya ungu | `#9CC3FF` |
| Emas | `#0B0906` | `#F2C14E` |
| Es | `#06101A` | `#7FD0FF` |

Topik baru memilih satu aksen yang sesuai bahannya.

## 6. Gerak (untuk video)
Benda berputar atau berayun pelan, kamera mengorbit atau dolly secara lambat, kilau berkedip, dan debu melayang. Kartu spek masuk berurutan setelah judul, lalu penutup muncul terakhir.

## 7. Fakta
Angka dari sumber tepercaya (GIA, Royal Society of Chemistry, USGS, dan sejenisnya), lengkap dengan satuannya. Tulis "±" untuk perkiraan.
