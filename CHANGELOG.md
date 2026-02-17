# Changelog

Semua perubahan penting pada proyek **BorrowIt-frontend** akan didokumentasikan di berkas ini. Format ini mengikuti standar [Keep a Changelog]() dan [Semantic Versioning]().

## [1.0.0] - 2026-02-18

### Added

* **Room Management UI**: Implementasi antarmuka berbasis kartu untuk memantau kapasitas dan status ketersediaan ruangan.
* **User Administration**: Tabel data pengguna yang dilengkapi dengan fitur **Change Password** dan manajemen Role.
* **Guest Borrowing Flow**: Formulir pengajuan peminjaman bagi pengguna umum lengkap dengan sistem **Tracking Token**.
* **Unified Search**: Fitur pencarian instan pada modul User dan Riwayat (mendukung pencarian berdasarkan nama, email, dan ruangan).
* **Interactive Modals**: Penggunaan modal kustom dengan `backdrop-blur` untuk alur kerja CRUD yang lebih bersih.
* **Responsive Layout**: Implementasi Sidebar navigasi dan Grid sistem yang adaptif untuk berbagai ukuran layar.

### Security

* **Input Masking**: Memastikan seluruh kolom sensitif seperti password dan token menggunakan `type="password"` untuk keamanan visual.