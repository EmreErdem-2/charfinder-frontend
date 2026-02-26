// src/auth/authApi.js
import {useAuthStore} from '../stores/authStore'

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
console.log("api_base: " + API_BASE);

export const apiFetch = async (url, options = {}) => {
  const token = useAuthStore.getState().accessToken;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if(token) headers.Authorization = `Bearer ${token}`;
  
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
    credentials: 'include'
  });
  
  return response;
}