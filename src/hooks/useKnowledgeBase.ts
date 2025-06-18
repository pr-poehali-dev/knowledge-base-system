import { useState, useCallback, useMemo } from "react";
import {
  Article,
  Category,
  FilterOptions,
  KnowledgeBaseState,
  SearchResult,
} from "@/types/knowledge-base";
import {
  mockArticles,
  mockCategories,
  mockRecentlyViewed,
} from "@/data/mock-data";

export const useKnowledgeBase = () => {
  const [state, setState] = useState<KnowledgeBaseState>({
    selectedCategory: null,
    searchQuery: "",
    filters: {},
    recentlyViewed: mockRecentlyViewed,
    favorites: mockArticles.filter((article) => article.isFavorite),
    expandedCategories: ["internet", "tv", "phone", "instructions"],
  });

  const categories = useMemo(() => mockCategories, []);
  const articles = useMemo(() => mockArticles, []);

  const setSelectedCategory = useCallback((categoryId: string | null) => {
    setState((prev) => ({ ...prev, selectedCategory: categoryId }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setFilters = useCallback((filters: FilterOptions) => {
    setState((prev) => ({ ...prev, filters }));
  }, []);

  const toggleCategoryExpansion = useCallback((categoryId: string) => {
    setState((prev) => ({
      ...prev,
      expandedCategories: prev.expandedCategories.includes(categoryId)
        ? prev.expandedCategories.filter((id) => id !== categoryId)
        : [...prev.expandedCategories, categoryId],
    }));
  }, []);

  const toggleFavorite = useCallback(
    (articleId: string) => {
      setState((prev) => {
        const article = articles.find((a) => a.id === articleId);
        if (!article) return prev;

        const isFavorite = prev.favorites.some((fav) => fav.id === articleId);

        return {
          ...prev,
          favorites: isFavorite
            ? prev.favorites.filter((fav) => fav.id !== articleId)
            : [...prev.favorites, article],
        };
      });
    },
    [articles],
  );

  const addToRecentlyViewed = useCallback((article: Article) => {
    setState((prev) => ({
      ...prev,
      recentlyViewed: [
        article,
        ...prev.recentlyViewed.filter((item) => item.id !== article.id),
      ].slice(0, 5),
    }));
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (state.selectedCategory) {
      const category = categories.find(
        (cat) => cat.id === state.selectedCategory,
      );
      if (category) {
        if (category.children) {
          const childIds = category.children.map((child) => child.id);
          filtered = filtered.filter(
            (article) =>
              article.categoryId === state.selectedCategory ||
              childIds.includes(article.categoryId),
          );
        } else {
          filtered = filtered.filter(
            (article) => article.categoryId === state.selectedCategory,
          );
        }
      }
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Apply additional filters
    if (state.filters.author) {
      filtered = filtered.filter(
        (article) => article.author === state.filters.author,
      );
    }

    if (state.filters.tags && state.filters.tags.length > 0) {
      filtered = filtered.filter((article) =>
        state.filters.tags!.some((tag) => article.tags.includes(tag)),
      );
    }

    // Sort results
    if (state.filters.sortBy) {
      filtered.sort((a, b) => {
        const modifier = state.filters.sortOrder === "desc" ? -1 : 1;

        switch (state.filters.sortBy) {
          case "date":
            return (a.updatedAt.getTime() - b.updatedAt.getTime()) * modifier;
          case "views":
            return (a.views - b.views) * modifier;
          case "title":
            return a.title.localeCompare(b.title) * modifier;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [
    articles,
    categories,
    state.selectedCategory,
    state.searchQuery,
    state.filters,
  ]);

  const searchResults: SearchResult[] = useMemo(() => {
    if (!state.searchQuery) return [];

    return filteredArticles
      .map((article) => {
        const category = categories.find(
          (cat) => cat.id === article.categoryId,
        );
        const highlights = []; // В реальном приложении здесь была бы подсветка найденных фрагментов

        return {
          article,
          category: category!,
          highlights,
          score: article.views, // Простая оценка релевантности
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [filteredArticles, categories, state.searchQuery]);

  return {
    // State
    ...state,
    categories,
    articles: filteredArticles,
    searchResults,

    // Actions
    setSelectedCategory,
    setSearchQuery,
    setFilters,
    toggleCategoryExpansion,
    toggleFavorite,
    addToRecentlyViewed,
  };
};
