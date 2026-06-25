import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    _id: '6a33a476b8d12dda4838b7fe',
    employeeId: 'ADMIN-0001',
    name: 'Super Admin',
    email: 'admin@hospital.com',
    role: 'admin'
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTMzYTQ3NmI4ZDEyZGRhNDgzOGI3ZmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODIyNDYxNDMsImV4cCI6MjA5NzgyMjE0M30.8Xh_ErxuJz96UB1udEvMGRIDyHhOPjCjkkUFf19PQBo',
  isLoading: false,

  login: async (token, user) => {
    set({ token, user });
  },

  logout: async () => {
    // Disabled for bypass
  },

  restoreSession: async () => {
    // Disabled for bypass
    set({ isLoading: false });
  }
}));
