# Gaya Video: ADRIY Flat Design 2.0

Gaya baku untuk video pendek explainer, infografik, dan tips sehari-hari, seperti seri "Sains Sehari-hari". Bentuknya sederhana khas flat design, tapi **kaya detail**: ada kedalaman 2.5D, gradasi lembut, bayangan bertingkat, dan banyak penanda informatif.

Contoh acuannya ada di `contoh-gaya/flat/`:
- `Ep1Air.tsx`: Flat 2.5D
- `Ep2Udara.tsx`: Flat + Motion Graphics
- `Ep3Listrik.tsx`: Flat + Cutaway

Pemilik kanal sudah menyetujuinya, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/flat/pustaka.tsx`.

**Jangan kembali ke flat polos.** Hindari bentuk dasar tanpa detail, objek yang semuanya berada di satu bidang, warna rata tanpa gradasi, dan susunan yang sama terus (judul, gambar, kartu putih, keterangan).

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- Ilustrasi dibuat dengan SVG prosedural di dalam React (tanpa gambar dari luar), teks dengan HTML dan CSS. Isometrik memakai `iso()` dan `KotakIso`.
- Semua gerak dihitung dari `useCurrentFrame()` atau `spring`, tanpa angka acak.
- Render gambar: `npx remotion still contoh-gaya/flat/index.ts ContohFlat out/x.png --frame=N`

## 2. Identitas tetap (sama di setiap episode)
- **Lencana seri**: pil navy `#0F172A` bertuliskan "SAINS SEHARI-HARI · EP xx" (atau nama seri lain), ditambah label kategori berwarna seperti "● INFOGRAFIK" atau "● TIPS RUMAH".
- **Font Poppins** (500/700/800). Judul ExtraBold dengan jarak huruf rapat.
- **Palet**:

| Peran | Warna |
|---|---|
| Biru | `#2563EB` |
| Navy | `#0F172A` |
| Hijau | `#16A34A` |
| Ungu | `#7C3AED` |
| Oranye | `#F97316` |
| Kuning | `#F59E0B` |
| Stabilo | `#FDE047` |
| Pink | `#DB2777` |
| Cyan | `#0891B2` |
| Abu teks | `#64748B` |

  Tiap warna dipakai dengan variasi terang dan gelapnya, misalnya biru `#93C5FD` → `#2563EB` → `#1D4ED8` → `#1E3A8A`.
- **Kartu**: putih semi-transparan dengan sudut bulat 20–32 dan bayangan ganda (bayangan lembut ditambah bayangan datar tipis di bawah).
- **Lencana atau pin bernomor**: lingkaran berwarna dengan angka putih.
- **Catatan sumber** kecil di bagian paling bawah.

## 3. Lima prinsip wajib
1. **Ilustrasi kaya detail**
   - Setiap benda punya sorot terang, bagian gelap, dan detail kecil, misalnya jendela menyala, asap cerobong, pagar, perahu, sawah, atau kilau air.
   - Pohon dibuat dari daun berlapis 3–4 nada warna.
   - Tekstur ringan (pola rumput atau garis sawah) dengan opasitas rendah.
2. **Kedalaman visual**
   - Bagi gambar menjadi lapisan **jauh** (pucat dan kebiruan, sebagai perspektif atmosfer), **tengah**, dan **depan** (gelap dan kontras).
   - Tambahkan kabut di antara lapisan dan bayangan lembut di bawah benda (memakai blur).
   - Untuk benda dan data, gunakan **isometrik 2.5D**: sisi atas paling terang, sisi kanan sedang, sisi depan paling gelap.
3. **Komposisi bervariasi** (pilih salah satu per episode, jangan berurutan sama):
   - Pemandangan penuh layar dengan judul menumpang di langit dan panel melengkung di bawah.
   - Angka raksasa sebagai pusat, objek isometrik, lalu diagram.
   - Judul rata kanan, kaca pembesar di pojok, cutaway di tengah, kartu grid, lalu meteran.
4. **Warna bercahaya**
   - Gradasi lembut pada langit, laut, bukit, dan latar.
   - Sumber cahaya bercahaya (radial glow).
   - Gumpalan warna kabur di belakang latar.
   - Huruf ekstrusi 3D (`TeksEkstrusi`) untuk kata atau angka utama.
5. **Detail informatif**
   - `PinLabel`: titik, garis putus-putus, dan kartu bernomor.
   - `PinNomor`: pin berdenyut di atas objek.
   - `KacaPembesar`: lingkaran zoom dengan bingkai, pantulan, gagang, dan label. Dipakai untuk molekul, komponen kecil, atau detail.
   - Diagram pendukung: siklus mini, bar perbandingan, meteran, dan grid kubus.
   - Potongan bagian dalam (cutaway) untuk rumah, alat, atau benda.

## 4. Tiga varian gaya
- **Flat 2.5D**: pemandangan berlapis dengan perspektif atmosfer. Cocok untuk proses alam, geografi, dan cerita.
- **Flat + Motion Graphics**: angka kinetik yang menghitung naik, kubus isometrik yang jatuh dan membal satu per satu, bar yang tumbuh, garis kecepatan. Cocok untuk data dan statistik.
- **Flat + Exploded/Cutaway**: benda atau ruangan isometrik yang dibuka, dengan pin bernomor dan kartu grid. Cocok untuk tips dan bedah benda.

## 5. Gerak (bila dijadikan video)
- **Objek**: muncul dengan pop membal (`usePop`), turun berurutan (stagger), dan keluar dengan memudar atau mengecil.
- **Kamera**: zoom pelan, pan, dan parallax antar-lapisan (jauh bergerak paling lambat).
- **Teks**: tipografi kinetik. Angka menghitung naik, stabilo tergores masuk, huruf ekstrusi naik.
- **Diagram**: terbentuk bertahap, misalnya panah tergambar, bar tumbuh, atau jarum meteran berayun.
- **Transisi**: masking atau bentuk (lingkaran membesar, sapuan bentuk).
- **Suara**: efek pendek sesuai gerakan (pop, whoosh, tick, ding) dari `public/sfx`.

## 6. Isi
- Satu pesan utama per adegan, dan judul berupa pertanyaan atau pernyataan yang memancing.
- Angka harus benar dan bersumber. Tulis "≈" atau "perkiraan" bila nilainya bervariasi. Tips umum diberi catatan "hasil berbeda tiap rumah".
