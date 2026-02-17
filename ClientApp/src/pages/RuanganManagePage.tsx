import { useEffect, useState } from "react";
import { ruanganRead, ruanganCreate, ruanganUpdate, ruanganDelete } from "../services/ruanganService";
import type { RuanganRead, RuanganCreate, RuanganUpdate } from "../types/ruangan";

export default function RuanganManagePage() {
    const [ruangan, setRuangans] = useState<RuanganRead[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    // Form States
    const [formData, setFormData] = useState<RuanganCreate>({ namaRuangan: "", kapasitas: 0, jenisRuangan: "" });
    const [editData, setEditData] = useState<RuanganUpdate & { id: number }>({ id: 0, namaRuangan: "", kapasitas: 0, jenisRuangan: "", isTersedia: true });
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const loadData = () => {
        ruanganRead().then(setRuangans).catch(err => alert(err.message)).finally(() => setLoading(false));
    };

    useEffect(() => { loadData(); }, []);

    const handleAdd = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await ruanganCreate(formData);
            setShowAdd(false);
            setFormData({ namaRuangan: "", kapasitas: 0, jenisRuangan: "" });
            loadData();
        } catch (err: any) { alert(err.message); }
    };

    const handleEdit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await ruanganUpdate(editData, editData.id);
            setShowEdit(false);
            loadData();
        } catch (err: any) { alert(err.message); }
    };

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await ruanganDelete(selectedId);
            setShowDelete(false);
            loadData();
        } catch (err: any) { alert(err.message); }
    };

    if (loading) {
        return <div className="p-10 text-black dark:text-white text-center font-bold">Memuat Data...</div>
    }

    return (
        <div className="p-10 w-full min-h-screen">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black text-black">Kelola Ruangan</h1>
                <button onClick={() => setShowAdd(true)} className="bg-emerald-600 text-white hover:text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-900/20">
                    + Ruangan Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ruangan.map((r) => (
                    <div key={r.id} className="bg-slate-100 p-8 rounded-[2.5rem] flex justify-between items-center group shadow-md">
                        <div>
                            <h4 className="text-xl font-black text-black mb-1">{r.namaRuangan}</h4>
                            <p className="text-slate-500 text-sm font-medium">👤 {r.kapasitas} Orang | 🏛️ {r.jenisRuangan}</p>
                            <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase ${r.isTersedia ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {r.isTersedia ? "Tersedia" : "Penuh"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditData({ ...r, id: r.id }); setShowEdit(true); }} className="p-3 bg-slate-800 hover:bg-blue-600 text-white hover:text-blue-600 rounded-xl transition-all">Edit</button>
                            <button onClick={() => { setSelectedId(r.id); setShowDelete(true); }} className="p-3 bg-slate-800 hover:bg-rose-600 text-white hover:text-rose-600 rounded-xl transition-all">Hapus</button>
                        </div>
                    </div>
                ))}
            </div>

            {showAdd && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-black mb-6">Tambah Ruangan</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input type="text" placeholder="Nama Ruangan" className="w-full p-4 bg-slate-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-blue-500" required onChange={e => setFormData({ ...formData, namaRuangan: e.target.value })} />
                            <input type="number" placeholder="Kapasitas" className="w-full p-4 bg-slate-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-blue-500" required onChange={e => setFormData({ ...formData, kapasitas: Number(e.target.value) })} />
                            <input type="text" placeholder="Jenis (Lab/Kelas/Aula)" className="w-full p-4 bg-slate-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setFormData({ ...formData, jenisRuangan: e.target.value })} />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                                <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white hover:text-green-600 font-black rounded-2xl shadow-lg shadow-emerald-900/20">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEdit && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-black mb-6">Edit Ruangan</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <input type="text" value={editData.namaRuangan || ""} className="w-full p-4 bg-slate-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setEditData({ ...editData, namaRuangan: e.target.value })} />
                            <input type="number" value={editData.kapasitas || 0} className="w-full p-4 bg-slate-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setEditData({ ...editData, kapasitas: Number(e.target.value) })} />
                            <select className="w-full p-4 bg-slate-50 rounded-xl text-black outline-none focus:ring-2 focus:ring-blue-500" value={String(editData.isTersedia)} onChange={e => setEditData({ ...editData, isTersedia: e.target.value === "true" })}>
                                <option value="true">Tersedia</option>
                                <option value="false">Penuh /Maintenance</option>
                            </select>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white hover:text-green-600 font-black rounded-2xl">Simpan Perubahan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl text-center">
                        <h2 className="text-xl font-black text-black mb-2">Hapus Ruangan?</h2>
                        <p className="text-slate-500 text-sm mb-6 font-bold">Data tidak dapat dikembalikan.</p>
                        <div className="flex flex-col gap-2">
                            <button onClick={handleDelete} className="w-full py-4 bg-rose-600 text-white hover:text-rose-600 font-black rounded-2xl">Ya, Hapus</button>
                            <button onClick={() => setShowDelete(false)} className="w-full py-4 font-bold text-white hover:text-blue-600">Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}