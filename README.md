# Undangan Nikah (React + Vite + Motion)

    npm install
    npm run dev

- Edit data (nama, tanggal, acara, rekening, ayat) di `src/config.js`.
- Aset ilustrasi ada di `public/images/` (castle, frame, garden, flora-left, corner, flora-bottom, couple-walk, couple-pose).
- Foto pasangan/galeri/cerita: ganti file `groom.svg`, `bride.svg`, `story1-3.svg`, `g1-6.svg`
  dengan foto asli (mis. `groom.jpg`) lalu ubah path-nya di `src/config.js`.
- Musik: taruh `public/music.mp3`.
- Link personal: `http://localhost:5173/?to=Budi+Santoso`
- Parallax ada di `src/components/Parallax.jsx` (ParallaxBg, Float) dan `Hero.jsx` (lapisan per kecepatan).

## Musik
Taruh file `.mp3` di folder `public/`, lalu ubah `music` di `src/config.js`.
Musik mulai saat tombol "Buka Undangan" ditekan. Tombol bulat di kanan bawah = putar/jeda.

## Auto-scroll
Di `src/App.jsx`: `SPEED` (kecepatan) dan `2500` (jeda awal, ms). Berhenti otomatis saat tamu menyentuh layar.

## Animasi pembuka otomatis
`Cover.jsx` (pintu terbelah) + `Hero.jsx` (kastil zoom-out, bunga masuk, teks, pasangan).
Atur kecepatan: `DOOR` di Cover.jsx, nilai `delay` di Hero.jsx, dan `2800` (ms) di `startOpening` pada App.jsx.
