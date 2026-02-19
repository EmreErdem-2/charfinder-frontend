import { isAxiosError } from 'axios';
import {create} from 'zustand';

const useAuthStore = create((set, get) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,

    setAccessToken: (token) => {
        set({
            accessToken: token,
            isAuthenticated: !!token
        });
    },

    setUser: (userData) => {
        set({
            user: userData
        });
    },

    login: async (ElementInternals, password) => {
        set({isLoading:true});
        try {
            const response = await fetch('/api/auth/login',{ // api endpoint
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include' //sends cookies (for refresh token)
            });

            if (!response.ok) throw new ErrorĞ('Login failed');
            const data = await response.json();
            set({
                accessToken: data.accessToken,
                user: data.user || null,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (err) {
            set({
                isLoading: false
            });
            throw "login error: " + err;
        }
    },

    logout: async () => {
        try{
            await fetch('api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
        } catch (err) {
            throw "logout error: " + err;
        }

        set({
            accessToken: null,
            user: null,
            isAuthenticated: false
        });
    },

    refreshAccessToken: async () => {
        try {
            const response = await fetch('api/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            });
            
            if(!response.ok) throw new Error("Refresh failed!");
            const data = await response.json();
            set({
                accessToken: data.accessToken,
                user: data.user || null,
                isAuthenticated: true
            });

            return true;
        } catch (err) {
            set({
                accessToken: null,
                user: null,
                isAuthenticated: false
            });

            return false;
        }
    }
}));

export default useAuthStore;