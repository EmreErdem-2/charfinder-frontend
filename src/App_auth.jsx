// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { logoutRequest } from "./auth/authApi";
import { setAccessTokenModule } from "./auth/tokenModule";

function Dashboard() {
  const { user, clearAuth } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={async () => { await logoutRequest(); setAccessTokenModule(null); clearAuth(); window.location.href = "/login"; }}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onSuccess={() => (window.location.href = "/")} />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/forbidden" element={<div>Forbidden</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}