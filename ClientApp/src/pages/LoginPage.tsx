import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    // Form States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login({ username, password });
            navigate("/dashboard/riwayat");
        } catch (err: any) {
            setError(err.message || "Email atau password salah.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen min-w-screen w-full flex items-center justify-center bg-slate-50 px-6">
            <div className="flex flex-col w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-xl"></div>
                        <h1 className="text-xl text-black font-black tracking-tighter transition-all duration-300 hover:translate-x-6">BORROWIT.</h1>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">Selamat Datang Kembali</h2>
                    <p className="font-bold text-slate-500 mt-2">Masuk</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-widest">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan Username"
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-black focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-widest">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan Password"
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-black focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-slate-900 text-white font-black hover:text-blue-600 rounded-2xl shadow-lg hover:bg-blue-600 disabled:bg-slate-300 transition-all active:scale-95 uppercase tracking-widest text-sm"
                        >
                            {loading ? "Mencoba Masuk..." : "Masuk Sekarang"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm font-bold text-white hover:text-blue-600"
                        >
                            ← Kembali ke Beranda
                        </button>
                    </div>
                </div>

                <p className="text-center mt-10 text-slate-400 text-sm font-medium">
                    Belum memiliki akun? Hubungi Admin.
                </p>
            </div>
        </div>
    );
}