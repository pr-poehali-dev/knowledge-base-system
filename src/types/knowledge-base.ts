export interface Article {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  parentId?: string;
  children?: Category[];
  articleCount: number;
}

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  emoji?: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  articleCount?: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: "admin" | "editor" | "viewer";
}

export interface Comment {
  id: string;
  articleId: string;
  author: User;
  content: string;
  createdAt: Date;
  replies?: Comment[];
}

export interface FilterOptions {
  category?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  author?: string;
  tags?: string[];
  sortBy?: "date" | "views" | "title";
  sortOrder?: "asc" | "desc";
}

export interface Breadcrumb {
  id: string;
  label: string;
  href: string;
}

export interface SearchResult {
  article: Article;
  category: Category;
  highlights: string[];
  score: number;
}

export interface KnowledgeBaseState {
  selectedCategory: string | null;
  searchQuery: string;
  filters: FilterOptions;
  recentlyViewed: Article[];
  favorites: Article[];
  expandedCategories: string[];
}
