import type { GameCategory } from '../../types/api';

interface SubcategoryTabsProps {
  subcategories: GameCategory[];
  activeSubcategory: number | null;
  onSubcategoryChange: (subcategoryId: number) => void;
}

export const SubcategoryTabs = ({ 
  subcategories, 
  activeSubcategory, 
  onSubcategoryChange 
}: SubcategoryTabsProps) => {
  return (
    <div className="subcat">
      {subcategories.map((subcategory) => (
        <div key={subcategory.id} className="subcat-item">
          <a 
            className={activeSubcategory === subcategory.id ? 'active' : ''}
            onClick={() => onSubcategoryChange(subcategory.id)}
            style={{ cursor: 'pointer' }}
          >
            {subcategory.name}
          </a>
        </div>
      ))}
    </div>
  );
};

