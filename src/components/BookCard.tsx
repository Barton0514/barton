import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onChatClick: (book: Book) => void;
  onDetailsClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onChatClick, onDetailsClick }) => {
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.difyChatUrl) {
      window.open(book.difyChatUrl, '_blank', 'noopener,noreferrer');
    } else {
      onChatClick(book);
    }
  };

  return (
    <motion.div
      onClick={() => onDetailsClick(book)}
      className="relative w-full h-full cursor-pointer group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
      <div className="relative w-full h-full bg-brand-secondary p-5 rounded-xl border border-white/10 flex flex-col">
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
          <button onClick={handleChatClick} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;