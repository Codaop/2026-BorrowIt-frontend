# 2026-BorrowIt-frontend

Aplikasi bagian frontend untuk **Sistem Peminjaman Ruangan Kampus** yang dikembangkan menggunakan **React** dan **TypeScript**. Proyek ini merupakan antarmuka utama dari tugas **Project-Based Learning (PBL) 2026** di Politeknik Elektronika Negeri Surabaya.

## Deskripsi Proyek

Repositori ini berisi kode sumber untuk *User Interface* (UI) dari sistem BorrowIt. Frontend ini dirancang untuk memberikan pengalaman pengguna yang intuitif bagi Admin dalam mengelola aset kampus dan bagi Guest (Mahasiswa/Staff) dalam mengajukan peminjaman secara mandiri dengan sistem pelacakan berbasis token.

## Fitur Utama

* **Dashboard Manajemen Ruangan**: Tampilan berbasis kartu (*Card-based UI*) untuk memantau kapasitas dan status ketersediaan ruangan secara visual.
* **Sistem Pelacakan (Tracking Token)**: Fitur bagi Guest untuk melakukan *Update* atau *Delete* peminjaman mereka sendiri menggunakan token unik tanpa perlu login.
* **Manajemen User & Role**: Tabel interaktif untuk pengelolaan akun Admin dan fitur **Ganti Password** yang aman.
* **Smart Filtering**: Sistem pencarian instan (*Client-side*) dan sinkronisasi filter *Server-side* untuk data riwayat yang besar.
* **Input Tanggal Adaptif**: Penanganan otomatis format ISO ke `datetime-local` untuk memastikan konsistensi data dengan database MySQL.
* **Responsive Layout**: Desain yang optimal untuk berbagai ukuran layar menggunakan sistem Sidebar dan Grid Tailwind.

## Tech Stack

* **Framework**: React 18 (Vite)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React / Heroicons
* **State Management**: React Hooks (`useState`, `useEffect`)
* **API Client**: Fetch API dengan arsitektur Service-Pattern

## Prasyarat Sistem (Prerequisites)

Pastikan sudah terpasang:

* **Node.js** (versi 18.0 atau terbaru).
* **NPM** atau **Yarn** sebagai package manager.
* **Browser modern** (Chrome/Firefox) dengan fitur Developer Tools aktif.

## Dependensi Utama (Dependencies)

Berikut adalah daftar pustaka utama yang menunjang frontend ini:

| Library | Kegunaan |
| --- | --- |
| **Vite** | Build tool generasi terbaru untuk pengalaman pengembangan yang sangat cepat. |
| **Tailwind CSS** | Framework CSS utility-first untuk desain UI yang konsisten dan modern. |
| **TypeScript** | Memberikan keamanan tipe (*Type Safety*) untuk mencegah error saat *runtime*. |
| **React Router** | Navigasi antar halaman (Dashboard, Ruangan, User, Riwayat). |

## Instalasi

1. **Clone Repositori**:
    ```bash
    git clone https://github.com/Codaop/2026-BorrowIt-frontend.git
    cd 2026-BorrowIt-frontend

    ```

2. **Install Dependencies**:
    ```bash
    npm install

    ```

3. **Konfigurasi Environment**:
    Buat file `.env` di root folder dan arahkan ke alamat backend Anda:
    ```ini
    VITE_API_URL="http://localhost:5123/api"

    ```


4. **Menjalankan Aplikasi**:
    ```bash
    npm run dev

    ```

## Catatan Teknis (Development Notes)

Dalam pengembangannya, terdapat beberapa solusi khusus untuk menangani integrasi dengan ASP.NET Core:

* **Date Formatting**: Untuk menampilkan data di `type="datetime-local"`, string dari database dipotong menggunakan `.slice(0, 16)` agar sesuai dengan standar ISO browser.
* **Form Submission**: Seluruh handler form menggunakan `e.preventDefault()` untuk mencegah *default refresh* yang dapat menyebabkan interupsi pada proses *fetch* data.
* **Null Handling**: Mengirimkan nilai `null` (bukan string kosong `""`) pada field tanggal opsional untuk menghindari error validasi 400 Bad Request di backend.

## Integrasi Repositori

Proyek ini terhubung secara penuh dengan repositori **2026-BorrowIt-backend**. Pastikan backend sudah berjalan sebelum melakukan operasi CRUD agar tidak terjadi error `Failed to fetch`.

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

## Penulis

**Muhammad Syauqy Arrayyan** - Mahasiswa S.Tr. Teknik Informatika, PENS 2024.