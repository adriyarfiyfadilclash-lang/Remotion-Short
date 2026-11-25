# Gaya Video: ADRIY Documentary Motion

Gaya baku untuk video pendek dokumenter sinematik: peristiwa sejarah, bencana alam bersejarah, penjelajahan, tokoh, dan momen penting. Gambarnya berupa **satu foto arsip asli berstatus domain publik yang memenuhi layar**, bergerak lambat seperti adegan film dokumenter.

Contoh acuannya ada di `contoh-gaya/dokumenter/Episode.tsx`, berisi tiga adegan: Krakatau 1883, Borobudur 1874, dan Apollo 11. Pemilik kanal sudah menyetujuinya, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/dokumenter/pustaka.tsx`.

**Beda dengan Mixed Media:**
- **Mixed Media:** kolase arsip di atas kertas, dengan selotip dan cap.
- **Documentary Motion:** foto layar penuh, sinematik, tanpa kolase.

Pilih Documentary Motion bila ceritanya berpusat pada satu momen atau peristiwa dan arsip fotonya kuat.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- Render gambar: `npx remotion still contoh-gaya/dokumenter/index.ts ContohDokumenter out/x.png --frame=N`
- Font lokal: Playfair Display (judul serif 900, kutipan miring), Anton (label bab), Poppins (subtitle, lower third, kredit), DejaVu Sans Mono (cap tanggal, timecode).

## 2. Arsip (WAJIB asli dan legal)
- Foto atau litograf berstatus domain publik dari Wikimedia Commons, misalnya:
  - KITLV untuk Hindia Belanda
  - NASA
  - Library of Congress dan NARA
  - Laporan ilmiah lama
- Unduh dengan User-Agent deskriptif dan jeda antar-permintaan (Commons sering membalas 429). Simpan di `public/arsip/`, lalu catat di `public/arsip/SUMBER.md`.
- Ilustrasi atau litograf **diberi label** sebagai litograf, bukan foto. Rekonstruksi tidak boleh disajikan sebagai arsip asli.
- Pilih potongan gambar yang memperlihatkan inti foto. Contohnya, gunung dan pulaunya harus terlihat, dan helm dengan pantulannya tidak boleh tertutup teks.

## 3. Gerak kamera dan efek (`KenBurns`, `EfekFilm`, `Bingkai`)
- **Ken Burns:** zoom atau geser lambat sepanjang adegan (skala sekitar 1,0 → 1,07, atau geser ±120 px), ditambah gate weave halus. Selalu lambat dan beralasan naratif.
- **Color grade** sesuai era:
  - Abad ke-19: sepia 0,2–0,55
  - Foto modern: saturasi turun, sedikit dingin
- **Efek film:**
  - Grain bergerak (overlay)
  - Vignette
  - Light leak yang warnanya mengikuti suasana (jingga untuk letusan, emas pucat untuk candi, biru dingin untuk luar angkasa)
  - Kedip cahaya, serta debu dan goresan sesekali
- **Gradien gelap** di atas dan bawah supaya teks terbaca.
- **Bingkai:** bilah hitam tipis atas-bawah, kode "ARSIP · BAB 0X" di kiri atas, dan timecode berjalan di kanan atas.
- Untuk adegan dua foto, foto kedua masuk dengan **wipe** (`FotoReveal`) dan diberi bingkai emas tipis.

## 4. Tipografi editorial
- **Judul bab** (`JudulBab`): label "BAB 0X · LOKASI" Anton emas berjarak lebar dengan garis emas memanjang, lalu judul Playfair 900 krem (ukuran 92) dan subjudul miring.
- **Cap tanggal** (`CapTanggal`): tanggal monospace bergaya mesin ketik (huruf muncul satu per satu dengan kursor), lalu lokasi kapital emas di kotak gelap.
- **Lower third** (`LowerThird`): garis merah `#B23A2E`, nama tebal, dan keterangan.
- **Subtitle** (`Subtitle`): kalimat narasi di bagian bawah, kotak gelap transparan, teks putih tebal.
- **Angka besar** (`AngkaBesar`): Anton ukuran 150, satuan berwarna emas, dan keterangan miring.
- **Kutipan** (`Kutipan`): tanda kutip emas besar, kalimat miring, dan nama pembicara.
- **Kredit sumber** (`Kredit`): selalu ada di kanan bawah.

**Palet:** hitam `#0B0A09`, krem `#EDE4D3`, emas `#C9A55C`, dan merah aksen `#B23A2E`.

## 5. Komposisi
- Satu foto utama per adegan. Teks diletakkan di area gelap (atas atau bawah) dan tidak menutupi inti foto.
- Paling banyak 4 elemen teks per adegan: judul atau kutipan, cap tanggal, satu fakta (angka atau lower third), dan subtitle.
- Variasikan susunan tiap adegan: judul di atas dengan angka di bawah, foto di separuh atas dengan foto kedua di bawah, atau cap tanggal di atas dengan kutipan di bawah.

## 6. Gerak (untuk video)
- Teks masuk dengan ease-out lembut dan bertahap: label bab, judul, cap tanggal, fakta, lalu subtitle.
- Pergantian adegan memakai crossfade, dip-to-black, atau film wipe (lihat pustaka di `.claude/skills/adriy-documentary-motion`).
- Audio: ambience, narasi, dan musik pelan. Efek tidak boleh memanipulasi makna fakta.

## 7. Fakta
- Verifikasi tanggal, lokasi, kutipan, dan atribusi. Kutipan terjemahan harus setia pada makna aslinya.
- Tulis "±" untuk angka perkiraan, dan sebutkan sumber datanya.
