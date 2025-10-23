// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // decoded claims if needed

  const saveAccessToken = useCallback((token, decoded = null) => {
    setAccessToken(token);
    setUser(decoded || null);
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, saveAccessToken, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

// tiny helper to decode JWT payload without verification
export function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}