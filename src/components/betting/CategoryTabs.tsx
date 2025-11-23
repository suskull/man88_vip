import type { CategoryGroup } from "@/types/api";

interface CategoryTabsProps {
  categories: CategoryGroup[];
  activeCategory: string;
  onCategoryChange: (categoryType: string) => void;
}

export const CategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryTabsProps) => {
  return (
      <div className="cattab-head">
        {categories.map((category) => (
          <div key={category.type} className="cattab-items">
            <a 
              className={activeCategory === category.type ? 'active' : ''}
              onClick={() => onCategoryChange(category.type)}
              style={{ cursor: 'pointer' }}
            >
              {category.name}
            </a>
          </div>
        ))}
      </div>
  );
};

