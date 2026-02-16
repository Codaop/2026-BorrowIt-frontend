import type {
  UserRead,
  UserCreate,
  UserUpdate,
  UserChangePassword,
  UserUpdateRoles,
} from "../types/user";

export const userRead = async (): Promise<UserRead[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/Users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal terkoneksi ke tabel user.");
  }

  return await response.json();
};

export const userReadId = async (id: number): Promise<UserRead> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/Users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal terkoneksi ke tabel user.");
  }

  return await response.json();
};

export const userCreate = async (data: UserCreate): Promise<UserRead> => {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menambahkan user baru.");
  }

  return await response.json();
};

export const userUpdate = async (
  data: UserUpdate,
  id: number,
): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/Users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menyimpan perubahan.");
  }
};

export const userDelete = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/Users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal menghapus user.");
  }
};

export const userChangePassword = async (data: UserChangePassword, id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/Users/${id}/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal mengganti password user.");
  }
};

export const userUpdateRoles = async (data: UserUpdateRoles, id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/Users/${id}/update-roles`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Gagal memperbarui role user.");
  }
};