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
