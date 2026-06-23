import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface UpdateBabyData {
  babyId: string;
  motherName?: string;
  motherAge?: number;
  dob?: string;
  weight?: number;
  gender?: 'Male' | 'Female';
  gestationalAge?: string;
  termStatus?: 'Term' | 'Preterm';
}

export const useUpdateBaby = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateBabyData) => {
      const { babyId, ...updatePayload } = data;
      const response = await api.put(`/babies/${babyId}`, updatePayload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['babies'] });
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId] });
      // Invalidate stats just in case
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};
