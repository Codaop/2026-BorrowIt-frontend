import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState("Sedang mencoba menghubungi Backend...")

  useEffect(() => {
    fetch('/api/RiwayatPinjams') 
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        return res.json()
      })
      .then(data => setStatus("Koneksi Sukses! " + JSON.stringify(data)))
      .catch(err => setStatus("Koneksi Gagal: " + err.message))
  }, [])

  return (
    <div className="flex flex-col justify-center text-center mx-auto">
      <h1>BorrowIt Project 🚀</h1>
      <div className="card px-5 mt-5">
        <p>Status Koneksi Backend:</p>
        <code style={{ color: status.includes('Sukses') ? 'lightgreen' : 'orange' }}>
          {status}
        </code>
      </div>
    </div>
  )
}

export default App
