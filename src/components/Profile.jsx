// src/components/Profile.jsx
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../stores/authStore';
import { apiFetch } from '../lib/api';

export default function Profile() {
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await apiFetch('/api/users/me');
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    },
    enabled: isAuthenticated // don't run query if not logged in
  });

  if (!isAuthenticated) return <div>Please log in</div>;
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome, {data?.name || 'User'}</h1>
      <p>Email: {data?.email}</p>
    </div>
  );
}