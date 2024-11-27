import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (email: string, password: string) => {
    try {
      // Implement Firebase authentication
      set({ isLoading: true });
      // Add authentication logic here
      set({ isLoading: false, isAuthenticated: true });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      // Add logout logic here
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));