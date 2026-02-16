import type {
  RiwayatRead,
  RiwayatCreate,
  RiwayatCreateToken,
  RiwayatStatus,
  RiwayatUpdate,
} from "../types/riwayat";

export const riwayatRead = async (): Promise<RiwayatRead[]> => {
  const response = await fetch("/api/RiwayatPinjams", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Gagal mengambil informasi riwayat peminjaman.",
    );
  }

  return await response.json();
};

export const riwayatReadId = async (id: number): Promise<RiwayatRead> => {
  const response = await fetch(`/api/RiwayatPinjams/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Gagal mengambil informasi riwayat peminjaman.",
    );
  }

  return await response.json();
};

export const riwayatCreate = async (
  data: RiwayatCreate,
): Promise<RiwayatCreateToken> => {
  const response = await fetch("/api/RiwayatPinjams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal membuat pengajuan peminjaman.");
  }

  return await response.json();
};

export const riwayatUpdate = async (
  data: RiwayatUpdate,
  id: number,
  trackingToken?: string,
): Promise<void> => {
  const url = trackingToken
    ? `/api/RiwayatPinjams/${id}?token=${trackingToken}`
    : `/api/RiwayatPinjams/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Gagal menyimpan perubahan isi riwayat peminjaman.",
    );
  }
};

export const riwayatStatus = async (
  data: RiwayatStatus,
  id: number,
): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/RiwayatPinjams/${id}/status-update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal mengubah status riwayat peminjaman.");
  }
};

export const riwayatDelete = async (
  id: number,
  trackingToken?: string,
): Promise<void> => {
  const token = localStorage.getItem("token");
  const url = trackingToken
    ? `/api/RiwayatPinjams/${id}?token=${trackingToken}`
    : `/api/RiwayatPinjams/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menghapus riwayat peminjaman.");
  }
};
