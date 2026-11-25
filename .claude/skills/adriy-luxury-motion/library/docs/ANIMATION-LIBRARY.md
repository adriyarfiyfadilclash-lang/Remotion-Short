# Add-on Skill: Luxury Animation Library

Tambahkan aturan berikut ke `SKILL.md` utama:

## Animation Library
Gunakan komponen dari `src/animations` sebagai blok gerak yang dapat digunakan ulang.

- `LuxuryReveal`: kemunculan elemen dengan opacity, translateY, dan scale.
- `LuxuryFloat`: gerakan mengambang kecil dan periodik.
- `LuxuryZoom`: zoom perlahan untuk memberi dorongan kamera.
- `LuxuryRotate`: rotasi terkendali pada sumbu Z.
- `LuxuryLightSweep`: sapuan highlight 2D untuk aksen.

### Aturan penggunaan
1. Pilih maksimal 1–2 gerakan utama untuk satu objek pada satu waktu.
2. Gunakan amplitude kecil; luxury motion tidak boleh terasa gelisah.
3. Hindari rotasi besar atau zoom cepat kecuali ada alasan naratif.
4. Pastikan elemen berhenti atau berulang secara mulus sesuai tujuan adegan.
5. Semua gerakan harus dihitung dari frame Remotion, bukan CSS keyframes atau timer browser.
6. Efek cahaya 2D tidak boleh disebut refleksi realistis 3D.
