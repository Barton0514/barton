import React, { useState } from 'react';
import { User, Edit3, Save, X, Heart, MessageSquare, Calendar, BookOpen } from 'lucide-react';
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">个人资料</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="用户名"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="邮箱地址"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>保存</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>取消</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{user.username}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    加入时间：{user.joinDate.toLocaleDateString('zh-CN')}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 mt-3 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>编辑资料</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Heart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{user.favoriteBooks.length}</p>
              <p className="text-sm text-gray-600">收藏书籍</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{user.readingHistory.length}</p>
              <p className="text-sm text-gray-600">阅读记录</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{user.chatHistory.length}</p>
              <p className="text-sm text-gray-600">对话记录</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{totalReadingTime}</p>
              <p className="text-sm text-gray-600">阅读天数</p>
            </div>
          </div>

          {/* Favorite Books */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">我的收藏</h4>
            {favoriteBooks.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                还没有收藏任何书籍，快去发现好书吧！
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteBooks.map(book => book && (
                  <div key={book.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 truncate">{book.title}</h5>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-gray-500">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reading History */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">阅读历史</h4>
            {user.readingHistory.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                还没有阅读记录，开始你的阅读之旅吧！
              </p>
            ) : (
              <div className="space-y-3">
                {user.readingHistory.map(record => {
                  const book = getBookById(record.bookId);
                  if (!book) return null;
                  
                  return (
                    <div key={record.bookId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{book.title}</h5>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>开始：{record.startDate.toLocaleDateString('zh-CN')}</span>
                          <span>最近：{record.lastReadDate.toLocaleDateString('zh-CN')}</span>
                          <span>进度：{record.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${record.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;