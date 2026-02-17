import { useEffect, useState } from "react";
import { userRead, userCreate, userUpdate, userDelete, userChangePassword } from "../services/userService";
import type { UserRead, UserCreate, UserUpdate, UserChangePassword } from "../types/user";

export default function UserListPage() {
    const [users, setUsers] = useState<UserRead[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);

    // Form States
    const [formData, setFormData] = useState<UserCreate & { roles?: string }>({
        username: "",
        email: "",
        passwordHash: "",
        roles: "User"
    } as any);

    const [editData, setEditData] = useState<UserUpdate & { id: number; roles?: string }>({
        id: 0,
        username: "",
        email: "",
        roles: "User"
    } as any);

    const [passData, setPassData] = useState<UserChangePassword & { id: number; }>({
        id: 0,
        currentPassword: "",
        newPassword: ""
    } as any);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const loadData = () => {
        setLoading(true);
        userRead()
            .then(setUsers)
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAdd = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await userCreate(formData);
            setShowAdd(false);
            setFormData({ username: "", email: "", passwordHash: "", roles: "User" } as any);
            loadData();
        } catch (err: any) { alert(err.message); }
    };

    const handleEdit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await userUpdate(editData, editData.id);
            setShowEdit(false);
            loadData();
        } catch (err: any) { alert(err.message); }
    };

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await userDelete(selectedId);
            setShowDelete(false);
            loadData();
        } catch (err: any) { alert(err.message); }
    };

    const handleChangePassword = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await userChangePassword(passData, passData.id);
            setShowChangePass(false);
            setPassData({ id: 0, currentPassword: "", newPassword: "" } as any);
            alert("Password berhasil diperbarui.");
            loadData();
        } catch (err: any) {
            alert(err.message);
        }
    }

    if (loading) {
        return <div className="p-10 text-black dark:text-white text-center font-bold">Memuat Data...</div>
    }

    return (
        <div className="p-10 w-full">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black text-black">Daftar Users</h1>
                <button
                    onClick={() => setShowAdd(true)}
                    className="bg-blue-600 text-white hover:text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                >
                    + Tambah User
                </button>
            </div>

            <div className="bg-white border shadow-md rounded-4xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-200/20">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Username</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Email</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Role</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-300/30 transition-colors">
                                <td className="px-8 py-6 font-bold text-black">{u.username}</td>
                                <td className="px-8 py-6 text-black">{u.email}</td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-black uppercase">
                                        {u.roles}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right space-x-3">
                                    <button
                                        onClick={() => { setEditData({ ...u, id: u.id } as any); setShowEdit(true); }}
                                        className="text-white hover:text-blue-600 font-bold text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => { setSelectedId(u.id); setShowDelete(true); }}
                                        className="text-white hover:text-rose-600 font-bold text-sm"
                                    >
                                        Hapus
                                    </button>
                                    <button
                                        onClick={() => { setPassData({ id: u.id, currentPassword: "", newPassword: "" } as any); setShowChangePass(true); }}
                                        className="text-white hover:text-yellow-400 font-bold text-sm"
                                    >
                                        Change Password
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAdd && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-black mb-6">Tambah User Baru</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input type="text" placeholder="Username" className="w-full p-4 text-black focus:ring-2 focus:ring-blue-600 bg-slate-50 rounded-xl outline-none" required onChange={e => setFormData({ ...formData, username: e.target.value })} />
                            <input type="email" placeholder="Email" className="w-full p-4 text-black focus:ring-2 focus:ring-blue-600 bg-slate-50 rounded-xl outline-none" required onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            <input type="password" placeholder="Password" className="w-full p-4 text-black focus:ring-2 focus:ring-blue-600 bg-slate-50 rounded-xl outline-none" required onChange={e => setFormData({ ...formData, passwordHash: e.target.value })} />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white hover:text-green-600 font-black rounded-2xl">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEdit && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-black mb-6">Edit User</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <input
                                type="text"
                                value={editData.username || ""}
                                className="w-full p-4 bg-slate-50 text-black focus:ring-2 focus:ring-blue-600 rounded-xl outline-none"
                                onChange={e => setEditData({ ...editData, username: e.target.value })}
                            />
                            <input
                                type="email"
                                value={editData.email || ""}
                                className="w-full p-4 bg-slate-50 text-black focus:ring-2 focus:ring-blue-600 rounded-xl outline-none"
                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                            />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white hover:text-green-600 font-black rounded-2xl">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl text-center">
                        <h2 className="text-xl font-black text-black mb-2">Hapus User?</h2>
                        <p className="text-slate-500 text-sm mb-6 font-bold">Aksi ini tidak dapat dibatalkan.</p>
                        <div className="flex flex-col gap-2">
                            <button onClick={handleDelete} className="w-full py-4 bg-rose-600 text-white hover:text-rose-600 font-black rounded-2xl">Hapus</button>
                            <button onClick={() => setShowDelete(false)} className="w-full py-4 font-bold text-white hover:text-blue-600">Batal</button>
                        </div>
                    </div>
                </div>
            )}

            {showChangePass && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-black mb-6">Ganti Password User</h2>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <input type="password" placeholder="Current Password" className="w-full p-4 text-black focus:ring-2 focus:ring-blue-600 bg-slate-50 rounded-xl outline-none" required onChange={e => setPassData({ ...passData, currentPassword: e.target.value })} />
                            <input type="password" placeholder="New Password" className="w-full p-4 text-black focus:ring-2 focus:ring-blue-600 bg-slate-50 rounded-xl outline-none" required onChange={e => setPassData({ ...passData, newPassword: e.target.value })} />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowChangePass(false)} className="bg-black flex-1 py-4 font-bold text-white hover:text-blue-600">Batal</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white hover:text-green-600 font-black rounded-2xl">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}