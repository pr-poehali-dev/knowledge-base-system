import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/types/knowledge-base";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

const Header = ({
  searchQuery,
  onSearchChange,
  breadcrumbs = [],
  className,
}: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={cn(
        "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40",
        className,
      )}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.length > 0 ? (
            breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && (
                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="mx-2 text-gray-400"
                  />
                )}
                <span
                  className={cn(
                    "text-gray-600 dark:text-gray-400",
                    index === breadcrumbs.length - 1 &&
                      "text-gray-900 dark:text-white font-medium",
                  )}
                >
                  {crumb.label}
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2">
              <Icon name="Book" size={20} className="text-indigo-600" />
              <span className="font-semibold text-gray-900 dark:text-white">
                База знаний
              </span>
            </div>
          )}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div
            className={cn(
              "relative transition-all duration-300",
              showSearch ? "w-80" : "w-64",
            )}
          >
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Поиск в базе знаний..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              className="pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-700"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Icon name="Bell" size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
            </Button>

            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={18} />
            </Button>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  АП
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                Алексей П.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Preview */}
      {searchQuery && showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Быстрые результаты для "{searchQuery}"
            </div>
            <div className="space-y-2">
              <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer">
                <div className="font-medium text-sm">
                  Настройка GPON оборудования
                </div>
                <div className="text-xs text-gray-500">Интернет → GPON</div>
              </div>
              <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer">
                <div className="font-medium text-sm">
                  Конфигурация SIP-телефонии
                </div>
                <div className="text-xs text-gray-500">Телефония → SIP</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
