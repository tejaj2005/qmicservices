import { create } from 'zustand';
import api from '../services/api';

interface User {
    id: string;
    email: string;
    role: 'GOV_ADMIN' | 'COMPANY_USER' | 'PUBLIC_USER';
    companyName?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            // Backend returns flattened object { _id, email, role, token, ... }
            set({ user: data, token: data.token, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        set({ isLoading: true });
        try {
            // In a real app we would hit /auth/me. 
            // For now we persist if token exists, but ideally we'd validate.
            // console.log("Checking auth with token", token);
            const { data } = await api.get('/auth/me');
            set({ user: data, token: token, isLoading: false });
        } catch (error) {
            console.error("Auth check failed", error);
            localStorage.removeItem('token');
            set({ user: null, token: null, isLoading: false });
        }
    },
}));
