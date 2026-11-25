# Add-on Skill: Luxury Transition Library

Tambahkan bagian ini ke `SKILL.md` utama.

## Transition Library
Gunakan komponen dari `src/transitions`:
- `LuxuryCrossfade`: menyilangkan adegan lama dan baru.
- `LuxuryWipe`: reveal terarah dengan mask.
- `LuxuryIris`: reveal melingkar.
- `LuxuryBlurReveal`: mengurangi blur sambil menaikkan opacity.
- `LuxuryDipToDark`: jeda visual melalui gelap.

### Prinsip pemilihan
1. Pilih transisi berdasarkan hubungan antaradegan, bukan untuk menghias setiap potongan.
2. Utamakan crossfade atau wipe sederhana.
3. Gunakan iris hanya bila bentuk melingkar mendukung fokus visual.
4. Blur harus tipis; hindari tampilan tidak fokus terlalu lama.
5. Dip-to-dark cocok untuk jeda babak atau perubahan suasana.
6. Jangan menumpuk beberapa transisi pada satu perpindahan.
7. Pastikan tidak ada frame kosong, kedipan, atau tepi mask yang tidak disengaja.
