# Add-on Skill: Luxury Lighting & Effects

Tambahkan aturan ini ke `SKILL.md` utama.

## Lighting & Effects Library
Gunakan komponen dari `src/effects`:
- `LuxurySoftGlow`: cahaya latar lembut untuk memisahkan objek dari latar.
- `LuxuryLightRays`: berkas cahaya diagonal yang sangat tipis.
- `LuxuryMetallicSweep`: highlight bergerak sebagai aksen pada permukaan.
- `LuxuryAmbientShadow`: bayangan lembut untuk memberi bobot visual.
- `LuxuryDepthBlur`: blur terkontrol untuk lapisan yang tidak menjadi fokus.
- `LuxuryLensFlare`: flare kecil untuk momen highlight.

## Prinsip penggunaan
1. Efek mendukung objek utama; jangan sampai menjadi objek utama.
2. Gunakan satu sumber cahaya visual dominan dan aksen seperlunya.
3. Jaga glow, flare, dan rays tetap halus. Hindari tampilan gim atau sci-fi berlebihan.
4. Metallic sweep adalah highlight dekoratif 2D, bukan refleksi material fisik.
5. Depth blur CSS bukan depth of field berbasis lensa; gunakan hanya pada layer yang tepat.
6. Hindari menumpuk semua efek sekaligus.
7. Pastikan efek tidak menurunkan keterbacaan teks atau menutupi detail produk.
8. Periksa hasil pada frame awal, tengah, dan akhir serta pada ukuran layar ponsel.
