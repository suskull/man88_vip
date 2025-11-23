import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultTable } from '../ResultTable';
import type { LotteryResult } from '../../../types/api';

const mockResults: LotteryResult = {
  roundId: '20251119-0646',
  prizes: [
    { name: 'Giải ĐB', numbers: ['12345'] },
    { name: 'Giải Nhất', numbers: ['67890'] },
    { name: 'Giải Nhì', numbers: ['11111', '22222'] },
    { name: 'Giải Ba', numbers: ['33333', '44444', '55555', '66666', '77777', '88888'] },
  ],
};

describe('ResultTable', () => {
  it('should render view mode tabs', () => {
    render(<ResultTable results={mockResults} isLoading={false} />);

    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('2 Số')).toBeInTheDocument();
    expect(screen.getByText('3 Số')).toBeInTheDocument();
  });

  it('should display prize tier names', () => {
    render(<ResultTable results={mockResults} isLoading={false} />);

    expect(screen.getByText('Giải ĐB')).toBeInTheDocument();
    expect(screen.getByText('Giải Nhất')).toBeInTheDocument();
    expect(screen.getByText('Giải Nhì')).toBeInTheDocument();
    expect(screen.getByText('Giải Ba')).toBeInTheDocument();
  });

  it('should display full numbers in normal mode', () => {
    render(<ResultTable results={mockResults} isLoading={false} />);

    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('67890')).toBeInTheDocument();
  });

  it('should display last 2 digits in 2 Số mode', () => {
    render(<ResultTable results={mockResults} isLoading={false} />);

    const twoDigitTab = screen.getByText('2 Số');
    fireEvent.click(twoDigitTab);

    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('should display last 3 digits in 3 Số mode', () => {
    render(<ResultTable results={mockResults} isLoading={false} />);

    const threeDigitTab = screen.getByText('3 Số');
    fireEvent.click(threeDigitTab);

    expect(screen.getByText('345')).toBeInTheDocument();
    expect(screen.getByText('890')).toBeInTheDocument();
  });

  it('should highlight active view mode tab', () => {
    render(<ResultTable results={mockResults} isLoading={false} />);

    const normalTab = screen.getByText('Normal');
    expect(normalTab).toHaveClass('active');

    const twoDigitTab = screen.getByText('2 Số');
    fireEvent.click(twoDigitTab);

    expect(twoDigitTab).toHaveClass('active');
    expect(normalTab).not.toHaveClass('active');
  });

  it('should display loading indicators when isLoading is true', () => {
    render(<ResultTable results={mockResults} isLoading={true} />);

    const loadingImages = screen.getAllByAltText('Loading');
    expect(loadingImages.length).toBeGreaterThan(0);
  });

  it('should apply special class to Giải ĐB row', () => {
    const { container } = render(<ResultTable results={mockResults} isLoading={false} />);

    const rows = container.querySelectorAll('tr');
    const specialRow = Array.from(rows).find(row => row.textContent?.includes('Giải ĐB'));
    expect(specialRow).toHaveClass('special');
  });

  it('should apply light class to alternating rows', () => {
    const { container } = render(<ResultTable results={mockResults} isLoading={false} />);

    const rows = container.querySelectorAll('tr');
    expect(rows[0]).toHaveClass('light');
    expect(rows[1]).not.toHaveClass('light');
    expect(rows[2]).toHaveClass('light');
  });

  it('should use correct CSS classes', () => {
    const { container } = render(<ResultTable results={mockResults} isLoading={false} />);

    expect(container.querySelector('.result-table')).toBeInTheDocument();
    expect(container.querySelector('.table-head')).toBeInTheDocument();
    expect(container.querySelector('.result-row')).toBeInTheDocument();
    expect(container.querySelector('.result-cell')).toBeInTheDocument();
  });

  it('should group numbers into rows of 3', () => {
    const { container } = render(<ResultTable results={mockResults} isLoading={false} />);

    // Giải Ba has 6 numbers, should be split into 2 rows of 3
    const giaiBaRow = Array.from(container.querySelectorAll('tr')).find(
      row => row.textContent?.includes('Giải Ba')
    );
    const resultRows = giaiBaRow?.querySelectorAll('.result-row');
    expect(resultRows?.length).toBe(2);
  });

  it('should handle empty results gracefully', () => {
    const emptyResults: LotteryResult = {
      roundId: '20251119-0646',
      prizes: [],
    };

    render(<ResultTable results={emptyResults} isLoading={false} />);

    expect(screen.getByText('Normal')).toBeInTheDocument();
  });
});

