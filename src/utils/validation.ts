import type { GameCategory } from '../types/api';

export interface ValidationError {
  field: string;
  message: string;
}

export interface BetValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validates bet data before submission
 */
export const validateBet = (
  selectedNumbers: string[],
  amountPerNumber: number,
  totalAmount: number,
  category: GameCategory | null,
  userBalance: number
): BetValidationResult => {
  const errors: ValidationError[] = [];

  // Check if category is selected
  if (!category) {
    errors.push({
      field: 'category',
      message: 'Vui lòng chọn loại cược',
    });
    return { isValid: false, errors };
  }

  // Check if numbers are selected
  if (selectedNumbers.length === 0) {
    errors.push({
      field: 'numbers',
      message: 'Vui lòng chọn ít nhất một số',
    });
  }

  // Check max number limit
  if (category.max_number && selectedNumbers.length > category.max_number) {
    errors.push({
      field: 'numbers',
      message: `Bạn chỉ được chọn tối đa ${category.max_number} số`,
    });
  }

  // Check exact number requirement for some games
  if (category.max_number && category.max_number === category.pay_number) {
    if (selectedNumbers.length !== category.max_number) {
      errors.push({
        field: 'numbers',
        message: `Bạn phải chọn đúng ${category.max_number} số`,
      });
    }
  }

  // Validate amount per number
  if (amountPerNumber < 1) {
    errors.push({
      field: 'amountPerNumber',
      message: 'Số tiền 1 con phải lớn hơn hoặc bằng 1K',
    });
  }

  // Validate against min_amount
  if (category.min_amount && totalAmount < category.min_amount) {
    errors.push({
      field: 'totalAmount',
      message: `Tổng tiền phải lớn hơn hoặc bằng ${category.min_amount}K`,
    });
  }

  // Validate against max_amount
  if (category.max_amount && totalAmount > category.max_amount) {
    errors.push({
      field: 'totalAmount',
      message: `Tổng tiền không được vượt quá ${category.max_amount}K`,
    });
  }

  // Check user balance
  if (totalAmount > userBalance) {
    errors.push({
      field: 'balance',
      message: `Số dư không đủ. Số dư hiện tại: ${userBalance.toFixed(2)}K`,
    });
  }

  // Validate total amount is positive
  if (totalAmount <= 0) {
    errors.push({
      field: 'totalAmount',
      message: 'Tổng tiền phải lớn hơn 0',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Format validation errors into a single message
 */
export const formatValidationErrors = (errors: ValidationError[]): string => {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0].message;
  
  return errors.map((error, index) => `${index + 1}. ${error.message}`).join('\n');
};

