// src/auth/authApi.js
import { setAccessTokenModule } from "./tokenModule";
import { decodeJwt } from "./AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

// login returns { accessToken } and server sets HttpOnly refresh cookie
export async function loginRequest(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // allow server to set HttpOnly cookie
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || res.statusText);
  }
  const data = await res.json();
  if (!data.accessToken) throw new Error("No access token returned");
  // set module token immediately
  setAccessTokenModule(data.accessToken);
  const decoded = decodeJwt(data.accessToken);
  return { accessToken: data.accessToken, decoded };
}

// logout asks server to revoke refresh token and clear cookie
export async function logoutRequest() {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).catch(() => {});
  // server should clear cookie; client clears memory state elsewhere
}