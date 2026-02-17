import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen min-w-screen w-full mx-auto flex flex-col bg-white text-slate-900 font-sans">

            <nav className="flex justify-between items-center px-6 py-5 md:px-12">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl"></div>
                    <h1 className="text-xl font-black tracking-tighter transition-all duration-300 hover:translate-x-6">BORROWIT.</h1>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                        Selamat Datang di <br />
                        <span className="text-blue-600">BorrowIt</span>
                    </h2>
                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                        Sistem peminjaman ruangan praktis untuk mendukung kegiatan akademikmu.
                        Silakan pilih metode akses untuk melanjutkan.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate("/peminjaman")}
                            className="w-full sm:w-48 bg-blue-600 text-black dark:text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                        >
                            Guest
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full sm:w-48 bg-blue-600 text-black dark:text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                        >
                            Login Akun
                        </button>
                    </div>
                </div>
            </main>

            <footer className="py-8 border-t border-slate-50 text-center">
                <p className="text-slate-400 text-sm font-medium">
                    &copy; 2026 BorrowIt.
                </p>
            </footer>
        </div>
    );
}