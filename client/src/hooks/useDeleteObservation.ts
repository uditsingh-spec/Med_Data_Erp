import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface DeleteObservationData {
  babyId: string;
  observationId: string;
}

export const useDeleteObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DeleteObservationData) => {
      const response = await api.delete(`/observations/${data.observationId}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId, 'observations'] });
    },
  });
};
