# ADRIY Mixed Media — Final Project

Paket integrasi akhir untuk enam pustaka Mixed Media ADRIY.PROJECT.

## Isi proyek
- `src/Animation` — 7 komponen animasi.
- `src/Transition` — 7 komponen transisi.
- `src/Typography` — 7 komponen tipografi.
- `src/Assets` — 7 komponen kolase/cutout/aset.
- `src/CameraLighting` — 7 komponen kamera dan pencahayaan.
- `src/Effects` — 7 komponen efek.
- `compositions/` — empat komposisi contoh.
- `src/Root.tsx` — pendaftaran komposisi Remotion.
- `src/index.ts` — ekspor terpadu seluruh komponen.

## Komposisi
| ID | Resolusi | FPS | Durasi |
|---|---:|---:|---:|
| `MixedMediaFinalShowcase` | 1920×1080 | 30 | 15 detik |
| `MixedMediaTransitionShowcase` | 1920×1080 | 30 | 3 detik |
| `MixedMediaTransitionVariants` | 1920×1080 | 30 | 3 detik |
| `MixedMediaTypographyShowcase` | 1920×1080 | 30 | 6 detik |

## Integrasi
1. Salin folder `src` ke proyek Remotion yang sudah ada, atau gunakan proyek ini sebagai dasar.
2. Pastikan `react` dan `remotion` memakai versi yang kompatibel pada proyek induk.
3. Atur `src/Root.tsx` sebagai root komposisi pada entry proyek.
4. Ganti sumber gambar contoh dengan aset lokal di `public/`.
5. Buka Remotion Studio, pilih komposisi, lalu periksa hasilnya.

## Catatan aset
Contoh final menggunakan bentuk grafis dan gradien agar dapat dibuka tanpa berkas foto eksternal. Komponen `StickerCutout`, `PhotoContactSheet`, `PolaroidFrame`, `FloatingMedia`, dan lainnya tetap membutuhkan sumber gambar saat digunakan.

## Batasan validasi
Struktur folder, jumlah komponen, ekspor, dan jalur impor relatif diperiksa secara statis. Belum menjalankan `npm install`, pemeriksaan TypeScript, Remotion Studio, atau render video. Sesuaikan dependensi dan uji di lingkungan proyek tujuan.
