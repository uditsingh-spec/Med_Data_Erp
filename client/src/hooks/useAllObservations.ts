import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useAllObservations = () => {
  return useQuery({
    queryKey: ['observations'],
    queryFn: () => api.get('/observations').then((res) => res.data),
  });
};
