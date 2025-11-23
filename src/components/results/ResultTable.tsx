import { useState } from 'react';
import type { LotteryResult } from '../../types/api';

interface ResultTableProps {
  results: LotteryResult | undefined;
  isLoading: boolean;
}

type ViewMode = 'normal' | '2so' | '3so';

/**
 * ResultTable Component
 * 
 * Displays lottery results organized by prize tiers with three view modes:
 * - Normal: Shows full numbers
 * - 2 Số: Shows last 2 digits only
 * - 3 Số: Shows last 3 digits only
 */
export const ResultTable = ({ results, isLoading }: ResultTableProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('normal');

  // Format number based on view mode
  const formatNumber = (number: string): string => {
    if (viewMode === '2so') {
      return number.slice(-2);
    } else if (viewMode === '3so') {
      return number.slice(-3);
    }
    return number;
  };

  // Render loading state
  const renderLoading = () => (
    <div className="result-cell pd-0">
      <img src="/img/loading.5c4b603f.svg" alt="Loading" style={{ height: '35px' }} />
    </div>
  );

  // Render numbers for a prize tier
  const renderNumbers = (numbers: string[]) => {
    if (isLoading) {
      return numbers.map((_, index) => <div key={index}>{renderLoading()}</div>);
    }

    // Group numbers into rows (max 3 per row for better layout)
    const rows: string[][] = [];
    for (let i = 0; i < numbers.length; i += 3) {
      rows.push(numbers.slice(i, i + 3));
    }

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="result-row">
        {row.map((number, cellIndex) => (
          <div key={cellIndex} className="result-cell">
            {formatNumber(number)}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="result-table">
      <ul className="table-head">
        <li>
          <a
            href="#"
            className={viewMode === 'normal' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setViewMode('normal');
            }}
          >
            Normal
          </a>
        </li>
        <li>
          <a
            href="#"
            className={viewMode === '2so' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setViewMode('2so');
            }}
          >
            2 Số
          </a>
        </li>
        <li>
          <a
            href="#"
            className={viewMode === '3so' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setViewMode('3so');
            }}
          >
            3 Số
          </a>
        </li>
      </ul>
      <table>
        <tbody>
          {results?.prizes.map((prize, index) => {
            const isLight = index % 2 === 0;
            const isSpecial = prize.name === 'Giải ĐB';
            return (
              <tr
                key={prize.name}
                className={`${isLight ? 'light' : ''} ${isSpecial ? 'special' : ''}`}
              >
                <th>{prize.name}</th>
                <td>{renderNumbers(prize.numbers)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

