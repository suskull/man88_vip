import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: mockApi.getUserInfo,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

