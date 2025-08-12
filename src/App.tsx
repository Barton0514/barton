import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Book, SearchFilters } from './types';
import { AuthProvider } from './context/AuthContext';
import { useBooks } from './hooks/useBooks';
import Header from './components/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import ChatInterface from './components/ChatInterface';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile';
import DifyChat from './components/DifyChat';

type ViewMode = 'list' | 'detail' | 'chat' | 'difyChat';
type Theme = 'light' | 'dark';

function AppContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: '' });
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { books, loading, error } = useBooks();

  const handleBookDetails = (book: Book) => {
    setSelectedBook(book);
    setViewMode('detail');
  };

  const handleChatClick = (book: Book) => {
    setSelectedBook(book);
    if (book.difyChatUrl) {
      setViewMode('difyChat'); // 如果有 difyUrl，切换到 difyChat 视图
    } else {
      setViewMode('chat'); // 否则，使用内置聊天
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedBook(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchFilters(prev => ({ ...prev, query }));
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载书籍数据...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">加载失败</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        onSearchChange={handleSearchChange}
        onLoginClick={() => setShowLoginForm(true)}
        onRegisterClick={() => setShowRegisterForm(true)}
        theme={theme}
        onThemeChange={setTheme}
      />
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div
            key="list"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <BookList
              books={books}
              onChatClick={handleChatClick}
              onDetailsClick={handleBookDetails}
              searchFilters={searchFilters}
              onFiltersChange={setSearchFilters}
            />
          </motion.div>
        )}

        {viewMode === 'detail' && selectedBook && (
          <motion.div
            key="detail"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <BookDetail
              book={selectedBook}
              onBack={handleBackToList}
              onChatClick={handleChatClick}
            />
          </motion.div>
        )}

        {viewMode === 'difyChat' && selectedBook && selectedBook.difyChatUrl && (
          <motion.div
            key="difyChat"
            initial="initial" 
            animate="in" 
            exit="out" 
            variants={pageVariants}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <DifyChat difyUrl={selectedBook.difyChatUrl} onBack={handleBackToList} />
          </motion.div>
        )}

        {viewMode === 'chat' && selectedBook && (
          <motion.div
            key="chat"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <ChatInterface
              book={selectedBook}
              onBack={handleBackToList}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals with animation */}
      <AnimatePresence>
        {showLoginForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginForm
              onClose={() => setShowLoginForm(false)}
              onSwitchToRegister={() => {
                setShowLoginForm(false);
                setShowRegisterForm(true);
              }}
            />
          </motion.div>
        )}
        {showRegisterForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RegisterForm
              onClose={() => setShowRegisterForm(false)}
              onSwitchToLogin={() => {
                setShowRegisterForm(false);
                setShowLoginForm(true);
              }}
            />
          </motion.div>
        )}
        {showUserProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UserProfile onClose={() => setShowUserProfile(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;