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
        <h1 className="text-5xl font-extrabold text-brand-text-primary mb-3 tracking-tight">与书籍作者对话</h1>
        <p className="text-xl text-brand-text-secondary">探索知识的深度，与大师级思想家进行虚拟对话</p>
      </div>

      <div className="bg-brand-surface backdrop-blur-md p-4 rounded-xl border border-brand-border">
        <div className="flex justify-between items-center">
          <p className="text-sm text-brand-text-secondary">共找到 <span className="font-semibold text-brand-text-primary">{filteredBooks.length}</span> 本书</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={clsx('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-brand-accent text-white' : 'hover:bg-white/10')}><Grid size={20} /></button>
            <button onClick={() => setViewMode('list')} className={clsx('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-brand-accent text-white' : 'hover:bg-white/10')}><List size={20} /></button>
            <button onClick={() => setShowFilters(!showFilters)} className={clsx('p-2 rounded-lg transition-colors', showFilters ? 'bg-white/20' : 'hover:bg-white/10')}><SlidersHorizontal size={20} /></button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="p-6 bg-brand-surface backdrop-blur-md rounded-xl border border-brand-border">
           <p className="text-center text-brand-text-secondary">筛选器功能区域。</p>
        </div>
      )}

      <div className={clsx(
        viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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