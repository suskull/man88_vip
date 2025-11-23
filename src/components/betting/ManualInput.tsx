import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameCategory } from '../../types/api';
import { getNumberLength } from '../../utils/numberUtils';
import { GameRules } from './GameRules';
import { isMobile } from 'react-device-detect';

interface ManualInputProps {
  category: GameCategory | null;
  onNumbersConfirm: (numbers: string[]) => void;
}

export const ManualInput = ({ category, onNumbersConfirm }: ManualInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const isInternalUpdateRef = useRef(false);
  const prevCategoryRef = useRef<string | null>(null);

  /**
   * Parse input string to extract numbers based on digit length
   */
  const parseInputToNumbers = useCallback((input: string, digitsPerNumber: number): string[] => {
    if (!input.trim()) return [];

    // Remove any existing dashes and spaces
    const cleanInput = input.replace(/[-\s]/g, '');

    const numbers: string[] = [];
    for (let i = 0; i < cleanInput.length; i += digitsPerNumber) {
      const number = cleanInput.slice(i, i + digitsPerNumber);
      if (number.length === digitsPerNumber) {
        numbers.push(number);
      }
    }

    return numbers;
  }, []);

  /**
   * Format input with dashes at appropriate positions
   */
  const formatInputWithDashes = useCallback((input: string, digitsPerNumber: number): string => {
    // Remove any existing dashes and spaces
    const cleanInput = input.replace(/[-\s]/g, '');

    let formatted = '';
    for (let i = 0; i < cleanInput.length; i += digitsPerNumber) {
      if (i > 0) formatted += '-';
      formatted += cleanInput.slice(i, i + digitsPerNumber);
    }

    return formatted;
  }, []);

  /**
   * Reset input when category changes
   */
  useEffect(() => {
    if (category && prevCategoryRef.current !== category.code) {
      setInputValue('');
      prevCategoryRef.current = category.code;
    }
  }, [category]);

  /**
   * Handle input change with auto-formatting
   */
  const handleNumberInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!category) return;

    const value = e.target.value;
    const digitsPerNumber = getNumberLength(category.code);

    // Allow only digits and dashes
    let cleanValue = value.replace(/[^0-9-]/g, '');

    // If user is typing (not deleting), auto-format with dashes
    if (value.length > inputValue.length) {
      // Remove existing dashes to get pure number string
      const pureNumbers = cleanValue.replace(/[-]/g, '');

      // Add dashes at appropriate positions
      cleanValue = formatInputWithDashes(pureNumbers, digitsPerNumber);
    }

    setInputValue(cleanValue);

    // Parse and update selected numbers
    const numbers = parseInputToNumbers(cleanValue, digitsPerNumber);
    isInternalUpdateRef.current = true;
    onNumbersConfirm(numbers);
  }, [inputValue, category, formatInputWithDashes, parseInputToNumbers, onNumbersConfirm]);

  /**
   * Handle keyboard input - only allow digits
   */
  const handleNumberInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, arrow keys, etc.
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
      return;
    }

    // Only allow numeric input
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      return;
    }
  };

  if (!category) {
    return null;
  }

  const numberLength = getNumberLength(category.code);

  // Mobile layout: simple input only with auto-formatting
  if (isMobile) {
    const placeholder = numberLength === 3
      ? `Nhập số (${numberLength} chữ số mỗi con)`
      : numberLength === 1
      ? `Nhập số (${numberLength} chữ số mỗi con)`
      : `Nhập số (${numberLength} chữ số mỗi con)`;

    return (
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleNumberInputChange}
        onKeyDown={handleNumberInputKeyDown}
      />
    );
  }

  // Desktop layout: input with button and game rules
  const placeholder = numberLength === 3 ? 'Ví dụ: 123,456,789' : 'Ví dụ: 12,34,56';

  return (
    <div className="padhead">
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div className="inputs-group">
          <label htmlFor="manual-input">Nhập số</label>
          <input
            id="manual-input"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleNumberInputChange}
            onKeyDown={handleNumberInputKeyDown}
          />
        </div>
        <div className="ortext">
          <span>hoặc</span> chọn số bên dưới
        </div>
      </div>
      <GameRules category={category} />
    </div>
  );
};

