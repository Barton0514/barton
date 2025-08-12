import { useState, useEffect } from 'react';
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

type ViewMode = 'list' | 'detail' | 'chat';
type Theme = 'light' | 'dark';

function AppContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: '' });
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const { books, loading, error } = useBooks();

  const handleBookDetails = (book: Book) => {
    setSelectedBook(book);
    setViewMode('detail');
  };

  const handleChatClick = (book: Book) => {
    setSelectedBook(book);
    setViewMode('chat');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedBook(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchFilters(prev => ({ ...prev, query }));
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
    <div className="min-h-screen bg-gray-50">
      {viewMode === 'list' && (
        <>
          <Header 
            onSearchChange={handleSearchChange}
            onLoginClick={() => setShowLoginForm(true)}
            onRegisterClick={() => setShowRegisterForm(true)}
            theme={theme}
            onThemeChange={setTheme}
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center p-8 mb-8 rounded-2xl">
              <h1 className="text-5xl font-extrabold text-brand-primary mb-3">
                与书籍作者对话
              </h1>
              <p className="text-xl text-brand-muted">
                探索知识的深度，与大师级思想家进行虚拟对话
              </p>
            </div>
            
            <BookList
              books={books}
              onChatClick={handleChatClick}
              onDetailsClick={handleBookDetails}
              searchFilters={searchFilters}
              onFiltersChange={setSearchFilters}
            />
          </main>
        </>
      )}

      {viewMode === 'detail' && selectedBook && (
        <BookDetail
          book={selectedBook}
          onBack={handleBackToList}
          onChatClick={handleChatClick}
        />
      )}

      {viewMode === 'chat' && selectedBook && (
        <ChatInterface
          book={selectedBook}
          onBack={handleBackToList}
        />
      )}

      {/* Modals */}
      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onSwitchToRegister={() => {
            setShowLoginForm(false);
            setShowRegisterForm(true);
          }}
        />
      )}

      {showRegisterForm && (
        <RegisterForm
          onClose={() => setShowRegisterForm(false)}
          onSwitchToLogin={() => {
            setShowRegisterForm(false);
            setShowLoginForm(true);
          }}
        />
      )}

      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
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