import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useDeleteBaby = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (babyId: string) => {
      const response = await api.delete(`/babies/${babyId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate babies list so the dashboard refreshes
      queryClient.invalidateQueries({ queryKey: ['babies'] });
    },
  });
};
