import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface UpdateObservationData {
  babyId: string;
  observationId: string;
  MBJ20?: 'F' | 'S' | null;
  JM103?: 'F' | 'S' | null;
  TSB?: number | null;
}

export const useUpdateObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateObservationData) => {
      const { babyId, observationId, ...updatePayload } = data;
      const response = await api.put(`/observations/${observationId}`, updatePayload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId, 'observations'] });
    },
  });
};
