import {useAuthStore} from '../stores/authStore'

const BASE_URL = 'http://localhost:8080'; // api endpoint url

export const apiFetch = async (url, options = {}) => {
  const token = useAuthStore.getState().accessToken;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if(token) headers.Authorization = `Bearer ${token}`;
  
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include'
  });
  
  return response;
}