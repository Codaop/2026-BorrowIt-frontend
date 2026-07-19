import type { LoginRequest, AuthResponse } from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const login = async (data: LoginRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result: AuthResponse = await response.json();
    localStorage.setItem("token", result.token);
  } else {
    const errorText = await response.text();
    throw new Error(errorText || "Proses login gagal.");
  }
};
