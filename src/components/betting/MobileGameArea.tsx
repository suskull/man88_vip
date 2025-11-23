import { useState } from 'react';
import { ManualInput } from './ManualInput';
import { GameRules } from './GameRules';
import { MobileBettingSlip } from './MobileBettingSlip';
import { useCategories } from '../../hooks/useCategories';
import type { GameCategory, CategoryGroup } from '../../types/api';

interface MobileGameAreaProps {
  selectedNumbers: string[];
  onNumbersChange: (numbers: string[]) => void;
  onCategoryChange: (category: GameCategory | null) => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

/**
 * MobileGameArea Component
 *
 * Mobile-optimized game area with cattab layout:
 * - Category tabs in horizontal scrollable container
 * - Subcategory tabs below
 * - Manual input field
 * - Betting slip (inline)
 * - Game rules description
 */
export const MobileGameArea = ({
  selectedNumbers,
  onNumbersChange,
  onCategoryChange,
  onSuccess,
  onError,
}: MobileGameAreaProps) => {
  const { data: categoriesData } = useCategories();
  const [selectedGroupType, setSelectedGroupType] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Get current group and category
  const currentGroup = categoriesData?.rows.find(
    (group: CategoryGroup) => group.type === selectedGroupType
  );
  const currentCategory = currentGroup?.children.find(
    (cat: GameCategory) => cat.id === selectedCategoryId
  );

  // Handle group/category selection
  const handleGroupSelect = (groupType: string) => {
    setSelectedGroupType(groupType);
    const group = categoriesData?.rows.find((g: CategoryGroup) => g.type === groupType);
    if (group && group.children.length > 0) {
      const firstCategory = group.children[0];
      setSelectedCategoryId(firstCategory.id);
      onCategoryChange(firstCategory);
    }
  };

  // Handle category selection within group
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    const category = currentGroup?.children.find((cat: GameCategory) => cat.id === categoryId);
    if (category) {
      onCategoryChange(category);
    }
  };

  // Initialize with first group and category
  if (categoriesData && !selectedGroupType) {
    const firstGroup = categoriesData.rows[0];
    if (firstGroup && firstGroup.children.length > 0) {
      setSelectedGroupType(firstGroup.type);
      setSelectedCategoryId(firstGroup.children[0].id);
      onCategoryChange(firstGroup.children[0]);
    }
  }

  // Handle manual input
  const handleManualInput = (numbers: string[]) => {
    if (
      currentCategory?.max_number &&
      numbers.length > currentCategory.max_number
    ) {
      alert(`Bạn chỉ được chọn tối đa ${currentCategory.max_number} số`);
      return;
    }
    onNumbersChange(numbers);
  };

  // Handle remove number from betting slip
  const handleRemoveNumber = (number: string) => {
    onNumbersChange(selectedNumbers.filter(n => n !== number));
  };

  // Handle clear all numbers
  const handleClear = () => {
    onNumbersChange([]);
  };

  return (
    <div className="cattab">
      {/* Category group tabs */}
      <div className="cattab-head">
        <div className="cattab-container">
          {categoriesData?.rows.map((group: CategoryGroup) => (
            <div key={group.type} className="cattab-items">
              <a
                className={selectedGroupType === group.type ? 'active' : ''}
                onClick={() => handleGroupSelect(group.type)}
              >
                {group.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Category content */}
      <div className="cattab-content">
        {/* Subcategory tabs (categories within group) */}
        {currentGroup && currentGroup.children.length > 1 && (
          <div className="subcat">
            {currentGroup.children.map((category: GameCategory) => (
              <div key={category.id} className="subcat-item">
                <a
                  className={selectedCategoryId === category.id ? 'active' : ''}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Category content */}
        <div className="subcat-content">
          {/* Manual input */}
          {currentCategory && (
            <div className="padhead">
              <ManualInput
                category={currentCategory}
                onNumbersConfirm={handleManualInput}
              />
            </div>
          )}

          {/* Betting slip (inline) */}
          <MobileBettingSlip
            selectedNumbers={selectedNumbers}
            category={currentCategory || null}
            onRemoveNumber={handleRemoveNumber}
            onClear={handleClear}
            onSuccess={onSuccess}
            onError={onError}
          />

          {/* Game rules */}
          {currentCategory && (
              <GameRules category={currentCategory} />
          )}
        </div>
      </div>
    </div>
  );
};

