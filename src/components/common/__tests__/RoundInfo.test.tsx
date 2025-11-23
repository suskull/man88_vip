import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RoundInfo } from '../RoundInfo';
import * as useTimeLeftModule from '../../../hooks/useTimeLeft';

// Mock the useTimeLeft hook
vi.mock('../../../hooks/useTimeLeft');

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

describe('RoundInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: undefined,
      isLoading: true,
      refetch: vi.fn(),
    } as any);

    render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    expect(screen.getByText('Lượt xổ tiếp theo')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  it('should display round ID when data is loaded', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: {
        success: true,
        roundId: '20251119-0646',
        timeLeft: 45,
      },
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    expect(screen.getByText('20251119-0646')).toBeInTheDocument();
  });

  it('should display formatted minutes and seconds', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: {
        success: true,
        roundId: '20251119-0646',
        timeLeft: 125, // 2 minutes 5 seconds
      },
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    const minuteElements = screen.getAllByText('02');
    expect(minuteElements.length).toBeGreaterThan(0);
    
    const secondElements = screen.getAllByText('05');
    expect(secondElements.length).toBeGreaterThan(0);
  });

  it('should display "Phút" and "Giây" labels', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: {
        success: true,
        roundId: '20251119-0646',
        timeLeft: 45,
      },
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    expect(screen.getByText('Phút')).toBeInTheDocument();
    expect(screen.getByText('Giây')).toBeInTheDocument();
  });

  it('should display colon separator', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: {
        success: true,
        roundId: '20251119-0646',
        timeLeft: 45,
      },
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    const colonElements = screen.getAllByText(':');
    expect(colonElements.length).toBeGreaterThan(0);
  });

  it('should format single digit numbers with leading zero', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: {
        success: true,
        roundId: '20251119-0646',
        timeLeft: 9, // 0 minutes 9 seconds
      },
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    const zeroElements = screen.getAllByText('00');
    expect(zeroElements.length).toBeGreaterThan(0);
    
    const nineElements = screen.getAllByText('09');
    expect(nineElements.length).toBeGreaterThan(0);
  });

  it('should use correct CSS classes', () => {
    vi.spyOn(useTimeLeftModule, 'useTimeLeft').mockReturnValue({
      data: {
        success: true,
        roundId: '20251119-0646',
        timeLeft: 45,
      },
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    const { container } = render(<RoundInfo gameId={60} />, { wrapper: createWrapper() });

    expect(container.querySelector('.phien-info')).toBeInTheDocument();
    expect(container.querySelector('.info')).toBeInTheDocument();
    expect(container.querySelector('.phien')).toBeInTheDocument();
    expect(container.querySelector('.minute')).toBeInTheDocument();
    expect(container.querySelector('.twodot')).toBeInTheDocument();
  });
});

