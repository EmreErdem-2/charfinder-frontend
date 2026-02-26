import {create} from 'zustand';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

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
    signup: async (email, password) => {
        set({isLoading:true});
        try{
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email,password}),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Signup failed');
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
            throw "signup error: " + err;
        }
    },

    login: async (email, password) => {
        set({isLoading:true});
        try {
            const response = await fetch(`${API_BASE}/auth/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Login failed');
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
            await fetch(`${API_BASE}/auth/logout`, {
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
            const response = await fetch(`${API_BASE}/auth/refresh`, {
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