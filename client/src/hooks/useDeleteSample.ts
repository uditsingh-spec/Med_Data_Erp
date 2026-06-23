import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface DeleteSampleData {
  babyId: string;
  sampleId: string;
}

export const useDeleteSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DeleteSampleData) => {
      const response = await api.delete(`/samples/${data.sampleId}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId, 'samples'] });
    },
  });
};
