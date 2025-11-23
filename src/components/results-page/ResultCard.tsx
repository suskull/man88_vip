import { useState } from 'react';
import type { ResultsListItem } from '../../types/api';

interface ResultCardProps {
  result: ResultsListItem;
}

type ViewMode = 'normal' | '2so' | '3so';

export const ResultCard = ({ result }: ResultCardProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('normal');

  const formatNumber = (number: string): string => {
    if (viewMode === '2so') {
      return number.slice(-2);
    } else if (viewMode === '3so') {
      return number.slice(-3);
    }
    return number;
  };

  const formatRoundId = (times: string): string => {
    // Convert "202511200788" to "20251120-0788"
    if (times.length >= 12) {
      return `${times.slice(0, 8)}-${times.slice(8)}`;
    }
    return times;
  };

  const renderNumbers = (numbers: string[]): React.ReactNode => {
    return (
      <>
        {numbers.map((num, idx) => (
          <div key={idx} className="result-cell">
            {formatNumber(num)}
          </div>
        ))}
      </>
    );
  };

  const renderPrizeRow = (prizeName: string, numbers: string[], isLight: boolean, isSpecial: boolean) => {
    // Split numbers into rows of 3 for display
    const rows: string[][] = [];
    for (let i = 0; i < numbers.length; i += 3) {
      rows.push(numbers.slice(i, i + 3));
    }

    return (
      <tr key={prizeName} className={`${isLight ? 'light' : ''} ${isSpecial ? 'special' : ''}`}>
        <th>{prizeName}</th>
        <td>
          {rows.map((row, idx) => (
            <div key={idx} className="result-row">
              {renderNumbers(row)}
            </div>
          ))}
        </td>
      </tr>
    );
  };

  return (
    <div className="card">
      <div className="card-header">{formatRoundId(result.times)}</div>
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
            {renderPrizeRow('Giải ĐB', [result.special], true, true)}
            {renderPrizeRow('Giải Nhất', [result.prize1], false, false)}
            {result.prize2 && renderPrizeRow('Giải Nhì', result.prize2, true, false)}
            {result.prize3 && renderPrizeRow('Giải Ba', result.prize3, false, false)}
            {result.prize4 && renderPrizeRow('Giải Tư', result.prize4, true, false)}
            {result.prize5 && renderPrizeRow('Giải Năm', result.prize5, false, false)}
            {result.prize6 && renderPrizeRow('Giải Sáu', result.prize6, true, false)}
            {result.prize7 && renderPrizeRow('Giải Bảy', result.prize7, false, false)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

