import { describe, it, expect } from 'vitest';
import { validateBet, formatValidationErrors } from '../validation';
import type { GameCategory } from '../../types/api';

const mockCategory: GameCategory = {
  id: 1,
  name: 'Lô 2 số',
  type: 'baolo',
  guide: 'Test guide',
  rate: 98,
  pay_number: 1,
  min_amount: 1,
  max_amount: 1000,
  multi: 0,
  code: 'loto_2so',
  max: 100,
  active: 1,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  max_number: 0
};

describe('validateBet', () => {
  it('should return valid for correct bet', () => {
    const result = validateBet(
      ['12', '34'],
      10,
      20,
      mockCategory,
      1000
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should return error when no category selected', () => {
    const result = validateBet(
      ['12'],
      10,
      10,
      null,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe('category');
  });

  it('should return error when no numbers selected', () => {
    const result = validateBet(
      [],
      10,
      10,
      mockCategory,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'numbers')).toBe(true);
  });

  it('should return error when amount per number is less than 1', () => {
    const result = validateBet(
      ['12'],
      0.5,
      0.5,
      mockCategory,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'amountPerNumber')).toBe(true);
  });

  it('should return error when total amount exceeds max_amount', () => {
    const result = validateBet(
      ['12'],
      1500,
      1500,
      mockCategory,
      2000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'totalAmount')).toBe(true);
    expect(result.errors.some(e => e.message.includes('1000K'))).toBe(true);
  });

  it('should return error when total amount is less than min_amount', () => {
    const categoryWithMinAmount = { ...mockCategory, min_amount: 10 };
    const result = validateBet(
      ['12'],
      5,
      5,
      categoryWithMinAmount,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'totalAmount')).toBe(true);
    expect(result.errors.some(e => e.message.includes('10K'))).toBe(true);
  });

  it('should return error when balance is insufficient', () => {
    const result = validateBet(
      ['12'],
      100,
      100,
      mockCategory,
      50
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'balance')).toBe(true);
  });

  it('should return error when total amount is 0 or negative', () => {
    const result = validateBet(
      ['12'],
      0,
      0,
      mockCategory,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'totalAmount')).toBe(true);
  });

  it('should return error when exceeding max_number', () => {
    const categoryWithMaxNumber = { ...mockCategory, max_number: 2 };
    const result = validateBet(
      ['12', '34', '56'],
      10,
      30,
      categoryWithMaxNumber,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'numbers')).toBe(true);
  });

  it('should return error when not matching exact number requirement', () => {
    const categoryWithExactNumber = { ...mockCategory, max_number: 3, pay_number: 3 };
    const result = validateBet(
      ['12', '34'],
      10,
      20,
      categoryWithExactNumber,
      1000
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'numbers')).toBe(true);
    expect(result.errors.some(e => e.message.includes('đúng 3 số'))).toBe(true);
  });
});

describe('formatValidationErrors', () => {
  it('should return empty string for no errors', () => {
    const result = formatValidationErrors([]);
    expect(result).toBe('');
  });

  it('should return single error message', () => {
    const errors = [{ field: 'test', message: 'Test error' }];
    const result = formatValidationErrors(errors);
    expect(result).toBe('Test error');
  });

  it('should return numbered list for multiple errors', () => {
    const errors = [
      { field: 'test1', message: 'Error 1' },
      { field: 'test2', message: 'Error 2' },
    ];
    const result = formatValidationErrors(errors);
    expect(result).toBe('1. Error 1\n2. Error 2');
  });
});

