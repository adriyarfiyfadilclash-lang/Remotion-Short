# ADRIY Realistic 3D — Skill

Bangun visual 3D sinematik di Remotion dengan React Three Fiber. Gunakan enam modul yang sudah digabungkan di `src/modules`.

## Alur kerja
1. Pilih komposisi dan gaya visual.
2. Bentuk objek dengan modul `objects-materials`.
3. Tambahkan animasi dari modul `animation`.
4. Atur kamera dan cahaya dari `camera-lighting`.
5. Bangun latar serta atmosfer dari `environment-fx`.
6. Gunakan transisi dan tipografi bila dibutuhkan.
7. Periksa performa, konsistensi frame, material, bayangan, dan keterbacaan.

## Prinsip visual
- Utamakan satu subjek utama yang mudah dibaca.
- Material harus punya roughness/metalness yang sesuai.
- Gunakan pencahayaan key-fill-rim sebagai titik awal.
- Gerakan kamera harus punya tujuan, bukan bergerak tanpa alasan.
- Efek atmosfer memperkuat kedalaman dan skala.
- Hindari menumpuk partikel, glow, kabut, dan gerakan secara berlebihan.

## Batasan dan pemeriksaan
- Semua animasi harus deterministik berdasarkan frame Remotion.
- Jangan mengandalkan waktu sistem atau gerakan acak tanpa seed.
- Pastikan aset font dan tekstur tersedia secara lokal.
- Lakukan pemeriksaan TypeScript dan render uji sebelum produksi.
