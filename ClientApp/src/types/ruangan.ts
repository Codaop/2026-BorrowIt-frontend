export interface RuanganRead {
    id: number;
    namaRuangan: string;
    kapasitas: number;
    jenisRuangan: string | null;
    isTersedia: boolean;
}

export interface RuanganCreate {
    namaRuangan: string;
    kapasitas: number;
    jenisRuangan: string | null;
}

export interface RuanganUpdate {
    namaRuangan: string | null;
    kapasitas: number | null;
    jenisRuangan: string | null;
    isTersedia?: boolean;
}