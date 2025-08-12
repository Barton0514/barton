import React, { useState } from 'react';
import { User, Edit3, Save, X, Heart, MessageSquare, Calendar, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../hooks/useBooks';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, updateUser } = useAuth();
  const { getBookById } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      username: user?.username || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const favoriteBooks = user?.favoriteBooks.map(id => getBookById(id)).filter(Boolean) || [];
  const totalReadingTime = user?.readingHistory.reduce((acc, record) => {
    const days = Math.ceil((record.lastReadDate.getTime() - record.startDate.getTime()) / (1000 * 60 * 60 * 24));
    return acc + days;
  }, 0) || 0;

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-900">个人资料</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100/50 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {favoriteBooks.length} 收藏
                </span>
                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {user.chatHistory.length} 对话
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {totalReadingTime} 天阅读
                </span>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="ml-auto flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
              >
                <Edit3 className="h-4 w-4" />
                <span>编辑</span>
              </button>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="mb-8 p-6 bg-gray-50/50 rounded-xl backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">编辑资料</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({...editData, username: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-brand-accent text-brand-primary rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <Save className="h-4 w-4 mr-1" />
                  保存
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{user.readingHistory.length}</p>
                  <p className="text-gray-600">已读书籍</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{favoriteBooks.length}</p>
                  <p className="text-gray-600">收藏书籍</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-500 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{user.chatHistory.length}</p>
                  <p className="text-gray-600">对话次数</p>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Books */}
          {favoriteBooks.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">收藏的书籍</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteBooks.map(book => (
                  <div key={book.id} className="flex items-center p-4 bg-white/50 rounded-lg border border-gray-200 backdrop-blur-sm">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h5 className="font-medium text-gray-900 line-clamp-1">{book.title}</h5>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;