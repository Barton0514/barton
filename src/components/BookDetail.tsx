import React, { useState } from 'react';
import { ArrowLeft, Star, Calendar, BookOpen, MessageCircle } from 'lucide-react';
import { Book } from '../types';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onChatClick: (book: Book) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onBack, onChatClick }) => {
  return (
    <div className="min-h-screen relative">
      {/* Background with book cover */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${book.cover})` }}
      />
      
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 via-brand-primary/70 to-brand-secondary/90 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <button 
          onClick={onBack} 
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft /> <span>返回</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cover */}
          <div className="lg:col-span-1">
            <img 
              src={book.cover} 
              alt={book.title} 
              className="w-full rounded-2xl shadow-2xl border-2 border-white/20"
            />
          </div>
          
          {/* Right Column: Details */}
          <div className="lg:col-span-2">
            <div className="bg-brand-secondary/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
              <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
              <p className="text-xl text-brand-muted mb-4">{book.author}</p>
              
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-brand-accent fill-current" />
                  <span className="font-medium">{book.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-5 w-5" />
                  <span>{book.publishYear}年</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-5 w-5" />
                  <span>{book.pages}页</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">{book.description}</p>
              
              <button 
                onClick={() => onChatClick(book)} 
                className="bg-brand-accent text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="inline-block" /> 
                <span>与作者对话</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
