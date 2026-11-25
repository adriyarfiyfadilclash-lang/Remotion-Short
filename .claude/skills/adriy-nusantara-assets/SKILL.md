---
name: adriy-nusantara-assets
description: "Pustaka aset SVG sejarah Nusantara untuk Remotion (gunungan, keraton, candi, kapal layar, keris/tombak/pedang, panji kerajaan, perkampungan). Pakai bersama adriy-indonesian-wayang atau untuk video sejarah Indonesia."
---

# ADRIY Nusantara Historical Assets

> Isi panduan di bawah diambil dari `library/README.md`.

# ADRIY — Nusantara Historical Assets Library

Tahap 4 dari gaya Indonesian Traditional Wayang Motion.

## 7 komponen aset
1. `GununganAsset` — gunungan dekoratif.
2. `KeratonAsset` — kompleks istana/keraton.
3. `CandiAsset` — siluet bangunan candi.
4. `NusantaraShipAsset` — kapal layar untuk adegan pelayaran.
5. `TraditionalWeaponAsset` — pilihan `keris`, `spear`, atau `sword`.
6. `RoyalBannerAsset` — panji dengan lambang dekoratif `sun`, `flower`, atau `diamond`.
7. `HistoricalVillageAsset` — lingkungan perkampungan.

## Contoh penggunaan
```tsx
import { CandiAsset, TraditionalWeaponAsset } from "./src";

export const Scene = () => (
  <>
    <div style={{ width: 420, height: 460 }}>
      <CandiAsset scale={1} />
    </div>
    <div style={{ width: 160, height: 360 }}>
      <TraditionalWeaponAsset weapon="keris" />
    </div>
  </>
);
```

Semua aset berupa ilustrasi SVG prosedural dan menerima `x`, `y`, `scale`, `color`, `accentColor`, serta `opacity`. `TraditionalWeaponAsset` dan `RoyalBannerAsset` juga memiliki pilihan bentuk.

## Catatan akurasi
Aset merupakan bentuk ilustratif generik yang terinspirasi arsitektur dan benda tradisional Nusantara, bukan rekonstruksi arkeologis atau representasi satu kerajaan tertentu. Untuk dokumenter yang menyebut periode/kerajaan spesifik, siluet, ornamen, jenis kapal, senjata, dan arsitektur perlu dicocokkan dengan sumber sejarah dan referensi museum.

## Instalasi
Salin folder `src` dan `compositions` ke proyek Remotion induk. Pastikan `react` dan `remotion` tersedia.
```bash
npm run start
npm run render
```

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
