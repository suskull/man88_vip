import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubcategoryTabs } from '../SubcategoryTabs';
import type { GameCategory } from '../../../types/api';

const mockSubcategories: GameCategory[] = [
  {
    id: 1,
    name: 'Lô 2 số',
    type: 'loto',
    guide: 'Test guide',
    rate: 98,
    pay_number: 27,
    min_amount: 1000,
    max_amount: 10000000000,
    multi: 1,
    code: 'loto_2so',
    max: 100,
    active: 1,
    max_number: 0
  },
  {
    id: 2,
    name: 'Lô 3 số',
    type: 'loto',
    guide: 'Test guide',
    rate: 980,
    pay_number: 23,
    min_amount: 1000,
    max_amount: 10000000000,
    multi: 1,
    code: 'loto_3so',
    max: 1000,
    active: 1,
    max_number: 0
  }
];

describe('SubcategoryTabs', () => {
  it('should render all subcategory tabs', () => {
    const onSubcategoryChange = vi.fn();
    
    render(
      <SubcategoryTabs 
        subcategories={mockSubcategories}
        activeSubcategory={1}
        onSubcategoryChange={onSubcategoryChange}
      />
    );

    expect(screen.getByText('Lô 2 số')).toBeInTheDocument();
    expect(screen.getByText('Lô 3 số')).toBeInTheDocument();
  });

  it('should highlight the active subcategory', () => {
    const onSubcategoryChange = vi.fn();
    
    render(
      <SubcategoryTabs 
        subcategories={mockSubcategories}
        activeSubcategory={1}
        onSubcategoryChange={onSubcategoryChange}
      />
    );

    const activeTab = screen.getByText('Lô 2 số');
    expect(activeTab).toHaveClass('active');
  });

  it('should call onSubcategoryChange when a tab is clicked', () => {
    const onSubcategoryChange = vi.fn();
    
    render(
      <SubcategoryTabs 
        subcategories={mockSubcategories}
        activeSubcategory={1}
        onSubcategoryChange={onSubcategoryChange}
      />
    );

    const lo3soTab = screen.getByText('Lô 3 số');
    fireEvent.click(lo3soTab);

    expect(onSubcategoryChange).toHaveBeenCalledWith(2);
  });
});

