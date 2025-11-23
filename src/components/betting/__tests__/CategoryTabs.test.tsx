import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTabs } from '../CategoryTabs';
import type { CategoryGroup } from '../../../types/api';

const mockCategories: CategoryGroup[] = [
  {
    type: 'loto',
    name: 'Bao lô',
    children: []
  },
  {
    type: 'loxien',
    name: 'Lô xiên',
    children: []
  },
  {
    type: 'dauduoi',
    name: 'Đầu đuôi',
    children: []
  }
];

describe('CategoryTabs', () => {
  it('should render all category tabs', () => {
    const onCategoryChange = vi.fn();
    
    render(
      <CategoryTabs 
        categories={mockCategories}
        activeCategory="loto"
        onCategoryChange={onCategoryChange}
      />
    );

    expect(screen.getByText('Bao lô')).toBeInTheDocument();
    expect(screen.getByText('Lô xiên')).toBeInTheDocument();
    expect(screen.getByText('Đầu đuôi')).toBeInTheDocument();
  });

  it('should highlight the active category', () => {
    const onCategoryChange = vi.fn();
    
    render(
      <CategoryTabs 
        categories={mockCategories}
        activeCategory="loto"
        onCategoryChange={onCategoryChange}
      />
    );

    const activeTab = screen.getByText('Bao lô');
    expect(activeTab).toHaveClass('active');
  });

  it('should call onCategoryChange when a tab is clicked', () => {
    const onCategoryChange = vi.fn();
    
    render(
      <CategoryTabs 
        categories={mockCategories}
        activeCategory="loto"
        onCategoryChange={onCategoryChange}
      />
    );

    const loxienTab = screen.getByText('Lô xiên');
    fireEvent.click(loxienTab);

    expect(onCategoryChange).toHaveBeenCalledWith('loxien');
  });
});

