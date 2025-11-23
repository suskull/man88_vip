import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ManualInput } from '../ManualInput';
import type { GameCategory } from '../../../types/api';

const mockCategory2Digit: GameCategory = {
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

const mockCategory3Digit: GameCategory = {
  id: 2,
  name: 'Lô 3 số',
  type: 'baolo',
  guide: 'Test guide',
  rate: 980,
  pay_number: 1,
  min_amount: 1,
  max_amount: 1000,
  multi: 0,
  code: 'loto_3so',
  max: 1000,
  active: 1,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  max_number: 0
};

describe('ManualInput', () => {
  it('should render input field with correct placeholder for 2-digit game', () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory2Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    const input = screen.getByPlaceholderText(/Ví dụ: 12,34,56/i);
    expect(input).toBeInTheDocument();
  });

  it('should render input field with correct placeholder for 3-digit game', () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory3Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    const input = screen.getByPlaceholderText(/Ví dụ: 123,456,789/i);
    expect(input).toBeInTheDocument();
  });

  it('should display "Nhập số" label', () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory2Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    expect(screen.getByText('Nhập số')).toBeInTheDocument();
  });

  it('should display "Xác nhận" button', () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory2Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    expect(screen.getByText('Xác nhận')).toBeInTheDocument();
  });

  it('should display "hoặc chọn số bên dưới" text', () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory2Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    expect(screen.getByText(/hoặc/i)).toBeInTheDocument();
    expect(screen.getByText(/chọn số bên dưới/i)).toBeInTheDocument();
  });

  it('should parse comma-separated 2-digit numbers', async () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory2Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    const input = screen.getByPlaceholderText(/Ví dụ: 12,34,56/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '12,34,56' } });

    // Wait for debounce
    await waitFor(() => {
      expect(input.value).toContain('12');
    }, { timeout: 500 });

    const confirmButton = screen.getByText('Xác nhận');
    fireEvent.click(confirmButton);

    expect(mockOnNumbersConfirm).toHaveBeenCalledWith(['12', '34', '56']);
  });

  it('should parse space-separated 2-digit numbers', async () => {
    const mockOnNumbersConfirm = vi.fn();

    render(
      <ManualInput
        category={mockCategory2Digit}
        onNumbersConfirm={mockOnNumbersConfirm}
      />
    );

    const input = screen.getByPlaceholderText(/Ví dụ: 12,34,56/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '12 34 56' } });

    await waitFor(() => {
      expect(input.value).toContain('12');
    }, { timeout: 500 });

    const confirmButton = screen.getByText('Xác nhận');
    fireEvent.click(confirmButton);

    expect(mockOnNumbersConfirm).toHaveBeenCalledWith(['12', '34', '56']);
  });
});

