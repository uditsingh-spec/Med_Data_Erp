import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export interface DashboardStats {
  totalBabies: number;
  totalSamplesToday: number;
  totalTwins: number;
  maleBabies: number;
  femaleBabies: number;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async (): Promise<DashboardStats> => {
      const { data } = await api.get('/dashboard/stats');
      return data;
    },
  });
};
