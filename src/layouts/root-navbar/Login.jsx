import React, { useState } from "react";
import { useAuth, decodeJwt } from "../../auth/AuthContext";
import { loginRequest } from "../../auth/authApi";
import { setAccessTokenModule } from "../../auth/tokenModule";

export default function Login({ onSuccess }) {
  const { saveAccessToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { accessToken, decoded } = await loginRequest(email, password);
      // update both module-level token and React state
      setAccessTokenModule(accessToken);
      saveAccessToken(accessToken, decoded);
      onSuccess?.();
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {err && <div style={{ color: "crimson" }}>{err}</div>}
    </form>
  );
}