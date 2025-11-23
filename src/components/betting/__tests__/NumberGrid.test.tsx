import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberGrid } from '../NumberGrid';

describe('NumberGrid', () => {
  const mockOnNumberToggle = vi.fn();
  const mockOnColumnSelect = vi.fn();
  const mockOnRowSelect = vi.fn();

  it('renders 2-digit grid (00-99) for loto_2so', () => {
    render(
      <NumberGrid
        gameCode="loto_2so"
        selectedNumbers={[]}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    // Check that some numbers are rendered
    expect(screen.getByText('00')).toBeDefined();
    expect(screen.getByText('50')).toBeDefined();
    expect(screen.getByText('99')).toBeDefined();
  });

  it('renders 3-digit grid with range tabs for loto_3so', () => {
    render(
      <NumberGrid
        gameCode="loto_3so"
        selectedNumbers={[]}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    // Check that range tabs are rendered
    expect(screen.getByText('000-099')).toBeDefined();
    expect(screen.getByText('100-199')).toBeDefined();
    expect(screen.getByText('900-999')).toBeDefined();
  });

  it('calls onNumberToggle when a number is clicked', () => {
    render(
      <NumberGrid
        gameCode="loto_2so"
        selectedNumbers={[]}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    const checkbox = screen.getByDisplayValue('00') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockOnNumberToggle).toHaveBeenCalledWith('00');
  });

  it('shows selected numbers as checked', () => {
    render(
      <NumberGrid
        gameCode="loto_2so"
        selectedNumbers={['00', '15', '99']}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    const checkbox00 = screen.getByDisplayValue('00') as HTMLInputElement;
    const checkbox15 = screen.getByDisplayValue('15') as HTMLInputElement;
    const checkbox99 = screen.getByDisplayValue('99') as HTMLInputElement;
    const checkbox50 = screen.getByDisplayValue('50') as HTMLInputElement;

    expect(checkbox00.checked).toBe(true);
    expect(checkbox15.checked).toBe(true);
    expect(checkbox99.checked).toBe(true);
    expect(checkbox50.checked).toBe(false);
  });

  it('calls onColumnSelect when column selector is clicked', () => {
    render(
      <NumberGrid
        gameCode="loto_2so"
        selectedNumbers={[]}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    const columnSelectors = screen.getAllByRole('link');
    const firstColumnSelector = columnSelectors.find(link => 
      link.querySelector('.fa-chevron-down')
    );

    if (firstColumnSelector) {
      fireEvent.click(firstColumnSelector);
      expect(mockOnColumnSelect).toHaveBeenCalled();
    }
  });

  it('calls onRowSelect when row selector is clicked', () => {
    render(
      <NumberGrid
        gameCode="loto_2so"
        selectedNumbers={[]}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    const rowSelectors = screen.getAllByRole('link');
    const firstRowSelector = rowSelectors.find(link => 
      link.querySelector('.fa-chevron-right')
    );

    if (firstRowSelector) {
      fireEvent.click(firstRowSelector);
      expect(mockOnRowSelect).toHaveBeenCalled();
    }
  });

  it('renders single digit grid for dauduoi games', () => {
    render(
      <NumberGrid
        gameCode="dauduoi_dau"
        selectedNumbers={[]}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
      />
    );

    // Check that single digits 0-9 are rendered
    expect(screen.getByText('0')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('9')).toBeDefined();
  });

  it('prevents selection when max limit is reached', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <NumberGrid
        gameCode="loto_2so"
        selectedNumbers={['00', '01']}
        onNumberToggle={mockOnNumberToggle}
        onColumnSelect={mockOnColumnSelect}
        onRowSelect={mockOnRowSelect}
        maxSelectableNumbers={2}
      />
    );

    const checkbox = screen.getByDisplayValue('02') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(alertMock).toHaveBeenCalledWith('Bạn chỉ được chọn tối đa 2 số');
    
    alertMock.mockRestore();
  });
});

