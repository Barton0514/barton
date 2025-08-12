import React, { useState, useMemo } from 'react';
import { Grid, List, Filter, SlidersHorizontal } from 'lucide-react';
import { Book, SearchFilters, ViewMode, Category } from '../types';
import { categoryLabels } from '../data/mockData';
import BookCard from './BookCard';
import { useAuth } from '../context/AuthContext';

interface BookListProps {
  books: Book[];
  onChatClick: (book: Book) => void;
  onDetailsClick: (book: Book) => void;
  searchFilters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  onChatClick,
  onDetailsClick,
  searchFilters,
  onFiltersChange
}) => {
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
      const matchesQuery = !searchFilters.query || 
        book.title.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        book.author.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchFilters.query.toLowerCase()));

      const matchesCategory = !searchFilters.category || book.category === searchFilters.category;
      const matchesRating = !searchFilters.minRating || book.rating >= searchFilters.minRating;

      return matchesQuery && matchesCategory && matchesRating;
    });
  }, [books, searchFilters]);

  const categories: Category[] = [
    'literature', 'technology', 'history', 'science', 
    'philosophy', 'biography', 'fiction', 'business'
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">
            共找到 <span className="font-semibold text-gray-900">{filteredBooks.length}</span> 本书籍
          </p>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>筛选器</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">筛选条件</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <select
                value={searchFilters.category || ''}
                onChange={(e) => onFiltersChange({
                  ...searchFilters,
                  category: e.target.value as Category || undefined
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">所有分类</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最低评分
              </label>
              <select
                value={searchFilters.minRating || ''}
                onChange={(e) => onFiltersChange({
                  ...searchFilters,
                  minRating: e.target.value ? parseFloat(e.target.value) : undefined
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">任意评分</option>
                <option value="4.5">4.5分及以上</option>
                <option value="4.0">4.0分及以上</option>
                <option value="3.5">3.5分及以上</option>
                <option value="3.0">3.0分及以上</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => onFiltersChange({ query: searchFilters.query })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                清除筛选
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Books Grid/List */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Filter className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到匹配的书籍</h3>
          <p className="text-gray-600">请尝试调整搜索条件或筛选器</p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favoriteBooks.includes(book.id)}
              onToggleFavorite={handleToggleFavorite}
              onChatClick={onChatClick}
              onDetailsClick={onDetailsClick}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;