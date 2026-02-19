// src/providers/QueryProvider.jsx
import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache
} from '@tanstack/react-query';
import useAuthStore from '../stores/authStore';

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 5 * 60 * 1000, // 5 minutes
        }
      },
      queryCache: new QueryCache({
        onError: async (error, query) => {
          // Check if it's a 401 from our API
          if (error?.response?.status === 401 || error?.status === 401) {
            const success = await useAuthStore.getState().refreshAccessToken();

            if (success) {
              // Re-try all failed queries automatically
              queryClient.invalidateQueries();
            } else {
              // Refresh failed → user must login again
              useAuthStore.getState().logout();
              // You can also redirect here: window.location.href = '/login'
            }
          }
        }
      })
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}