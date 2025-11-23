import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameModeSelector } from '../GameModeSelector';
import * as useGameListModule from '../../../hooks/useGameList';

// Mock the useGameList hook
vi.mock('../../../hooks/useGameList');

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

const mockGameListData = {
  success: true,
  rows: [
    { id: 60, name: '1 phút' },
    { id: 180, name: '3 phút' },
    { id: 300, name: '5 phút' },
  ],
  attrs: [],
};

describe('GameModeSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    const mockOnChange = vi.fn();
    render(<GameModeSelector selectedGameId={60} onGameModeChange={mockOnChange} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Đang tải...')).toBeInTheDocument();
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });

  it('should display all game modes when data is loaded', () => {
    vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
      data: mockGameListData,
      isLoading: false,
    } as any);

    const mockOnChange = vi.fn();
    render(<GameModeSelector selectedGameId={60} onGameModeChange={mockOnChange} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('1 phút')).toBeInTheDocument();
    expect(screen.getByText('3 phút')).toBeInTheDocument();
    expect(screen.getByText('5 phút')).toBeInTheDocument();
  });

  it('should select the correct game mode', () => {
    vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
      data: mockGameListData,
      isLoading: false,
    } as any);

    const mockOnChange = vi.fn();
    render(<GameModeSelector selectedGameId={180} onGameModeChange={mockOnChange} />, {
      wrapper: createWrapper(),
    });

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('180');
  });

  it('should call onGameModeChange when selection changes', () => {
    vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
      data: mockGameListData,
      isLoading: false,
    } as any);

    const mockOnChange = vi.fn();
    render(<GameModeSelector selectedGameId={60} onGameModeChange={mockOnChange} />, {
      wrapper: createWrapper(),
    });

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '180' } });

    expect(mockOnChange).toHaveBeenCalledWith(180);
  });

  it('should use correct CSS classes', () => {
    vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
      data: mockGameListData,
      isLoading: false,
    } as any);

    const mockOnChange = vi.fn();
    const { container } = render(
      <GameModeSelector selectedGameId={60} onGameModeChange={mockOnChange} />,
      { wrapper: createWrapper() }
    );

    expect(container.querySelector('.sphien')).toBeInTheDocument();
    expect(container.querySelector('.form-control')).toBeInTheDocument();
  });

  it('should render all options with correct values', () => {
    vi.spyOn(useGameListModule, 'useGameList').mockReturnValue({
      data: mockGameListData,
      isLoading: false,
    } as any);

    const mockOnChange = vi.fn();
    render(<GameModeSelector selectedGameId={60} onGameModeChange={mockOnChange} />, {
      wrapper: createWrapper(),
    });

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue('60');
    expect(options[1]).toHaveValue('180');
    expect(options[2]).toHaveValue('300');
  });
});

