// src/types/index.ts
export type Book = {
  id: string;
  title: string;
  author: string;
  category: Category;
  description: string;
  cover: string;
  rating: number;
  publishedDate: string;
  language: string;
  pages: number;
  tags: string[];
};

export type Category = 
  | 'literature'
  | 'technology'
  | 'history'
  | 'science'
  | 'philosophy'
  | 'biography'
  | 'fiction'
  | 'business';

export interface SearchFilters {
  query?: string;
  category?: Category;
}

export type ViewMode = 'grid' | 'list';
// src/data/mockData.ts
export const categoryLabels = {
  literature: '文学',
  technology: '科技',
  history: '历史',
  science: '科学',
  philosophy: '哲学',
  biography: '传记',
  fiction: '小说',
  business: '商业',
};

export const mockBooks = [
  {
    id: '1',
    title: '时间简史',
    author: '史蒂芬·霍金',
    category: 'science',
    description: '《时间简史》是英国物理学家史蒂芬·霍金创作的科普著作，首次出版于1988年。全书共12章，讲解了黑洞、大爆炸、时空结构等深奥的宇宙学概念，用通俗易懂的语言向普通读者介绍了当代有关宇宙的最重要概念。',
    cover: 'https://source.unsplash.com/random/800x600/?space,science',
    rating: 4.7,
    publishedDate: '1988-04-01',
    language: '中文',
    pages: 234,
    tags: ['宇宙学', '物理学', '科普']
  },
  {
    id: '2',
    title: '人工智能：一种现代的方法',
    author: '斯图尔特·罗素',
    category: 'technology',
    description: '这是人工智能领域的经典教材，全面介绍了人工智能的基本概念、技术与应用。书中涵盖了搜索算法、机器学习、神经网络、自然语言处理等核心主题，是AI学习者的必读书籍。',
    cover: 'https://source.unsplash.com/random/800x600/?ai,technology',
    rating: 4.5,
    publishedDate: '2020-01-01',
    language: '中文',
    pages: 1132,
    tags: ['人工智能', '计算机科学', '机器学习']
  },
  {
    id: '3',
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    category: 'history',
    description: '这本书以宏观视角审视人类发展历程，从认知革命到农业革命，再到科学革命，探讨了人类如何成为地球主宰以及可能的未来方向。作者以独特的视角和生动的语言，为读者呈现了人类历史的全景图。',
    cover: 'https://source.unsplash.com/random/800x600/?history,human',
    rating: 4.6,
    publishedDate: '2011-01-01',
    language: '中文',
    pages: 443,
    tags: ['历史', '文明', '社会学']
  },
  {
    id: '4',
    title: '道德经',
    author: '老子',
    category: 'philosophy',
    description: '中国古代哲学经典，道家思想的核心著作。全书共81章，以简练的五千言阐述了道的本体论、认识论和价值论，对中国哲学、政治、文化产生了深远影响。',
    cover: 'https://source.unsplash.com/random/800x600/?taoism,philosophy',
    rating: 4.8,
    publishedDate: '公元前6世纪',
    language: '中文',
    pages: 120,
    tags: ['哲学', '道家', '东方思想']
  }
];
// src/types/index.ts
export type Book = {
  id: string;
  title: string;
  author: string;
  category: Category;
  description: string;
  cover: string;
  rating: number;
  publishedDate: string;
  language: string;
  pages: number;
  tags: string[];
};

export type Category = 
  | 'literature'
  | 'technology'
  | 'history'
  | 'science'
  | 'philosophy'
  | 'biography'
  | 'fiction'
  | 'business';

export interface SearchFilters {
  query?: string;
  category?: Category;
}

export type ViewMode = 'grid' | 'list';
import React, { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { Book, SearchFilters, ViewMode } from '../types';
import BookCard from './BookCard';
import { useAuth } from '../context/AuthContext';

interface BookListProps {
  books: Book[];
  onChatClick: (book: Book) => void;
  onDetailsClick: (book: Book) => void;
  searchFilters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onChatClick, onDetailsClick, searchFilters, onFiltersChange }) => {
  const { user, updateUser } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const favoriteBooks = user?.favoriteBooks || [];

  const handleToggleFavorite = (bookId: string) => {
    if (!user) return;
    const updatedFavorites = favoriteBooks.includes(bookId)
      ? favoriteBooks.filter(id => id !== bookId)
      : [...favoriteBooks, bookId];
    updateUser({ favoriteBooks: updatedFavorites });
  };

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const query = searchFilters.query || '';
      const category = searchFilters.category;
      
      const matchesQuery = !query ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase());
        
      const matchesCategory = !category || book.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }, [books, searchFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center pt-8">
        <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">与书籍作者对话</h1>
        <p className="text-xl text-brand-muted">探索知识的深度，与大师级思想家进行虚拟对话</p>
      </div>

      <div className="sticky top-[70px] z-40 bg-brand-primary/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-brand-muted text-sm">共找到 <span className="font-semibold text-white">{filteredBooks.length}</span> 本书</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={clsx('p-2 rounded-lg', viewMode === 'grid' ? 'bg-brand-accent text-brand-primary' : 'hover:bg-white/10')}><Grid size={20} /></button>
            <button onClick={() => setViewMode('list')} className={clsx('p-2 rounded-lg', viewMode === 'list' ? 'bg-brand-accent text-brand-primary' : 'hover:bg-white/10')}><List size={20} /></button>
            <button onClick={() => setShowFilters(!showFilters)} className={clsx('p-2 rounded-lg', showFilters ? 'bg-white/20' : 'hover:bg-white/10')}><SlidersHorizontal size={20} /></button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="p-6 bg-brand-secondary/80 backdrop-blur-md rounded-2xl border border-white/10">
           <p className="text-center text-brand-muted">筛选器功能区域。</p>
        </div>
      )}

      <div className={clsx(
        'transition-opacity duration-500',
        viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          : "flex flex-col gap-4"
      )}>
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            viewMode={viewMode}
            onChatClick={onChatClick}
            onDetailsClick={onDetailsClick}
            isFavorite={favoriteBooks.includes(book.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;