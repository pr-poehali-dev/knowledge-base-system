import { useState } from "react";
import { Category } from "@/types/knowledge-base";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  expandedCategories: string[];
  onCategorySelect: (categoryId: string | null) => void;
  onToggleExpansion: (categoryId: string) => void;
  className?: string;
}

const Sidebar = ({
  categories,
  selectedCategory,
  expandedCategories,
  onCategorySelect,
  onToggleExpansion,
  className,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const isSelected = selectedCategory === category.id;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id} className="select-none">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            isSelected &&
              "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300",
            level > 0 && "ml-6 text-sm",
          )}
          onClick={() => {
            if (hasChildren) {
              onToggleExpansion(category.id);
            } else {
              onCategorySelect(category.id);
            }
          }}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? "ChevronDown" : "ChevronRight"}
              size={16}
              className="text-gray-400 flex-shrink-0"
            />
          )}

          {!isCollapsed && (
            <>
              <span className="text-lg flex-shrink-0">{category.emoji}</span>
              <span className="flex-1 truncate font-medium">
                {category.name}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                {category.articleCount}
              </span>
            </>
          )}
        </div>

        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {category.children?.map((child) =>
              renderCategory(child, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              База знаний
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Icon
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              size={18}
              className="text-gray-500"
            />
          </button>
        </div>
      </div>

      <div className="p-2 space-y-1 overflow-y-auto">
        {categories.map((category) => renderCategory(category))}
      </div>

      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Icon name="Info" size={16} />
              <span>База знаний v2.0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
