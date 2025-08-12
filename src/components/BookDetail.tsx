import React, { useState } from 'react';
import { ArrowLeft, Star, Calendar, BookOpen, MessageCircle, Heart, Share2, Download } from 'lucide-react';
import { Book } from '../types';
import { categoryLabels } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onChatClick: (book: Book) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onBack, onChatClick }) => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'contents' | 'author'>('overview');
  
  const favoriteBooks = user?.favoriteBooks || [];
  const isFavorite = favoriteBooks.includes(book.id);

  const handleToggleFavorite = () => {
    if (!user) return;

    const updatedFavorites = isFavorite
      ? favoriteBooks.filter(id => id !== book.id)
      : [...favoriteBooks, book.id];

    updateUser({ favoriteBooks: updatedFavorites });
  };

  const tabs = [
    { id: 'overview', label: '概述', icon: BookOpen },
    { id: 'contents', label: '目录', icon: Calendar },
    { id: 'author', label: '作者', icon: MessageCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-brand-muted hover:text-brand-primary mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>返回书籍列表</span>
      </button>

      {/* Book Header */}
      <div className="bg-white rounded-xl shadow-interactive overflow-hidden mb-8">
        <div className="lg:flex">
          <div className="lg:w-1/3 p-8">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full max-w-sm mx-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="lg:w-2/3 p-8">
            <div className="max-w-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                    {categoryLabels[book.category]}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">作者：{book.author}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`p-3 rounded-full transition-colors ${
                      isFavorite 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{book.rating}</span>
                  <span>评分</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-5 w-5" />
                  <span>{book.publishYear}年出版</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-5 w-5" />
                  <span>{book.pages}页</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {book.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    if (book.difyChatUrl) {
                      window.open(book.difyChatUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      onChatClick(book);
                    }
                  }}
                  className="flex-1 bg-brand-primary hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>与作者对话</span>
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>下载样章</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-interactive overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-brand-primary border-b-2 border-brand-accent'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8 animate-fade-in">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">书籍概述</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {book.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-600">ISBN</dt>
                      <dd className="text-sm text-gray-900">{book.isbn}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">出版年份</dt>
                      <dd className="text-sm text-gray-900">{book.publishYear}年</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">页数</dt>
                      <dd className="text-sm text-gray-900">{book.pages}页</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">评分</dt>
                      <dd className="text-sm text-gray-900">{book.rating}/5.0</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contents' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">目录</h2>
              <div className="space-y-3">
                {book.tableOfContents.map((chapter, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-500 w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-900">{chapter}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'author' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">关于作者</h2>
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-brand-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {book.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.author}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {book.authorBio}
                  </p>
                  <button
                    onClick={() => {
                      if (book.difyChatUrl) {
                        window.open(book.difyChatUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        onChatClick(book);
                      }
                    }}
                    className="mt-4 bg-brand-primary hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>与作者对话</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;