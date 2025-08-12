import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface BookListProps {
  books: Book[];
  onChatClick: (book: Book) => void;
  onDetailsClick: (book: Book) => void;
  searchFilters: any;
  onFiltersChange: any;
}

const BookList: React.FC<BookListProps> = ({ books, onChatClick, onDetailsClick }) => {
  const { user, updateUser } = useAuth();
  const favoriteBooks = user?.favoriteBooks || [];

  const handleToggleFavorite = (bookId: string) => {
    if (!user) return;

    const updatedFavorites = favoriteBooks.includes(bookId)
      ? favoriteBooks.filter(id => id !== bookId)
      : [...favoriteBooks, bookId];

    updateUser({ favoriteBooks: updatedFavorites });
  };

  // For demo purposes, we'll use fixed positions
  const featuredBook = books[1] || books[0]; // e.g., 时间简史
  const topRatedBook = books[0]; // e.g., 人工智能
  const otherBooks = books.slice(2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Rated Book */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <BookCard 
            book={topRatedBook} 
            onDetailsClick={onDetailsClick} 
            onChatClick={onChatClick}
            isFavorite={favoriteBooks.includes(topRatedBook.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        </motion.div>
        
        {/* Featured Book */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="lg:col-span-1"
        >
          <BookCard 
            book={featuredBook} 
            onDetailsClick={onDetailsClick} 
            onChatClick={onChatClick}
            isFavorite={favoriteBooks.includes(featuredBook.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        </motion.div>
        
        {/* Other Books Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherBooks.map((book, index) => (
            <motion.div 
              key={book.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <BookCard 
                book={book} 
                onDetailsClick={onDetailsClick} 
                onChatClick={onChatClick}
                isFavorite={favoriteBooks.includes(book.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;