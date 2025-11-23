import { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { CategoryTabs } from './CategoryTabs';
import { SubcategoryTabs } from './SubcategoryTabs';
import { NumberGrid } from './NumberGrid';
import { ManualInput } from './ManualInput';
import type { CategoryGroup, GameCategory } from '../../types/api';

interface GameAreaProps {
  selectedNumbers: string[];
  onNumbersChange: (numbers: string[]) => void;
  onCategoryChange: (category: GameCategory | null) => void;
}

export const GameArea = ({ selectedNumbers, onNumbersChange, onCategoryChange }: GameAreaProps) => {
  const { data: categoriesData, isLoading, isError } = useCategories();

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState<number | null>(null);
  const [currentCategoryGroup, setCurrentCategoryGroup] = useState<CategoryGroup | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<GameCategory | null>(null);

  // Initialize with first category when data loads
  useEffect(() => {
    if (categoriesData?.rows && categoriesData.rows.length > 0 && !activeCategory) {
      const firstCategory = categoriesData.rows[0];
      setActiveCategory(firstCategory.type);
      setCurrentCategoryGroup(firstCategory);

      if (firstCategory.children && firstCategory.children.length > 0) {
        const firstSubcategory = firstCategory.children[0];
        setActiveSubcategory(firstSubcategory.id);
        setCurrentSubcategory(firstSubcategory);
        onCategoryChange(firstSubcategory);
      }
    }
  }, [categoriesData, activeCategory, onCategoryChange]);

  // Notify parent when subcategory changes
  useEffect(() => {
    onCategoryChange(currentSubcategory);
  }, [currentSubcategory, onCategoryChange]);

  const handleCategoryChange = (categoryType: string) => {
    setActiveCategory(categoryType);
    
    const categoryGroup = categoriesData?.rows.find(cat => cat.type === categoryType);
    setCurrentCategoryGroup(categoryGroup || null);
    
    if (categoryGroup?.children && categoryGroup.children.length > 0) {
      const firstSubcategory = categoryGroup.children[0];
      setActiveSubcategory(firstSubcategory.id);
      setCurrentSubcategory(firstSubcategory);
    } else {
      setActiveSubcategory(null);
      setCurrentSubcategory(null);
    }
  };

  const handleSubcategoryChange = (subcategoryId: number) => {
    setActiveSubcategory(subcategoryId);

    const subcategory = currentCategoryGroup?.children.find(sub => sub.id === subcategoryId);
    setCurrentSubcategory(subcategory || null);

    // Clear selected numbers when changing subcategory
    onNumbersChange([]);
  };

  const handleNumberToggle = (number: string) => {
    onNumbersChange(
      selectedNumbers.includes(number)
        ? selectedNumbers.filter(n => n !== number)
        : [...selectedNumbers, number]
    );
  };

  const handleColumnSelect = (columnIndex: number, activeRange: number = 0) => {
    if (!currentSubcategory) return;

    // Get all numbers in the column
    const columnNumbers: string[] = [];
    const numberPad = getNumberPadForGame(currentSubcategory.code, activeRange);

    console.log(numberPad, 'numberPad')

    for (let row = 0; row < 10; row++) {
      const number = numberPad[row * 10 + columnIndex];
      if (number) {
        columnNumbers.push(number);
      }
    }

    // Check if all numbers in column are already selected
    const allSelected = columnNumbers.every(num => selectedNumbers.includes(num));

    if (allSelected) {
      // Deselect all
      onNumbersChange(selectedNumbers.filter(n => !columnNumbers.includes(n)));
    } else {
      // Select all (check max_number constraint)
      if (currentSubcategory.max_number && currentSubcategory.max_number < 10) {
        alert(`Bạn chỉ được chọn tối đa ${currentSubcategory.max_number} số`);
        return;
      }
      onNumbersChange(columnNumbers);
    }
  };

  const handleRowSelect = (rowIndex: number, activeRange: number = 0) => {
    if (!currentSubcategory) return;

    // Get all numbers in the row
    const rowNumbers: string[] = [];
    const numberPad = getNumberPadForGame(currentSubcategory.code, activeRange);

    for (let col = 0; col < 10; col++) {
      const number = numberPad[rowIndex * 10 + col];
      if (number) {
        rowNumbers.push(number);
      }
    }

    // Check if all numbers in row are already selected
    const allSelected = rowNumbers.every(num => selectedNumbers.includes(num));

    if (allSelected) {
      // Deselect all
      onNumbersChange(selectedNumbers.filter(n => !rowNumbers.includes(n)));
    } else {
      // Select all (check max_number constraint)
      if (currentSubcategory.max_number && currentSubcategory.max_number < 10) {
        alert(`Bạn chỉ được chọn tối đa ${currentSubcategory.max_number} số`);
        return;
      }
      onNumbersChange(rowNumbers);
    }
  };

  const handleManualInputConfirm = (numbers: string[]) => {
    if (!currentSubcategory) return;

    // Check max_number constraint
    const maxAllowed = currentSubcategory.max_number || 100;
    if (maxAllowed > 0 && numbers.length > maxAllowed) {
      alert(`Bạn chỉ được chọn tối đa ${maxAllowed} số`);
      return;
    }

    // Replace current selection with manually entered numbers
    onNumbersChange(numbers);
  };

  // Helper function to get number pad for a game
  const getNumberPadForGame = (code: string, activeRange: number = 0): string[] => {
    const numbers: string[] = [];

    if (code === 'loto_3so' || code === '3cang') {
      // 3-digit games: generate 100 numbers based on activeRange
      // activeRange 0 = 000-099, 1 = 100-199, 2 = 200-299, etc.
      const start = activeRange * 100;
      const end = start + 100;

      for (let i = start; i < end; i++) {
        numbers.push(i < 10 ? `00${i}` : i < 100 ? `0${i}` : i.toString());
      }
    } else {
      // 2-digit games: always 00-99
      for (let i = 0; i < 100; i++) {
        numbers.push(i < 10 ? `0${i}` : i.toString());
      }
    }

    return numbers;
  };

  if (isLoading) {
    return (
      <div className="game-area">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Đang tải...
        </div>
      </div>
    );
  }

  if (isError || !categoriesData) {
    return (
      <div className="game-area">
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          Lỗi khi tải dữ liệu danh mục
        </div>
      </div>
    );
  }

  return (
    <div className="cattab">
      <CategoryTabs 
        categories={categoriesData.rows}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="cattab-content">
        {currentCategoryGroup && currentCategoryGroup.children.length > 0 && (
          <SubcategoryTabs 
            subcategories={currentCategoryGroup.children}
            activeSubcategory={activeSubcategory}
            onSubcategoryChange={handleSubcategoryChange}
          />
        )}
        
        <div className="subcat-content">
          <ManualInput
            category={currentSubcategory}
            onNumbersConfirm={handleManualInputConfirm}
          />
          {currentSubcategory && (
            <NumberGrid
              gameCode={currentSubcategory.code}
              selectedNumbers={selectedNumbers}
              onNumberToggle={handleNumberToggle}
              onColumnSelect={handleColumnSelect}
              onRowSelect={handleRowSelect}
              maxSelectableNumbers={currentSubcategory.max_number || 0}
            />
          )}
        </div>
      </div>
    </div>
  );
};

