import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

interface BabyData {
  _id: string;
  displayId: string;
  motherName: string;
  motherImage?: string;
  gender: string;
  isTwin: boolean;
  twinLabel?: string;
  registeredAt: string;
  dob?: string;
  weight?: number;
  termStatus?: string;
  gestationalAge?: string;
}

interface BabiesResponse {
  data: BabyData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UseBabiesParams {
  page: number;
  search: string;
  gender: string;
  isTwin: string;
  sort: string;
  limit?: number;
}

export const useBabies = (params: UseBabiesParams) => {
  return useQuery({
    queryKey: ['babies', params],
    queryFn: async (): Promise<BabiesResponse> => {
      const { data } = await api.get('/babies', { params });
      return data;
    },
  });
};
