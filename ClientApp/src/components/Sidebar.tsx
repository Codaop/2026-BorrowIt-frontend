import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Riwayat Pinjam", path: "/dashboard/riwayat", icon: "🗐" },
    { name: "Kelola Ruangan", path: "/dashboard/ruangan", icon: "𓉞" },
    { name: "Daftar Users", path: "/dashboard/users", icon: "👥" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-8 flex flex-col sticky top-0">
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-xl font-black tracking-tighter text-white">BORROWIT<span className="text-blue-600">.</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all
              ${isActive 
                ? "bg-blue-600/10 text-blue-500 shadow-inner" 
                : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"}
            `}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-4 px-6 py-4 text-rose-500 font-bold hover:bg-rose-500/10 rounded-2xl transition-all group"
      >
        <span className="group-hover:translate-x-1 transition-transform">Logout →</span>
      </button>
    </aside>
  );
}