import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

export const useResults = (roundId: string) => {
  return useQuery({
    queryKey: ['results', roundId],
    queryFn: () => mockApi.getResults(roundId),
    enabled: !!roundId,
  });
};
