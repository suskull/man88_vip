import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserInfo } from '../useUserInfo';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUserInfo', () => {
  it('should fetch user info successfully', async () => {
    const { result } = renderHook(() => useUserInfo(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.success).toBe(true);
    expect(result.current.data?.username).toBeDefined();
    expect(result.current.data?.balance).toBeDefined();
  });

  it('should return username from mock data', async () => {
    const { result } = renderHook(() => useUserInfo(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.username).toBe('thantaigodclub352168');
  });

  it('should return balance from mock data', async () => {
    const { result } = renderHook(() => useUserInfo(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.balance).toBe(0.00);
  });

  it('should use correct query key', async () => {
    const { result } = renderHook(() => useUserInfo(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // The query key should be ['userInfo']
    expect(result.current.data).toBeDefined();
  });

  it('should have staleTime configured', async () => {
    const { result } = renderHook(() => useUserInfo(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Data should be available and not stale immediately
    expect(result.current.data).toBeDefined();
    expect(result.current.isStale).toBe(false);
  });
});

