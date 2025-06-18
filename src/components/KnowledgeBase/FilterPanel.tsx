import { useState } from "react";
import { Article, FilterOptions } from "@/types/knowledge-base";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  recentlyViewed: Article[];
  popularArticles: Article[];
  className?: string;
}

const FilterPanel = ({
  filters,
  onFiltersChange,
  recentlyViewed,
  popularArticles,
  className,
}: FilterPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const authors = ["Алексей Петров", "Мария Иванова", "Дмитрий Сидоров"];
  const tags = [
    "gpon",
    "iptv",
    "sip",
    "настройка",
    "диагностика",
    "troubleshooting",
    "конфигурация",
    "оборудование",
  ];
  const sortOptions = [
    { value: "date", label: "По дате" },
    { value: "views", label: "По популярности" },
    { value: "title", label: "По названию" },
  ];

  const updateFilters = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      value !== undefined &&
      value !== null &&
      (Array.isArray(value) ? value.length > 0 : true),
  );

  if (isCollapsed) {
    return (
      <div
        className={cn(
          "w-12 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800",
          className,
        )}
      >
        <div className="p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(false)}
            className="w-full"
          >
            <Icon name="ChevronLeft" size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto",
        className,
      )}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Фильтры
          </h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <Icon name="X" size={16} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(true)}
            >
              <Icon name="ChevronRight" size={18} />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Активные фильтры:
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.author && (
                <Badge variant="secondary" className="text-xs">
                  Автор: {filters.author}
                  <button
                    onClick={() => updateFilters("author", undefined)}
                    className="ml-1 hover:text-red-500"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              )}
              {filters.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                  <button
                    onClick={() =>
                      updateFilters(
                        "tags",
                        filters.tags?.filter((t) => t !== tag),
                      )
                    }
                    className="ml-1 hover:text-red-500"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter Accordion */}
        <Accordion
          type="multiple"
          defaultValue={["sort", "author", "tags"]}
          className="space-y-4"
        >
          {/* Sort */}
          <AccordionItem value="sort">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Icon name="ArrowUpDown" size={16} />
                Сортировка
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={() => updateFilters("sortBy", option.value)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}

                {filters.sortBy && (
                  <div className="mt-3 pl-6 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sortOrder"
                        value="asc"
                        checked={filters.sortOrder === "asc"}
                        onChange={() => updateFilters("sortOrder", "asc")}
                        className="text-indigo-600"
                      />
                      <span className="text-sm">По возрастанию</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sortOrder"
                        value="desc"
                        checked={filters.sortOrder === "desc"}
                        onChange={() => updateFilters("sortOrder", "desc")}
                        className="text-indigo-600"
                      />
                      <span className="text-sm">По убыванию</span>
                    </label>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Author */}
          <AccordionItem value="author">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} />
                Автор
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {authors.map((author) => (
                  <label
                    key={author}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="author"
                      value={author}
                      checked={filters.author === author}
                      onChange={() => updateFilters("author", author)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm">{author}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Tags */}
          <AccordionItem value="tags">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Icon name="Tag" size={16} />
                Теги
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.tags?.includes(tag) || false}
                      onChange={(e) => {
                        const currentTags = filters.tags || [];
                        const newTags = e.target.checked
                          ? [...currentTags, tag]
                          : currentTags.filter((t) => t !== tag);
                        updateFilters("tags", newTags);
                      }}
                      className="text-indigo-600"
                    />
                    <span className="text-sm">#{tag}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-6" />

        {/* Recently Viewed */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon name="Clock" size={16} />
            Недавно просмотренные
          </h4>
          <div className="space-y-2">
            {recentlyViewed.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {article.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {article.views} просмотров
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon name="TrendingUp" size={16} />
            Популярные статьи
          </h4>
          <div className="space-y-2">
            {popularArticles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {article.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <Icon name="Eye" size={12} />
                  {article.views}
                  <Icon name="Star" size={12} />
                  {article.isFavorite ? "В избранном" : "Добавить"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
