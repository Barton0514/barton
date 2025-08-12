import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Heart, Calendar, BookOpen } from 'lucide-react';
import { Book, ViewMode } from '../types';
import { categoryLabels } from '../data/mockData';
import clsx from 'clsx';

interface BookCardProps {
  book: Book;
  viewMode: ViewMode;
  isFavorite?: boolean;
  onToggleFavorite?: (bookId: string) => void;
  onChatClick: (book: Book) => void;
  onDetailsClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, viewMode, isFavorite, onToggleFavorite, onChatClick, onDetailsClick }) => {
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChatClick(book); // 直接调用从 props 传来的 onChatClick 即可
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(book.id);
  };
  
  const publishYear = new Date(book.publishedDate).getFullYear();
  
  if (viewMode === 'list') {
    return (
      <motion.div
        onClick={() => onDetailsClick(book)}
        className="relative w-full cursor-pointer group bg-brand-secondary/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-colors duration-300 p-4"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg shadow-md flex-shrink-0"
          />
          <div className="ml-5 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 mb-2">
                  {categoryLabels[book.category]}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-brand-muted mt-1">作者：{book.author}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button 
                  onClick={handleFavoriteClick}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Heart size={20} className={clsx(isFavorite ? 'text-red-500 fill-current' : 'text-brand-muted')} />
                </button>
                <button 
                  onClick={handleChatClick}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-brand-accent fill-current" />
                <span>{book.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{publishYear}年</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{book.pages}页</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3 line-clamp-2">
              {book.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Grid View
  return (
    <motion.div
      onClick={() => onDetailsClick(book)}
      className="relative w-full cursor-pointer group"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
      <div className="relative w-full h-full bg-brand-secondary p-5 rounded-2xl border border-white/10 flex flex-col">
        <img src={book.cover} alt={book.title} className="w-full h-52 object-cover rounded-lg mb-4 shadow-md"/>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white mb-1 truncate">{book.title}</h3>
          <p className="text-sm text-brand-muted mb-3">作者: {book.author}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-brand-muted mt-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-brand-accent fill-current"/>
            <span>{book.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleFavoriteClick} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Heart size={20} className={clsx(isFavorite ? 'text-red-500 fill-current' : 'text-brand-muted')} />
            </button>
            <button 
              onClick={handleChatClick} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <MessageCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;