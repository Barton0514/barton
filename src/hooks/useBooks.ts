import { useState, useEffect } from 'react';
import { Book, SearchFilters, Category } from '../types';
import { mockBooks } from '../data/mockData';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 模拟API调用
    const fetchBooks = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setBooks(mockBooks);
        setError(null);
      } catch (err) {
        setError('获取书籍数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const searchBooks = (filters: SearchFilters): Book[] => {
    return books.filter(book => {
      const matchesQuery = !filters.query || 
        book.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        book.author.toLowerCase().includes(filters.query.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));

      const matchesCategory = !filters.category || book.category === filters.category;
      
      const matchesRating = !filters.minRating || book.rating >= filters.minRating;
      
      const matchesYear = !filters.yearRange || 
        (book.publishYear >= filters.yearRange[0] && book.publishYear <= filters.yearRange[1]);

      return matchesQuery && matchesCategory && matchesRating && matchesYear;
    });
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };

  const getBooksByCategory = (category: Category): Book[] => {
    return books.filter(book => book.category === category);
  };

  const getPopularBooks = (limit: number = 6): Book[] => {
    return books
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  return {
    books,
    loading,
    error,
    searchBooks,
    getBookById,
    getBooksByCategory,
    getPopularBooks,
  };
};