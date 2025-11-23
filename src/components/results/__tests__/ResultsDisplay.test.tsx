import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResultsDisplay } from '../ResultsDisplay';
import * as useResultsModule from '../../../hooks/useResults';

// Mock the useResults hook
vi.mock('../../../hooks/useResults');

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

const mockResults = {
  roundId: '20251119-0646',
  prizes: [
    { name: 'Giải ĐB', numbers: ['12345'] },
    { name: 'Giải Nhất', numbers: ['67890'] },
  ],
};

describe('ResultsDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render toggle button', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should toggle sidebar when button is clicked', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    const { container } = render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    const sidebar = container.querySelector('.ld-right') as HTMLElement;

    // Initially closed
    expect(sidebar.style.width).toBe('0px');

    // Click to open
    fireEvent.click(toggleButton);
    expect(sidebar.style.width).toBe('400px');

    // Click to close
    fireEvent.click(toggleButton);
    expect(sidebar.style.width).toBe('0px');
  });

  it('should display tab navigation when open', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Kết quả xổ số')).toBeInTheDocument();
    expect(screen.getByText('Thống kê')).toBeInTheDocument();
  });

  it('should switch between tabs', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    fireEvent.click(toggleButton);

    const resultsTab = screen.getByText('Kết quả xổ số');
    const statsTab = screen.getByText('Thống kê');

    // Initially on results tab
    expect(resultsTab).toHaveClass('active');

    // Switch to stats tab
    fireEvent.click(statsTab);
    expect(statsTab).toHaveClass('active');
    expect(resultsTab).not.toHaveClass('active');
    expect(screen.getByText('Thống kê chưa có dữ liệu')).toBeInTheDocument();
  });

  it('should display round selector when open', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    fireEvent.click(toggleButton);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should display result table when open', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('2 Số')).toBeInTheDocument();
    expect(screen.getByText('3 Số')).toBeInTheDocument();
  });

  it('should display game mode text', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    fireEvent.click(toggleButton);

    expect(screen.getByText('1 phút xổ 1 lần')).toBeInTheDocument();
  });

  it('should use correct CSS classes', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    const { container } = render(<ResultsDisplay />, { wrapper: createWrapper() });

    expect(container.querySelector('.ld-right')).toBeInTheDocument();
    expect(container.querySelector('.arrow-btn')).toBeInTheDocument();

    const toggleButton = screen.getByRole('link');
    fireEvent.click(toggleButton);

    expect(container.querySelector('.tab-right')).toBeInTheDocument();
    expect(container.querySelector('.tab-head')).toBeInTheDocument();
    expect(container.querySelector('.tab-content')).toBeInTheDocument();
  });

  it('should change arrow icon direction when toggled', () => {
    vi.spyOn(useResultsModule, 'useResults').mockReturnValue({
      data: mockResults,
      isLoading: false,
    } as any);

    const { container } = render(<ResultsDisplay />, { wrapper: createWrapper() });

    const toggleButton = screen.getByRole('link');
    
    // Initially closed - arrow points left
    let icon = container.querySelector('i');
    expect(icon).toHaveClass('fa-angle-double-left');

    // Click to open - arrow points right
    fireEvent.click(toggleButton);
    icon = container.querySelector('i');
    expect(icon).toHaveClass('fa-angle-double-right');
  });
});

