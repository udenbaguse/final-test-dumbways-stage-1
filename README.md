# Final Test DumbWays Stage 1

Aplikasi portofolio personal berbasis **Express.js** dan **Handlebars (HBS)** dengan tampilan modern menggunakan **Bootstrap 5**.

Project ini menampilkan profil, tech stack, pengalaman kerja, daftar project, serta form kontak dengan validasi di sisi client.

## Demo

- Repository: https://github.com/udenbaguse/final-test-dumbways-stage-1

## Fitur Utama

- Landing page portofolio dengan layout section-based.
- Rendering template server-side menggunakan Handlebars partials.
- Dark/Light theme toggle dengan penyimpanan preferensi di `localStorage`.
- Contact form dengan validasi input (required field + format email).
- Informasi project dan experience ditampilkan dalam UI responsif.
- Siap deploy ke Vercel melalui `api/index.js` dan `vercel.json`.

## Tech Stack

- Node.js
- Express.js
- Handlebars (`hbs`)
- Bootstrap 5 + Bootstrap Icons
- Devicon
- Vanilla JavaScript

## Struktur Project

```text
final-test-dumbways-stage-1/
├── api/
│   └── index.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   ├── js/
│   │   ├── utils/
│   │   │   └── alert.js
│   │   ├── contactForm.js
│   │   └── theme.js
│   └── projects/
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── navbar.hbs
│   ├── hero-section.hbs
│   ├── tech-stack.hbs
│   ├── work-experiences.hbs
│   ├── my-project.hbs
│   ├── contact-me.hbs
│   └── footer.hbs
├── app.js
├── package.json
└── vercel.json
```

## Cara Menjalankan Secara Lokal

1. Install dependency:

```bash
npm install
```

2. Jalankan development mode:

```bash
npm run dev
```

3. Atau jalankan mode production/local simple:

```bash
npm start
```

4. Buka browser:

```text
http://localhost:3000
```

## Scripts

- `npm start` -> Menjalankan server dengan Node.js.
- `npm run dev` -> Menjalankan server dengan Nodemon.
- `npm test` -> Placeholder (belum ada test otomatis).

## Routing

- `GET /` -> Render halaman utama portofolio (`views/layouts/main.hbs`).

## Catatan Implementasi

- Data profil saat ini masih hardcoded di `app.js`.
- Contact form hanya validasi di frontend (belum terhubung ke backend/email service).
- Static assets disajikan dari folder `public/`.

## Deployment (Vercel)

Project sudah memiliki konfigurasi deploy di `vercel.json`:

- Entrypoint serverless: `api/index.js`
- Include assets: `views/**` dan `public/**`
- Rewrite semua route ke `api/index.js`

## Author

Muhamad Syamsudin A.K.A Syam
