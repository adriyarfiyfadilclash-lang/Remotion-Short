# ADRIY Indonesian Wayang — Final Project

Proyek Remotion terintegrasi untuk membuat video sejarah Nusantara dengan estetika pertunjukan wayang kulit: siluet hitam, detail ukiran, kelir, cahaya lampu minyak, bayangan, gunungan, dan ornamen bernuansa tradisional.

## Komposisi utama
- `WayangFinalShowcase` — video utama 1920×1080, 30 fps, 930 frame (31 detik).
- Enam komposisi pustaka untuk melihat animasi, transisi, tipografi, aset, kamera/pencahayaan, dan efek secara terpisah.

## Menjalankan
1. Ekstrak ZIP.
2. Jalankan `npm install`.
3. Jalankan `npm run start`.
4. Pilih `WayangFinalShowcase` di Remotion Studio.
5. Untuk merender: `npm run build`.

## Struktur
- `src/Animation` — rig, boneka, gerak, gestur, dan pose wayang.
- `src/Transition` — transisi gunungan, kelir, bayangan, lampu minyak, dan babak.
- `src/Typography` — judul, aksara dekoratif, nama kerajaan, prasasti, dan segel tanggal.
- `src/Assets` — gunungan, keraton, candi, kapal, senjata, panji, dan kampung.
- `src/CameraLighting` — cahaya lampu minyak, bayangan, sorot, fokus, dan kamera.
- `src/Effects` — asap, debu, api, partikel, kabut, dan tekstur.
- `showcases` — contoh mandiri dari enam pustaka.

## Catatan akurasi budaya
Aset merupakan ilustrasi generik bernuansa wayang dan sejarah Nusantara, bukan rekonstruksi arkeologis atau pakem tokoh/daerah tertentu. Tipografi menggunakan bentuk dekoratif umum, bukan reproduksi aksara historis tertentu. Untuk produksi sejarah faktual, sesuaikan kostum, senjata, arsitektur, aksara, dan kronologi dengan sumber sejarah yang tepercaya.

## Status pemeriksaan
Struktur dan berkas sumber disatukan dari enam pustaka. Instalasi dependensi, pemeriksaan TypeScript, pembukaan Remotion Studio, dan render video belum dijalankan di lingkungan ini.
