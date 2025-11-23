import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoundSelector } from '../RoundSelector';

describe('RoundSelector', () => {
  it('should render dropdown with round IDs', () => {
    const mockOnChange = vi.fn();
    render(<RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should display selected round ID', () => {
    const mockOnChange = vi.fn();
    render(<RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('20251119-0646');
  });

  it('should generate 10 recent round IDs', () => {
    const mockOnChange = vi.fn();
    render(<RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(10);
  });

  it('should call onRoundChange when selection changes', () => {
    const mockOnChange = vi.fn();
    render(<RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const options = screen.getAllByRole('option');
    
    // Get the second option value
    const secondOptionValue = options[1].getAttribute('value');
    
    fireEvent.change(select, { target: { value: secondOptionValue } });

    expect(mockOnChange).toHaveBeenCalledWith(secondOptionValue);
  });

  it('should use correct CSS classes', () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />
    );

    expect(container.querySelector('.sphien')).toBeInTheDocument();
    expect(container.querySelector('.form-control')).toBeInTheDocument();
  });

  it('should format round IDs correctly (YYYYMMDD-HHMM)', () => {
    const mockOnChange = vi.fn();
    render(<RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />);

    const options = screen.getAllByRole('option');
    const firstOptionValue = options[0].getAttribute('value');

    // Check format: 8 digits, dash, 4 digits
    expect(firstOptionValue).toMatch(/^\d{8}-\d{4}$/);
  });

  it('should generate rounds in descending order (most recent first)', () => {
    const mockOnChange = vi.fn();
    render(<RoundSelector selectedRoundId="20251119-0646" onRoundChange={mockOnChange} />);

    const options = screen.getAllByRole('option');
    const firstRound = options[0].getAttribute('value');
    const secondRound = options[1].getAttribute('value');

    // First round should be more recent (greater) than second round
    expect(firstRound! >= secondRound!).toBe(true);
  });
});

