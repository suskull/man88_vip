import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: mockApi.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
