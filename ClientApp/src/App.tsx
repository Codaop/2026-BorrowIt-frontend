import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState("Sedang mencoba menghubungi Backend...")

  useEffect(() => {
    // Memanggil API melalui proxy yang sudah kita set di vite.config.ts
    // Pastikan di Backend ada controller yang menangani path "/api/test" atau "/api/values"
    fetch('/api/RiwayatPinjams') 
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        return res.json()
      })
      .then(data => setStatus("Koneksi Sukses! Data: " + JSON.stringify(data)))
      .catch(err => setStatus("Koneksi Gagal: " + err.message))
  }, [])

  return (
    <div className="App">
      <h1>BorrowIt Project 🚀</h1>
      <div className="card">
        <p>Status Koneksi Backend:</p>
        <code style={{ color: status.includes('Sukses') ? 'lightgreen' : 'orange' }}>
          {status}
        </code>
      </div>
    </div>
  )
}

export default App
