import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

export const useGameList = () => {
  return useQuery({
    queryKey: ['gameList'],
    queryFn: mockApi.getGameList,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
