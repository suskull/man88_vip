import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

/**
 * Hook to fetch paginated bet history
 * @param gameId - Game mode ID (60, 180, 300)
 * @param page - Page number (1-based)
 */
export const useHistoryList = (gameId: number, page: number = 1) => {
  return useQuery({
    queryKey: ['historyList', gameId, page],
    queryFn: () => mockApi.getHistoryList(gameId, page),
    staleTime: 30 * 1000, // 30 seconds
  });
};

