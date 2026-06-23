import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface AddObservationData {
  babyId: string;
  MBJ20?: 'F' | 'S';
  JM103?: 'F' | 'S';
  TSB?: number;
}

export const useAddObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddObservationData) => {
      const response = await api.post(`/babies/${data.babyId}/observations`, {
        MBJ20: data.MBJ20,
        JM103: data.JM103,
        TSB: data.TSB,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId, 'observations'] });
    },
  });
};
