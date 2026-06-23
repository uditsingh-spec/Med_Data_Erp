import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

interface AddSampleData {
  babyId: string;
  weight?: number;
  day?: number;
  shift?: 'M' | 'E';
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

export const useAddSample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddSampleData) => {
      const { babyId } = data;
      const payload = {
        weight: data.weight,
        day: data.day,
        shift: data.shift,
        tsb: data.tsb,
        jm103_s: data.jm103_s,
        mbj20_f: data.mbj20_f,
        mbj20_s: data.mbj20_s,
        f1_d4_f: data.f1_d4_f, f2_d4_f: data.f2_d4_f, f3_d4_f: data.f3_d4_f, f4_d4_f: data.f4_d4_f, f5_d4_f: data.f5_d4_f, f6_d4_f: data.f6_d4_f, f7_d4_f: data.f7_d4_f, f8_d4_f: data.f8_d4_f, f9_d4_f: data.f9_d4_f, f10_d4_f: data.f10_d4_f,
        f1_d4_s: data.f1_d4_s, f2_d4_s: data.f2_d4_s, f3_d4_s: data.f3_d4_s, f4_d4_s: data.f4_d4_s, f5_d4_s: data.f5_d4_s, f6_d4_s: data.f6_d4_s, f7_d4_s: data.f7_d4_s, f8_d4_s: data.f8_d4_s, f9_d4_s: data.f9_d4_s, f10_d4_s: data.f10_d4_s,
        f1_d6_f: data.f1_d6_f, f2_d6_f: data.f2_d6_f, f3_d6_f: data.f3_d6_f, f4_d6_f: data.f4_d6_f, f5_d6_f: data.f5_d6_f, f6_d6_f: data.f6_d6_f, f7_d6_f: data.f7_d6_f, f8_d6_f: data.f8_d6_f, f9_d6_f: data.f9_d6_f, f10_d6_f: data.f10_d6_f,
        f1_d6_s: data.f1_d6_s, f2_d6_s: data.f2_d6_s, f3_d6_s: data.f3_d6_s, f4_d6_s: data.f4_d6_s, f5_d6_s: data.f5_d6_s, f6_d6_s: data.f6_d6_s, f7_d6_s: data.f7_d6_s, f8_d6_s: data.f8_d6_s, f9_d6_s: data.f9_d6_s, f10_d6_s: data.f10_d6_s,
        remarks: data.remarks,
      };
      const response = await api.post(`/babies/${babyId}/samples`, payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['baby', variables.babyId, 'samples'] });
    },
  });
};
