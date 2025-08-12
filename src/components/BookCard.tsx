import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { Book } from '../types';
import { categoryLabels } from '../data/mockData';

interface BookCardProps {
  book: Book;
  isFavorite?: boolean;
  onToggleFavorite?: (bookId: string) => void;
  onChatClick: (book: Book) => void;
  onDetailsClick: (book: Book) => void;
  viewMode?: 'grid' | 'list';
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite = false,
  onToggleFavorite,
  onChatClick,
  onDetailsClick,
  viewMode = 'grid'
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(book.id);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.difyChatUrl) {
      window.open(book.difyChatUrl, '_blank', 'noopener,noreferrer');
    } else {
      onChatClick(book);
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-xl shadow-subtle hover:shadow-interactive transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-transparent hover:border-brand-accent/50 group dark:bg-brand-secondary/80 dark:border-white/10"
        onClick={() => onDetailsClick(book)}
      >
        <div className="flex items-center p-4">
          <img
            src={book.cover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-md shadow-sm flex-shrink-0"
          />
          <div className="ml-5 flex-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2 dark:bg-blue-900/30 dark:text-blue-200">
              {categoryLabels[book.category]}
            </span>
            <h3 className="text-lg font-bold text-brand-primary group-hover:text-blue-600 transition-colors line-clamp-1 dark:text-white dark:group-hover:text-blue-300">
              {book.title}
            </h3>
            <p className="text-sm text-brand-muted mt-1 dark:text-gray-300">作者：{book.author}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{book.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{book.publishYear}年</span>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-col items-center justify-center space-y-3">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 bg-red-100 dark:bg-red-900/30' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleChatClick}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-brand-primary transition-colors dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      onClick={() => onDetailsClick(book)}
      className="relative w-full cursor-pointer group"
      whileHover="hover"
      style={{ perspective: 800 }}
    >
      <motion.div
        className="relative w-full h-full p-1 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"
        style={{ transformStyle: 'preserve-3d' }}
        variants={{ hover: { scale: 1.02 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* The Glowing Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 215, 0, 0.4), transparent 40%)`,
            transform: 'translateZ(-10px)',
          }}
          variants={{ hover: { opacity: 1, scale: 1.05 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* The Card Content */}
        <div className="relative w-full h-full bg-brand-secondary/90 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/10 dark:bg-brand-secondary/80">
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
          />
          <h3 className="text-lg font-bold text-white mb-1 truncate">{book.title}</h3>
          <p className="text-sm text-brand-muted mb-3">作者: {book.author}</p>
          <div className="flex justify-between items-center text-sm text-brand-muted">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-brand-accent fill-current"/>
              <span>{book.rating}</span>
            </div>
            <span>{book.publishYear}年</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookCard;