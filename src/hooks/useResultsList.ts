import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

/**
 * Hook to fetch paginated results list
 * @param gameId - Game mode ID (60, 180, 300)
 * @param page - Page number (1-based)
 * @param type - Filter type (1=today, 2=yesterday, 3=7days, 4=month, or specific round ID)
 */
export const useResultsList = (gameId: number, page: number = 1, type: number | string = 1) => {
  return useQuery({
    queryKey: ['resultsList', gameId, page, type],
    queryFn: () => mockApi.getResultsList(gameId, page, type),
    staleTime: 30 * 1000, // 30 seconds
  });
};

