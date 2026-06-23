import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useBaby = (id: string | undefined) => {
  return useQuery({
    queryKey: ['baby', id],
    queryFn: async () => {
      if (!id) throw new Error('Baby ID is required');
      const { data } = await api.get(`/babies/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
