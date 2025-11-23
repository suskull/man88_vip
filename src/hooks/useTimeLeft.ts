import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

export const useTimeLeft = (gameId: number) => {
  return useQuery({
    queryKey: ['timeLeft', gameId],
    queryFn: () => mockApi.getTimeLeft(gameId),
    refetchInterval: 1000, // Refetch every second for countdown
  });
};
