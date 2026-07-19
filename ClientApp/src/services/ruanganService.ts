import type {
  RuanganRead,
  RuanganCreate,
  RuanganUpdate,
} from "../types/ruangan";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const ruanganRead = async (): Promise<RuanganRead[]> => {
  const response = await fetch(`${API_BASE_URL}/api/Ruangans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal terkoneksi ke tabel Ruangan.");
  }

  return await response.json();
};

export const ruanganReadId = async (id: number): Promise<RuanganRead> => {
  const response = await fetch(`${API_BASE_URL}/api/Ruangans/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal terkoneksi ke tabel Ruangan.");
  }

  return await response.json();
};

export const ruanganCreate = async (
  data: RuanganCreate,
): Promise<RuanganRead> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/Ruangans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menambahkan ruangan baru.");
  }

  return await response.json();
};

export const ruanganUpdate = async (
  data: RuanganUpdate,
  id: number,
): Promise<RuanganRead> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/Ruangans/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menyimpan perubahan ruangan.");
  }

  return await response.json();
};

export const ruanganDelete = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/Ruangans/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menghapus ruangan.");
  }
};
