import React, { useState } from 'react';
import { Star, Heart, MessageCircle, Calendar, BookOpen } from 'lucide-react';
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
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,215,0,0.15), transparent 20%)`
    });
  };

  const handleMouseLeave = () => {
    setSpotlightStyle({});
  };

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
        className="bg-white rounded-xl shadow-subtle hover:shadow-interactive transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-transparent hover:border-brand-accent/50 group"
        onClick={() => onDetailsClick(book)}
      >
        <div className="flex items-center p-4">
          <img
            src={book.cover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-md shadow-sm flex-shrink-0"
          />
          <div className="ml-5 flex-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
              {categoryLabels[book.category]}
            </span>
            <h3 className="text-lg font-bold text-brand-primary group-hover:text-blue-600 transition-colors line-clamp-1">
              {book.title}
            </h3>
            <p className="text-sm text-brand-muted mt-1">作者：{book.author}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{book.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{book.publishYear}年</span>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-col items-center justify-center space-y-3">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 bg-red-100' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleChatClick}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-brand-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-brand-secondary/80 rounded-2xl shadow-subtle hover:shadow-interactive transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-white/10 backdrop-blur-sm"
      onClick={() => onDetailsClick(book)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={spotlightStyle} className="absolute inset-0 z-0"></div>
      <div className="relative z-10">
        <div className="relative">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors shadow-sm ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-blue-800 backdrop-blur-sm">
              {categoryLabels[book.category]}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-brand-primary mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-brand-muted mb-3">作者：{book.author}</p>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
            {book.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{book.rating}</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span>{book.publishYear}年</span>
              <span>{book.pages}页</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {book.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <button
            onClick={handleChatClick}
            className="w-full bg-brand-primary hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>与作者对话</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;