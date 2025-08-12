// 核心类型定义
export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  description: string;
  cover: string;
  rating: number;
  publishYear: number;
  pages: number;
  isbn: string;
  tags: string[];
  authorBio: string;
  tableOfContents: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  favoriteBooks: string[];
  readingHistory: ReadingRecord[];
  chatHistory: ChatSession[];
  joinDate: Date;
}

export interface ReadingRecord {
  bookId: string;
  startDate: Date;
  lastReadDate: Date;
  progress: number; // 0-100
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  page: number;
  createdAt: Date;
  bookId: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'author';
  timestamp: Date;
  bookId: string;
  authorName: string;
  rating?: number;
}

export interface ChatSession {
  id: string;
  bookId: string;
  authorName: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  title: string;
}

export type Category = 
  | 'literature' 
  | 'technology' 
  | 'history' 
  | 'science' 
  | 'philosophy' 
  | 'biography' 
  | 'fiction' 
  | 'business';

export type ViewMode = 'grid' | 'list';

export interface SearchFilters {
  query: string;
  category?: Category;
  minRating?: number;
  yearRange?: [number, number];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}