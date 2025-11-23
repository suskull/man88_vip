/**
 * Generate an array of numbers for the grid based on game type
 * @param start - Starting number
 * @param end - Ending number (exclusive)
 * @param digits - Number of digits (2 or 3)
 * @returns Array of formatted number strings
 */
export const generateNumbers = (start: number, end: number, digits: number): string[] => {
  const numbers: string[] = [];
  
  for (let i = start; i < end; i++) {
    if (digits === 3) {
      // For 3-digit numbers
      if (i < 10) {
        numbers.push(`00${i}`);
      } else if (i < 100) {
        numbers.push(`0${i}`);
      } else {
        numbers.push(i.toString());
      }
    } else {
      // For 2-digit numbers
      if (i < 10) {
        numbers.push(`0${i}`);
      } else {
        numbers.push(i.toString());
      }
    }
  }
  
  return numbers;
};

/**
 * Get the number of digits based on game code
 */
export const getDigitsFromCode = (code: string): number => {
  if (code === 'loto_3so' || code === '3cang') {
    return 3;
  }
  return 2;
};

/**
 * Get the max number based on game code
 */
export const getMaxNumberFromCode = (code: string): number => {
  if (code === 'loto_3so' || code === '3cang') {
    return 1000;
  }
  return 100;
};

/**
 * Check if a game type uses a single digit grid (like dauduoi)
 */
export const isSingleDigitGame = (code: string): boolean => {
  return code === 'dauduoi_dau' || code === 'dauduoi_duoi';
};

/**
 * Get the number of digits per number based on category code
 * Used for parsing manual input
 */
export const getNumberLength = (code: string): number => {
  // 3-digit games
  if (code === 'loto_3so' || code === '3cang') {
    return 3;
  }
  // 1-digit games
  if (code === 'dauduoi_dau' || code === 'dauduoi_duoi') {
    return 1;
  }
  // 2-digit games (default)
  return 2;
};

