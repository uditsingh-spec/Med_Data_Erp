import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

export const useMe = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/users/me');
        login(data);
        return data;
      } catch (error) {
        logout();
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
