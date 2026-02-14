interface RiwayatBase {
    namaPeminjam: string;
    email: string;
    tanggalPinjam: string;
    tanggalKembali: string;
    tujuanPinjam: string;
}

export interface RiwayatRead extends RiwayatBase {
    id: number;
    idRuangan: number;
    status: string | null;
    whenStatusChanged: string | null;
}

export interface RiwayatCreateToken extends RiwayatBase {
    id: number;
    idRuangan: number;
    status: string | null;
    whenStatusChanged: string | null;
    trackingToken: string;
}

export interface RiwayatCreate extends RiwayatBase {
    idRuangan: number;
}

export interface RiwayatStatus {
    status: string | null;
}

export interface RiwayatUpdate {
    namaPeminjam: string | null;
    email: string | null;
    tanggalPinjam: string | null;
    tanggalKembali: string | null;
    tujuanPinjam: string | null;
}