import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import UserListPage from './pages/UserListPage'
import RuanganManagePage from './pages/RuanganManagePage'
import RiwayatAdminPage from './pages/RiwayatPinjamAdmin'
import RiwayatGuestPage from './pages/RiwayatPinjamGuest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/peminjaman" element={<RiwayatGuestPage />} />

        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <div className="flex bg-white min-h-screen min-w-screen">
              <Sidebar />
              <Routes>
                <Route path="users" element={<UserListPage />} />
                <Route path="ruangan" element={<RuanganManagePage />} />
                <Route path="riwayat" element={<RiwayatAdminPage />} />
              </Routes>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
