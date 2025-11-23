import { isMobile } from 'react-device-detect';
import type { HistoryItem } from '../../types/api';

interface HistoryTableProps {
  historyItems: HistoryItem[];
  isLoading: boolean;
}

export const HistoryTable = ({ historyItems, isLoading }: HistoryTableProps) => {
  const formatRoundId = (times: string): string => {
    // Convert "202511200788" to "20251120-0788"
    if (times.length >= 12) {
      return `${times.slice(0, 8)}-${times.slice(8)}`;
    }
    return times;
  };

  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()}K`;
  };

  const getStatusBadge = (status: number): React.ReactNode => {
    switch (status) {
      case 0:
        return <span className="badge badge-secondary badge-pill">Đang chờ</span>;
      case 1:
        return <span className="badge badge-success badge-pill">Thắng</span>;
      case 2:
        return <span className="badge badge-secondary badge-pill">Thua</span>;
      case 3:
        return <span className="badge badge-secondary badge-pill">Hủy</span>;
      default:
        return <span className="badge badge-secondary badge-pill">Không xác định</span>;
    }
  };

  const isWinningNumber = (number: string, winningNumbers?: string[]): boolean => {
    if (!winningNumbers) return false;
    return winningNumbers.includes(number) || winningNumbers.includes(parseInt(number).toString());
  };

  if (isLoading) {
    return (
      <div className="text-center" style={{ padding: '20px' }}>
        Đang tải...
      </div>
    );
  }

  if (!historyItems || historyItems.length === 0) {
    return (
      <div className="text-center text-danger">
        <h6>Không có dữ liệu</h6>
      </div>
    );
  }

  // Mobile layout: Card-based view
  if (isMobile) {
    return (
      <div className="history-cards">
        {historyItems.map((item, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>#{item.id} - {formatRoundId(item.times)}</span>
                {getStatusBadge(item.status)}
              </div>
            </div>
            <div className="card-body">
              <div className="history-item-row">
                <span className="history-label">Thời gian:</span>
                <span className="history-value">{item.date}</span>
              </div>
              <div className="history-item-row">
                <span className="history-label">Loại đề:</span>
                <span className="history-value">{item.cate}</span>
              </div>
              <div className="history-item-row">
                <span className="history-label">Số cược:</span>
                <span className="history-value">
                  {item.numbers.map((number, idx) => (
                    <span
                      key={idx}
                      className={`badge mr-1 ${
                        isWinningNumber(number, item.numbers_win) ? 'badge-success' : ''
                      }`}
                    >
                      {number}
                    </span>
                  ))}
                </span>
              </div>
              <div className="history-item-row">
                <span className="history-label">Tiền cược:</span>
                <span className="history-value">{formatCurrency(item.amount)}</span>
              </div>
              <div className="history-item-row">
                <span className="history-label">Tiền thắng:</span>
                <span className="history-value text-success font-weight-bold">{formatCurrency(item.amount_win)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop layout: Table view
  return (
    <table className="table table-response">
      <thead>
        <tr>
          <th>ID</th>
          <th>Lượt xổ</th>
          <th>Thời gian</th>
          <th>Loại đề</th>
          <th>Số cược</th>
          <th>Tiền cược</th>
          <th>Tiền thắng</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {historyItems.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{formatRoundId(item.times)}</td>
            <td>{item.date}</td>
            <td>{item.cate}</td>
            <td>
              {item.numbers.map((number, idx) => (
                <span
                  key={idx}
                  className={`badge mr-1 ${
                    isWinningNumber(number, item.numbers_win) ? 'badge-success' : ''
                  }`}
                >
                  {number}
                </span>
              ))}
            </td>
            <td>{formatCurrency(item.amount)}</td>
            <td>{formatCurrency(item.amount_win)}</td>
            <td>{getStatusBadge(item.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

