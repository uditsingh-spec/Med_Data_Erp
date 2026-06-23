import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useSamples = (id: string | undefined) => {
  return useQuery({
    queryKey: ['baby', id, 'samples'],
    queryFn: async () => {
      if (!id) throw new Error('Baby ID is required');
      const { data } = await api.get(`/babies/${id}/samples`);
      return data;
    },
    enabled: !!id,
  });
};
