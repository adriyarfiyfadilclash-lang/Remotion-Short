# Peta Integrasi

| Tahap | Direktori | Fungsi dalam proyek |
|---|---|---|
| 1. Wayang Animation | `src/Animation` | Rig dan gerak tokoh wayang |
| 2. Wayang Transition | `src/Transition` | Pembuka/pergantian babak |
| 3. Historical Calligraphy | `src/Typography` | Judul dan teks sejarah |
| 4. Historical Assets | `src/Assets` | Lingkungan dan benda Nusantara |
| 5. Camera & Lighting | `src/CameraLighting` | Kelir, bayangan, cahaya, fokus |
| 6. Wayang Effects | `src/Effects` | Asap, debu, kabut, partikel |
| 7. Final Project | `src/WayangFinalShowcase.tsx` | Menyatukan seluruh tahap menjadi komposisi |

Komponen diimpor melalui `src/index.ts`. Komposisi utama terdaftar di `src/Root.tsx`; sumber `showcases/` dipertahankan sebagai contoh penggunaan per pustaka.
