import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/api/mockApi';

export const useSubmitBet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockApi.submitBet,
    onSuccess: () => {
      // Invalidate user info query to refresh balance
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
