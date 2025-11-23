import { useState, useEffect } from 'react';
import type { GameCategory } from '../../types/api';
import { validateBet, formatValidationErrors } from '../../utils/validation';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useSubmitBet } from '../../hooks/useSubmitBet';

interface BettingSlipProps {
  selectedNumbers: string[];
  category: GameCategory | null;
  onRemoveNumber: (number: string) => void;
  onClear: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const BettingSlip = ({
  selectedNumbers,
  category,
  onRemoveNumber,
  onClear,
  onSuccess,
  onError
}: BettingSlipProps) => {
  const [amountPerNumber, setAmountPerNumber] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [potentialWinnings, setPotentialWinnings] = useState<number>(0);
  const [errors, setErrors] = useState<{ one?: boolean; amount?: boolean }>({});

  const { data: userInfo } = useUserInfo();
  const submitBetMutation = useSubmitBet();

  // Calculate based on which field was changed
  useEffect(() => {
    if (!category || selectedNumbers.length === 0) {
      setTotalAmount(0);
      setPotentialWinnings(0);
      return;
    }

    // Calculate total amount from amount per number
    if (category.multi && selectedNumbers.length > 1) {
      // For multi-number games (like loxien), multiply by number of selected numbers
      const total = amountPerNumber * category.pay_number * selectedNumbers.length;
      setTotalAmount(Number(total.toFixed(2)));
    } else {
      // For single number games
      const total = amountPerNumber * category.pay_number;
      setTotalAmount(Number(total.toFixed(2)));
    }

    // Calculate potential winnings
    const winnings = amountPerNumber * category.rate;
    setPotentialWinnings(Number(winnings.toFixed(2)));
  }, [amountPerNumber, selectedNumbers, category]);

  const handleAmountPerNumberChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setAmountPerNumber(numValue);

    // Validate
    if (numValue < 1) {
      setErrors({ ...errors, one: true });
    } else {
      setErrors({ ...errors, one: false });
    }
  };

  const handleTotalAmountChange = (value: string) => {
    if (!category) return;

    const numValue = parseFloat(value) || 0;
    setTotalAmount(numValue);

    // Calculate amount per number from total amount
    let calculatedAmountPerNumber: number;
    if (category.multi && selectedNumbers.length > 1) {
      calculatedAmountPerNumber = numValue / category.pay_number / selectedNumbers.length;
    } else {
      calculatedAmountPerNumber = numValue / category.pay_number;
    }

    setAmountPerNumber(Number(calculatedAmountPerNumber.toFixed(2)));

    // Validate
    if (numValue > category.max_amount) {
      setErrors({ ...errors, amount: true });
    } else {
      setErrors({ ...errors, amount: false });
    }
  };

  const handleClear = () => {
    setAmountPerNumber(1);
    setTotalAmount(0);
    setPotentialWinnings(0);
    setErrors({});
    onClear();
  };

  const handleSubmit = async () => {
    // Get user balance
    const userBalance = userInfo?.balance || 0;

    // Validate bet
    const validationResult = validateBet(
      selectedNumbers,
      amountPerNumber,
      totalAmount,
      category,
      userBalance
    );

    if (!validationResult.isValid) {
      const errorMessage = formatValidationErrors(validationResult.errors);
      onError(errorMessage);

      // Update UI errors
      const hasAmountError = validationResult.errors.some(
        e => e.field === 'amountPerNumber' || e.field === 'totalAmount'
      );
      const hasNumberError = validationResult.errors.some(
        e => e.field === 'numbers'
      );

      setErrors({
        one: hasNumberError || validationResult.errors.some(e => e.field === 'amountPerNumber'),
        amount: hasAmountError,
      });

      return;
    }

    // Clear errors
    setErrors({});

    // Submit bet
    try {
      if (!category) return;

      await submitBetMutation.mutateAsync({
        numbers: selectedNumbers,
        amountPerNumber,
        totalAmount,
        category,
      });

      // Success
      onSuccess('Đặt cược thành công!');

      // Clear betting slip
      handleClear();
    } catch (error) {
      onError('Đặt cược thất bại. Vui lòng thử lại.');
    }
  };

  // Format number with thousand separators
  const formatCurrency = (num: number): string => {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (!category) {
    return null;
  }

  // Show message if no numbers selected
  if (selectedNumbers.length === 0) {
    return (
      <div className="msg"><div className="msg-head">
          Bạn chưa có cược nào!
          <div className="text-danger f14">Hãy chọn 1 số để tạo cược.</div></div></div>
    );
  }

  return (
    <div className="biende">
      <div className="bd-items">
        <div className="biende-group">
          <div className="bd-head">
            {category.name} @{category.rate}
          </div>
          <ul className="bd-content">
            <li>
              {selectedNumbers.map((number, index) => (
                <span
                  key={index}
                  className="num"
                  onClick={() => onRemoveNumber(number)}
                  style={{ cursor: 'pointer' }}
                  title="Click to remove"
                >
                  {number}
                </span>
              ))}
            </li>
          </ul>
          <div className="bd-foot">
            <div className="igroup">
              <span>Số tiền 1 con (k)</span>
              <input
                type="number"
                className={errors.one ? 'error' : ''}
                value={amountPerNumber}
                onChange={(e) => handleAmountPerNumberChange(e.target.value)}
                min={1}
                step={0.01}
              />
            </div>
            <div className="igroup">
              <span>Tổng tiền (k)</span>
              <input
                type="number"
                className={errors.amount ? 'error' : ''}
                value={totalAmount}
                onChange={(e) => handleTotalAmountChange(e.target.value)}
                min={0}
                step={0.01}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="biende-foot">
        <span>TIỀN THẮNG 1 CON (K): </span>
        <span className="cur">{formatCurrency(potentialWinnings)}</span>
        <div className="btn-group">
          <button className="btn btn-huy" onClick={handleClear}>
            HỦY
          </button>
          <button className="btn btn-submit" onClick={handleSubmit}>
            XÁC NHẬN
          </button>
        </div>
      </div>
    </div>
  );
};

