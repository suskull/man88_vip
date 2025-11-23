import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BettingSlip } from '../BettingSlip';
import type { GameCategory } from '../../../types/api';

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

const mockCategory: GameCategory = {
  id: 1,
  name: 'Lô 2 số',
  type: 'baolo',
  guide: 'Test guide',
  rate: 98,
  pay_number: 1,
  min_amount: 1,
  max_amount: 1000,
  multi: 0,
  code: 'loto_2so',
  max: 100,
  active: 1,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  max_number: 0
};

describe('BettingSlip', () => {
  it('should show message when no numbers selected', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={[]}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText(/Vui lòng chọn số để đánh đề/i)).toBeInTheDocument();
  });

  it('should display selected numbers', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={['12', '34', '56']}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
  });

  it('should display category name and rate', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={['12']}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText(/Lô 2 số @98/i)).toBeInTheDocument();
  });

  it('should call onRemoveNumber when clicking a number', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={['12', '34']}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    const numberElement = screen.getByText('12');
    fireEvent.click(numberElement);

    expect(mockOnRemoveNumber).toHaveBeenCalledWith('12');
  });

  it('should call onClear when clicking HỦY button', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={['12']}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    const clearButton = screen.getByText('HỦY');
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalled();
  });

  it('should calculate potential winnings correctly', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={['12']}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    // Default amount per number is 1, rate is 98
    // Potential winnings = 1 * 98 = 98
    expect(screen.getByText(/98/)).toBeInTheDocument();
  });

  it('should display input fields for amount per number and total amount', () => {
    const mockOnRemoveNumber = vi.fn();
    const mockOnClear = vi.fn();
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();

    render(
      <BettingSlip
        selectedNumbers={['12']}
        category={mockCategory}
        onRemoveNumber={mockOnRemoveNumber}
        onClear={mockOnClear}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText(/Số tiền 1 con/i)).toBeInTheDocument();
    expect(screen.getByText(/Tổng tiền/i)).toBeInTheDocument();
  });
});

