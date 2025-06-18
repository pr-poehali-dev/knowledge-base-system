import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { mockPopularArticles } from "@/data/mock-data";
import Sidebar from "@/components/KnowledgeBase/Sidebar";
import Header from "@/components/KnowledgeBase/Header";
import ContentArea from "@/components/KnowledgeBase/ContentArea";
import FilterPanel from "@/components/KnowledgeBase/FilterPanel";

const Index = () => {
  const {
    categories,
    articles,
    selectedCategory,
    searchQuery,
    filters,
    recentlyViewed,
    favorites,
    expandedCategories,
    setSelectedCategory,
    setSearchQuery,
    setFilters,
    toggleCategoryExpansion,
    toggleFavorite,
    addToRecentlyViewed,
  } = useKnowledgeBase();

  // Get current article based on selection
  const currentArticle = articles.length > 0 ? articles[0] : null;

  // Generate breadcrumbs
  const breadcrumbs = selectedCategory
    ? [
        { id: "home", label: "Главная", href: "/" },
        {
          id: selectedCategory,
          label:
            categories.find((cat) => cat.id === selectedCategory)?.name || "",
          href: `/${selectedCategory}`,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          expandedCategories={expandedCategories}
          onCategorySelect={setSelectedCategory}
          onToggleExpansion={toggleCategoryExpansion}
        />

        {/* Content Area */}
        <ContentArea
          article={currentArticle}
          onToggleFavorite={toggleFavorite}
        />

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          recentlyViewed={recentlyViewed}
          popularArticles={mockPopularArticles}
        />
      </div>
    </div>
  );
};

export default Index;
