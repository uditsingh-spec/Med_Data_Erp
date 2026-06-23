import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface UpdateSampleData {
  babyId: string;
  sampleId: string;
  weight?: number;
  jm103_s?: number;
  tsb?: number;
  mbj20_f?: number;
  mbj20_s?: number;
  f1_d4_f?: number; f2_d4_f?: number; f3_d4_f?: number; f4_d4_f?: number; f5_d4_f?: number; f6_d4_f?: number; f7_d4_f?: number; f8_d4_f?: number; f9_d4_f?: number; f10_d4_f?: number;
  f1_d4_s?: number; f2_d4_s?: number; f3_d4_s?: number; f4_d4_s?: number; f5_d4_s?: number; f6_d4_s?: number; f7_d4_s?: number; f8_d4_s?: number; f9_d4_s?: number; f10_d4_s?: number;
  f1_d6_f?: number; f2_d6_f?: number; f3_d6_f?: number; f4_d6_f?: number; f5_d6_f?: number; f6_d6_f?: number; f7_d6_f?: number; f8_d6_f?: number; f9_d6_f?: number; f10_d6_f?: number;
  f1_d6_s?: number; f2_d6_s?: number; f3_d6_s?: number; f4_d6_s?: number; f5_d6_s?: number; f6_d6_s?: number; f7_d6_s?: number; f8_d6_s?: number; f9_d6_s?: number; f10_d6_s?: number;
  remarks?: string;
}

export const useUpdateSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSampleData) => {
      const { sampleId } = data;
      const response = await api.put(`/samples/${sampleId}`, {
        weight: data.weight,
        tsb: data.tsb ?? null,
        jm103_s: data.jm103_s ?? null,
        mbj20_f: data.mbj20_f ?? null,
        mbj20_s: data.mbj20_s ?? null,
        f1_d4_f: data.f1_d4_f ?? null, f2_d4_f: data.f2_d4_f ?? null, f3_d4_f: data.f3_d4_f ?? null, f4_d4_f: data.f4_d4_f ?? null, f5_d4_f: data.f5_d4_f ?? null, f6_d4_f: data.f6_d4_f ?? null, f7_d4_f: data.f7_d4_f ?? null, f8_d4_f: data.f8_d4_f ?? null, f9_d4_f: data.f9_d4_f ?? null, f10_d4_f: data.f10_d4_f ?? null,
        f1_d4_s: data.f1_d4_s ?? null, f2_d4_s: data.f2_d4_s ?? null, f3_d4_s: data.f3_d4_s ?? null, f4_d4_s: data.f4_d4_s ?? null, f5_d4_s: data.f5_d4_s ?? null, f6_d4_s: data.f6_d4_s ?? null, f7_d4_s: data.f7_d4_s ?? null, f8_d4_s: data.f8_d4_s ?? null, f9_d4_s: data.f9_d4_s ?? null, f10_d4_s: data.f10_d4_s ?? null,
        f1_d6_f: data.f1_d6_f ?? null, f2_d6_f: data.f2_d6_f ?? null, f3_d6_f: data.f3_d6_f ?? null, f4_d6_f: data.f4_d6_f ?? null, f5_d6_f: data.f5_d6_f ?? null, f6_d6_f: data.f6_d6_f ?? null, f7_d6_f: data.f7_d6_f ?? null, f8_d6_f: data.f8_d6_f ?? null, f9_d6_f: data.f9_d6_f ?? null, f10_d6_f: data.f10_d6_f ?? null,
        f1_d6_s: data.f1_d6_s ?? null, f2_d6_s: data.f2_d6_s ?? null, f3_d6_s: data.f3_d6_s ?? null, f4_d6_s: data.f4_d6_s ?? null, f5_d6_s: data.f5_d6_s ?? null, f6_d6_s: data.f6_d6_s ?? null, f7_d6_s: data.f7_d6_s ?? null, f8_d6_s: data.f8_d6_s ?? null, f9_d6_s: data.f9_d6_s ?? null, f10_d6_s: data.f10_d6_s ?? null,
        remarks: data.remarks
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId, 'samples'] });
    },
  });
};
