import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Heart } from 'lucide-react';
import { Book, ViewMode } from '../types';
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
    if (book.difyChatUrl) {
      window.open(book.difyChatUrl, '_blank', 'noopener,noreferrer');
    } else {
      onChatClick(book);
    }
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(book.id);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        onClick={() => onDetailsClick(book)}
        className="cursor-pointer h-full bg-brand-surface backdrop-blur-md rounded-xl border border-brand-border overflow-hidden"
        whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
      >
        <div className="flex items-center p-4">
          <img
            src={book.cover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
          />
          <div className="ml-5 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-brand-text-primary line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-brand-text-secondary mt-1">作者：{book.author}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button 
                  onClick={handleFavoriteClick}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={isFavorite ? "取消收藏" : "收藏"}
                >
                  <Heart size={20} className={clsx(isFavorite ? 'text-red-500 fill-current' : 'text-brand-text-secondary')} />
                </button>
                <button 
                  onClick={handleChatClick}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="与作者对话"
                >
                  <MessageCircle size={20} className="text-brand-text-secondary" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-3 text-sm text-brand-text-secondary">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-brand-accent fill-current" />
                <span>{book.rating}</span>
              </div>
            </div>
            <p className="text-brand-text-secondary text-sm mt-3 line-clamp-2">
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
      className="cursor-pointer h-full bg-brand-surface backdrop-blur-md rounded-xl border border-brand-border overflow-hidden"
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
    >
      <div className="w-full h-52">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-brand-text-primary mb-1 truncate">{book.title}</h3>
          <p className="text-sm text-brand-text-secondary mb-3">作者: {book.author}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-brand-text-secondary mt-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-brand-accent fill-current"/>
            <span>{book.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleFavoriteClick} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isFavorite ? "取消收藏" : "收藏"}
            >
              <Heart size={20} className={clsx(isFavorite ? 'text-red-500 fill-current' : 'text-brand-text-secondary')} />
            </button>
            <button 
              onClick={handleChatClick} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="与作者对话"
            >
              <MessageCircle size={20} className="text-brand-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;