// src/auth/api.js
import { getAccessTokenModule, setAccessTokenModule } from "./tokenModule";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

let refreshingPromise = null;
const waiters = [];

function enqueueWaiter() {
  return new Promise((resolve, reject) => waiters.push({ resolve, reject }));
}

function flushWaiters(err, newToken = null) {
  while (waiters.length) {
    const w = waiters.shift();
    if (err) w.reject(err);
    else w.resolve(newToken);
  }
}

// call refresh endpoint which relies on HttpOnly cookie
async function refreshAccessToken() {
  if (refreshingPromise) return refreshingPromise;
  refreshingPromise = (async () => {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include", // send HttpOnly refresh cookie
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    if (!res.ok) throw new Error("Refresh failed");
    const data = await res.json(); // expect { accessToken }
    if (!data.accessToken) throw new Error("No access token from refresh");
    // set module-level token so api.js and non-React code can use it
    setAccessTokenModule(data.accessToken);
    return data.accessToken;
  })();

  try {
    const token = await refreshingPromise;
    refreshingPromise = null;
    flushWaiters(null, token);
    return token;
  } catch (err) {
    refreshingPromise = null;
    flushWaiters(err, null);
    throw err;
  }
}

// main fetch wrapper
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const opts = { method: "GET", ...options };
  const headers = new Headers(opts.headers || {});
  if (!opts.body || typeof opts.body === "string") {
    if (!headers.has("Content-Type") && !(opts.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
  }

  let token = getAccessTokenModule();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res = await fetch(url, { ...opts, headers, credentials: opts.credentials || "include" });

  if (res.status === 401) {
    try {
      // if refresh in progress, wait; otherwise refresh
      const newToken = refreshingPromise ? await enqueueWaiter() : await refreshAccessToken();
      // retry once with new token
      const retryHeaders = new Headers(opts.headers || {});
      retryHeaders.set("Authorization", `Bearer ${newToken}`);
      if (!retryHeaders.has("Content-Type") && !(opts.body instanceof FormData)) {
        retryHeaders.set("Content-Type", "application/json");
      }
      res = await fetch(url, { ...opts, headers: retryHeaders, credentials: opts.credentials || "include" });
    } catch (err) {
      // refresh failed; propagate original 401 semantics as an error
      throw err;
    }
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const msg = body?.message || res.statusText;
    const err = new Error(msg);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}