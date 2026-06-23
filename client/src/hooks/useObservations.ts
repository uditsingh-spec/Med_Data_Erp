import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useObservations = (babyId?: string) => {
  return useQuery({
    queryKey: ['baby', babyId, 'observations'],
    queryFn: async () => {
      if (!babyId) return [];
      const response = await api.get(`/babies/${babyId}/observations`);
      return response.data;
    },
    enabled: !!babyId,
  });
};
