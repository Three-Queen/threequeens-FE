# Three Queens Interior - Frontend App

Aplikasi Frontend untuk **Three Queens Interior**, dibangun menggunakan **React**, **TypeScript**, **Vite**, dan **Tailwind CSS**. Aplikasi ini menyediakan Landing Page premium, katalog produk interaktif, detail produk dengan visualisasi 3D, serta penampil gambar kerja 2D yang dilengkapi dengan pengamanan watermark dinamis dan fitur pan-and-zoom.

---

## 🛠️ Fitur Utama
1. **Landing Page Premium:** Beranda interaktif dengan visualisasi modern, sekilas tentang perusahaan, katalog pilihan, testimoni, dan formulir kontak langsung yang terintegrasi ke database backend.
2. **Katalog Produk (/produk):** Daftar produk lengkap dengan filter kategori dinamis, bilah pencarian real-time, tata letak grid responsif, dan animasi transisi.
3. **Visualisasi 3D Interaktif:** Mendukung rendering model 3D (`.glb` / `.gltf` / Sketchfab embed) menggunakan komponen `<model-viewer>` Google di halaman detail produk.
4. **Secure 2D Blueprint Viewer:** Halaman khusus penampil cetak biru 2D dengan fitur:
   - **Watermark Logo Terpusat:** Logo watermark yang membesar/mengecil mengikuti skala gambar secara proporsional.
   - **Interactive Pan & Zoom:** Zoom gambar menggunakan scroll mouse, cubit layar di HP, panel tombol, atau klik ganda untuk reset.
   - **Anti-Right-Click & Anti-Drag:** Layer proteksi transparan untuk mencegah pengunduhan langsung via klik kanan atau drag.
   - **Floating Navigation:** Tombol navigasi melayang (*glassmorphism style*) dan opsi tutup tab otomatis.

---

## 📋 Persyaratan Sistem
- **Node.js** >= 18.x
- **npm** >= 9.x atau **yarn**

---

## 🚀 Langkah Memulai / Setup

### 1. Masuk ke Folder Frontend
Buka terminal dan arahkan ke folder `FE`:
```bash
cd FE
```

### 2. Instal Dependensi
Instal modul node yang diperlukan untuk proyek:
```bash
npm install
```

### 3. Konfigurasi Environment (`.env`)
Buat file konfigurasi `.env` di root folder `FE` (sejajar dengan `package.json`):
```bash
cp .env.example .env   # Jika file .env.example ada, atau buat manual
```

Isi file `.env` dengan variabel berikut (sesuaikan dengan URL API backend Anda):
```env
VITE_API_URL=http://127.0.0.1:8000
```
> ℹ️ **Catatan:** `VITE_API_URL` digunakan untuk melakukan fetch data dari API Laravel Backend.

### 4. Jalankan Server Pengembangan
Jalankan aplikasi di mode lokal untuk pengembangan:
```bash
npm run dev
```
Secara default, aplikasi akan berjalan pada port **http://localhost:5173**. Buka alamat tersebut di browser Anda.

### 5. Linting & Pemeriksaan Kode
Pastikan kode Anda bebas dari kesalahan sintaksis atau ketidaksesuaian aturan ESLint:
```bash
npm run lint
```

### 6. Build Produksi
Kompilasi dan bangun aplikasi untuk siap di-deploy ke produksi:
```bash
npm run build
```
File hasil build akan tersimpan di dalam folder `dist/` dan siap disajikan di server hosting statis.

---

## 📂 Struktur Direktori Utama
```
FE/
├── src/
│   ├── assets/       ← Aset logo, gambar sekilas, dan ikon statis
│   ├── components/   ← Komponen UI (Navbar, Footer, Section Landing Page)
│   ├── constants/    ← Data statis fallback dan konfigurasi konstan
│   ├── context/      ← LandingDataContext untuk koneksi API ke Backend Laravel
│   ├── pages/        ← Halaman utama (LandingPage, ProductsPage, Detail, View2DPage)
│   ├── types/        ← Definisi tipe data TypeScript (Product, Project, dll)
│   ├── App.tsx       ← Konfigurasi rute halaman utama (React Router DOM)
│   └── main.tsx      ← Entrypoint aplikasi React
├── package.json      ← Dependensi & perintah script npm
└── vite.config.ts    ← Konfigurasi build & proxy endpoint server lokal (/storage)
```

---

## 🔒 Konfigurasi Proxy Lokal (Vite)
Untuk menghindari masalah pemblokiran CORS aset gambar lokal dari Laravel backend selama pengembangan, server Vite dikonfigurasi untuk mem-proxy request `/storage` ke backend server Laravel (`http://127.0.0.1:8000`). Konfigurasi ini tertera di file `vite.config.ts`.
