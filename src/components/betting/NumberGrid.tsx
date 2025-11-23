import { useState } from "react";
import {
  generateNumbers,
  getDigitsFromCode,
  isSingleDigitGame,
} from "../../utils/numberUtils";

interface NumberGridProps {
  gameCode: string;
  selectedNumbers: string[];
  onNumberToggle: (number: string) => void;
  onColumnSelect: (columnIndex: number, activeRange: number) => void;
  onRowSelect: (rowIndex: number, activeRange: number) => void;
  maxSelectableNumbers?: number;
}

export const NumberGrid = ({
  gameCode,
  selectedNumbers,
  onNumberToggle,
  onColumnSelect,
  onRowSelect,
  maxSelectableNumbers = 0,
}: NumberGridProps) => {
  const digits = getDigitsFromCode(gameCode);
  const isSingleDigit = isSingleDigitGame(gameCode);

  // For 3-digit games, track which range is active (0-9 for 000-099, 100-199, etc.)
  const [activeRange, setActiveRange] = useState(0);

  // Generate the number pad based on game type
  const getNumberPad = (): string[] => {
    if (isSingleDigit) {
      // Single digit games (0-9)
      return generateNumbers(0, 10, 1);
    } else if (digits === 3) {
      // 3-digit games: show 100 numbers at a time (e.g., 000-099, 100-199, etc.)
      const start = activeRange * 100;
      const end = start + 100;
      return generateNumbers(start, end, 3);
    } else {
      // 2-digit games: show all 100 numbers (00-99)
      return generateNumbers(0, 100, 2);
    }
  };

  console.log(activeRange, 'activeRange')

  const numberPad = getNumberPad();

  const handleCheckboxChange = (number: string, checked: boolean) => {
    // Check if we've reached the max selectable numbers
    if (
      checked &&
      maxSelectableNumbers > 0 &&
      selectedNumbers.length >= maxSelectableNumbers
    ) {
      alert(`Bạn chỉ được chọn tối đa ${maxSelectableNumbers} số`);
      return;
    }
    onNumberToggle(number);
  };

  const handleColumnClick = (e: React.MouseEvent, columnIndex: number) => {
    e.preventDefault();
    onColumnSelect(columnIndex, activeRange);
  };

  const handleRowClick = (e: React.MouseEvent, rowIndex: number) => {
    e.preventDefault();
    onRowSelect(rowIndex, activeRange);
  };

  const handleRangeClick = (e: React.MouseEvent, rangeIndex: number) => {
    e.preventDefault();
    setActiveRange(rangeIndex);
  };

  // Render single digit grid (for dauduoi games)
  if (isSingleDigit) {
    return (
      <table className="danhlo-table">
        <tbody>
          <tr>
            {numberPad.map((number, index) => (
              <td key={index} className="tdscol">
                <span>
                  <label className="input-num">
                    <input
                      type="checkbox"
                      value={number}
                      checked={selectedNumbers.includes(number)}
                      onChange={(e) =>
                        handleCheckboxChange(number, e.target.checked)
                      }
                    />
                    <div className="checkmark">{number}</div>
                  </label>
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  // Render 2-digit or 3-digit grid (10x10 grid)
  return (
    <table className="danhlo-table">
      <tbody>
        {/* Range selector for 3-digit games */}
        {digits === 3 && (
          <tr>
            <td></td>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rangeIndex) => (
              <td key={rangeIndex} className="numTab">
                <a
                  href="#"
                  className={activeRange === rangeIndex ? "active" : ""}
                  onClick={(e) => handleRangeClick(e, rangeIndex)}
                >
                  {rangeIndex === 0
                    ? "000-099"
                    : `${rangeIndex * 100}-${rangeIndex * 100 + 99}`}
                </a>
              </td>
            ))}
          </tr>
        )}

        {/* Column selectors */}
        <tr>
          <td></td>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((colIndex) => (
            <td key={colIndex} className="tdscol">
              <a
                className="s-col"
                href="#"
                onClick={(e) => handleColumnClick(e, colIndex)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
              </a>
            </td>
          ))}
        </tr>

        {/* Number grid rows */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rowIndex) => (
          <tr key={rowIndex}>
            {/* Row selector */}
            <td className="tdsrow">
              <a
                className="s-row"
                href="#"
                onClick={(e) => handleRowClick(e, rowIndex)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
              </a>
            </td>

            {/* Number cells */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((colIndex) => {
              const number = numberPad[rowIndex * 10 + colIndex];
              return (
                <td key={colIndex} className="tdscol">
                  <span>
                    <label className="input-num">
                      <input
                        type="checkbox"
                        value={number}
                        checked={selectedNumbers.includes(number)}
                        onChange={(e) =>
                          handleCheckboxChange(number, e.target.checked)
                        }
                      />
                      <div className="checkmark">{number}</div>
                    </label>
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
