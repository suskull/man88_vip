import { useState } from 'react';
import type { GameCategory } from '../../types/api';

interface MobileBettingSlipProps {
  selectedNumbers: string[];
  category: GameCategory | null;
  onRemoveNumber: (number: string) => void;
  onClear: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

/**
 * MobileBettingSlip Component
 * 
 * Mobile-optimized betting slip that displays inline in the cattab layout.
 * Shows selected numbers with amount inputs and submit/cancel buttons.
 */
export const MobileBettingSlip = ({
  selectedNumbers,
  category,
  onClear,
  onSuccess,
  onError,
}: MobileBettingSlipProps) => {
  const [amountPerNumber, setAmountPerNumber] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');

  // Don't render if no numbers selected
  if (selectedNumbers.length === 0 || !category) {
    return null;
  }

  const handleAmountPerNumberChange = (value: string) => {
    setAmountPerNumber(value);
    const amount = parseFloat(value) || 0;
    const total = amount * selectedNumbers.length;
    setTotalAmount(total.toString());
  };

  const handleTotalAmountChange = (value: string) => {
    setTotalAmount(value);
    const total = parseFloat(value) || 0;
    const perNumber = selectedNumbers.length > 0 ? total / selectedNumbers.length : 0;
    setAmountPerNumber(perNumber.toString());
  };

  const handleSubmit = () => {
    const amount = parseFloat(amountPerNumber);
    if (!amount || amount <= 0) {
      onError('Vui lòng nhập số tiền cược');
      return;
    }

    // Simulate bet submission
    onSuccess(`Đã đặt cược ${selectedNumbers.length} số với tổng tiền ${totalAmount}k`);
    onClear();
    setAmountPerNumber('');
    setTotalAmount('');
  };

  const handleCancel = () => {
    onClear();
    setAmountPerNumber('');
    setTotalAmount('');
  };

  return (
    <div className="biende">
      <div className="bd-items">
        <div className="biende-group">
          <div className="bd-head">
            {category.name} @{category.rate}
          </div>
          <ul className="bd-content">
            <li>
              {selectedNumbers.map((num) => (
                <span key={num} className="num" style={{ backgroundColor: '#007bff' }}>
                  {num}
                </span>
              ))}
            </li>
          </ul>
          <div className="bd-foot">
            <div className="igroup">
              <span>Số tiền 1 con (k)</span>
              <input
                placeholder=""
                type="tel"
                value={amountPerNumber}
                onChange={(e) => handleAmountPerNumberChange(e.target.value)}
              />
            </div>
            <div className="igroup" style={{ marginTop: '10px' }}>
              <span>Tổng tiền cược (k)</span>
              <input
                placeholder=""
                type="tel"
                value={totalAmount}
                onChange={(e) => handleTotalAmountChange(e.target.value)}
              />
            </div>
            <div className="btn-group mt-2">
              <button className="btn btn-huy" onClick={handleCancel}>
                HỦY
              </button>
              <button className="btn btn-submit" onClick={handleSubmit}>
                XÁC NHẬN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

