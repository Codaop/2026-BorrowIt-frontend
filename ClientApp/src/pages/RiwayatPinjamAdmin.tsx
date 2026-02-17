import { useEffect, useState } from "react";
import type { RiwayatRead, RiwayatCreate, RiwayatUpdate } from "../types/riwayat";
import type { RuanganRead } from "../types/ruangan";
import { riwayatRead, riwayatCreate, riwayatUpdate, riwayatDelete, riwayatStatus } from "../services/riwayatService";
import { ruanganRead } from "../services/ruanganService";

export default function RiwayatPage() {
  const [riwayats, setRiwayats] = useState<RiwayatRead[]>([]);
  const [ruangans, setRuangans] = useState<RuanganRead[]>([]);
  const [loading, setLoading] = useState(true);

  // Status options
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter riwayat peminjaman
  const filteredRiwayat = riwayats.filter((r) => {
    const roomName = ruangans.find(rm => rm.id === r.idRuangan)?.namaRuangan || "";
    return (
      r.namaPeminjam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tujuanPinjam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.status || "Pending").toLowerCase().includes(searchTerm.toLowerCase()) ||
      roomName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Auto refresh
  const fetchRiwayat = async () => {
    try {
      const data = await riwayatRead();
      setRiwayats(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Modal States
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);

  // Form States
  const [formData, setFormData] = useState<RiwayatCreate>({
    namaPeminjam: "", email: "", idRuangan: 0, tanggalPinjam: "", tanggalKembali: "", tujuanPinjam: ""
  });
  const [editData, setEditData] = useState<RiwayatUpdate & { id: number, trackingToken?: string }>({
    id: 0, namaPeminjam: "", email: "", tanggalPinjam: null, tanggalKembali: null, tujuanPinjam: ""
  });
  const [statusData, setStatusData] = useState<{
    id: number; status: string;
    whenStatusChanged?: string | null;
  }>({
    id: 0, status: "", whenStatusChanged: null,
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [dataRiwayat, dataRuangan] = await Promise.all([riwayatRead(), ruanganRead()]);
      setRiwayats(dataRiwayat);
      setRuangans(dataRuangan);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false); // Akan tetap jalan mau sukses maupun gagal
    }
  };

  const handleAdd = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await riwayatCreate(formData);
      setShowAdd(false);
      loadInitialData();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = async (e: React.SubmitEvent) => {

    const role = localStorage.getItem("role");
    e.preventDefault();

    const payload = {
      ...editData,
      tanggalPinjam: editData.tanggalPinjam
        ? editData.tanggalPinjam.replace(", ", "T")
        : null,
      tanggalKembali: editData.tanggalKembali
        ? editData.tanggalKembali.replace(", ", "T")
        : null,
    };

    const isAdmin = role === "Admin"
    await riwayatUpdate(
      payload, editData.id,
      isAdmin ? undefined : editData.trackingToken
    )
    setShowEdit(false);
    await fetchRiwayat();
  }

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await riwayatDelete(selectedId);
      setShowDelete(false);
      loadInitialData();
    } catch (err: any) { alert(err.message); }
  };

  const handleUpdateStatus = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!selectedId) return;
    try {
      await riwayatStatus(statusData, selectedId);
      setShowUpdateStatus(false);
      loadInitialData();
    } catch (err: any) { alert(err.message); }
  };

  if (loading) {
    return <div className="p-10 text-black dark:text-white text-center font-bold">Memuat Data...</div>
  }

  return (
    <div className="p-10 w-full min-h-screen">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-black font-black tracking-tight">Riwayat Peminjaman</h1>
          <div className="relative w-full md:w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍︎</span>
            <input
              type="text"
              placeholder="Cari peminjam, ruangan, atau status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-black bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition-all text-sm"
            />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white hover:text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">+ Ajukan Peminjaman</button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400">Peminjam</th>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400">Ruangan</th>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400">Tanggal Pinjam</th>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400">Tanggal Kembali</th>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400">Update Terakhir</th>
                <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRiwayat.length > 0 ? (
                filteredRiwayat.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-bold text-slate-800">{r.namaPeminjam}</div>
                      <div className="text-xs text-slate-400">{r.email}</div>
                    </td>
                    <td className="px-6 py-6 font-medium text-slate-600">
                      {ruangans.find(rm => rm.id === r.idRuangan)?.namaRuangan || "Memuat..."}
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-600">
                      {r.tanggalPinjam && !isNaN(Date.parse(r.tanggalPinjam))
                        ? new Date(r.tanggalPinjam).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        : "-"}
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-600">
                      {r.tanggalKembali && !isNaN(Date.parse(r.tanggalKembali))
                        ? new Date(r.tanggalKembali).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        : "-"}
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${r.status === "Approved" ? "bg-emerald-100 text-emerald-600" :
                        r.status === "Rejected" ? "bg-rose-100 text-rose-600" : "bg-orange-100 text-orange-600"
                        }`}>
                        {r.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-400">
                      {r.whenStatusChanged || "-"}
                    </td>
                    <td className="px-6 py-6 text-right space-x-2">
                      <button
                        onClick={() => { setEditData({ ...r, id: r.id }); setShowEdit(true); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => { setSelectedId(r.id); setShowDelete(true); }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-sm font-bold"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => { setSelectedId(r.id); setShowUpdateStatus(true); }}
                        className="p-2 text-yellow-400 hover:bg-yellow-50 rounded-lg transition-colors text-sm font-bold"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-400 italic">Data tidak ditemukan...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-100">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-black mb-6">Ajukan Peminjaman</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required onChange={e => setFormData({ ...formData, namaPeminjam: e.target.value })} />
              <input type="email" placeholder="Email (PENS)" className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" required onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <select className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={e => setFormData({ ...formData, idRuangan: Number(e.target.value) })}>
                <option value="">Pilih Ruangan</option>
                {ruangans.map(rm => <option key={rm.id} value={rm.id}>{rm.namaRuangan}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" className="p-4 text-black bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={e => setFormData({ ...formData, tanggalPinjam: e.target.value })} />
                <input type="datetime-local" className="p-4 text-black bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={e => setFormData({ ...formData, tanggalKembali: e.target.value })} />
              </div>
              <textarea placeholder="Tujuan Peminjaman" className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={e => setFormData({ ...formData, tujuanPinjam: e.target.value })} />
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white hover:text-green-600 font-black rounded-2xl">Kirim Pengajuan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-100">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
            <h2 className="text-2xl text-black font-black mb-2">Edit Peminjaman</h2>
            <p className="text-slate-500 text-sm mb-6">Masukkan data baru dan token validasimu.</p>
            <form onSubmit={handleEdit} className="space-y-4">
              <input
                type="text"
                value={editData.namaPeminjam || ""}
                className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={e => setEditData({ ...editData, namaPeminjam: e.target.value })}
              />
              <input
                type="email"
                value={editData.email || ""}
                className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={e => setEditData({ ...editData, email: e.target.value })}
              />
              <input
                type="text"
                value={editData.tanggalPinjam || ""}
                placeholder="yyyy-MM-dd HH:mm:ss"
                className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={e =>
                  setEditData({
                    ...editData,
                    tanggalPinjam: e.target.value || null
                  })
                }
              />
              <input
                type="text"
                value={editData.tanggalKembali || ""}
                placeholder="yyyy-MM-dd HH:mm:ss"
                className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={e =>
                  setEditData({
                    ...editData,
                    tanggalKembali: e.target.value || null
                  })
                }
              />
              <textarea
                value={editData.tujuanPinjam || ""}
                className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={e => setEditData({ ...editData, tujuanPinjam: e.target.value })}
              />
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-slate-900 text-white hover:text-green-600 font-black rounded-2xl">Update Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-100">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
            <h2 className="text-2xl font-black mb-2 text-black">Hapus Peminjaman?</h2>
            <p className="text-slate-500 text-sm mb-6 font-bold">Kamu tidak bisa memulihkan tindakan ini.<br />Masukkan token untuk konfirmasi:</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleDelete} className="w-full py-4 bg-rose-600 font-black rounded-2xl shadow-lg text-white hover:text-red-600">Ya, Hapus Sekarang</button>
              <button onClick={() => setShowDelete(false)} className="w-full py-4 font-bold text-white hover:text-blue-600">Batal</button>
            </div>
          </div>
        </div>
      )}

      {showUpdateStatus && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-100">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
            <h2 className="text-2xl font-black mb-2 text-black">Simpan Status Peminjaman?</h2>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <select className="w-full text-black p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" onChange={e =>
                setStatusData({
                  ...statusData,
                  status: e.target.value
                })}>
                <option value="">Pilih Status</option>
                {statusOptions.map(st => <option key={st.value} value={st.value}>{st.label}</option>)}
              </select>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setShowUpdateStatus(false)} className="w-full py-4 font-bold text-white hover:text-blue-600">Batal</button>
                <button type="submit" className="w-full py-4 bg-rose-600 font-black rounded-2xl shadow-lg text-white hover:text-green-600">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}