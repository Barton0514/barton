import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Star, ThumbsUp, ThumbsDown, Download, MoreVertical } from 'lucide-react';
import { Book, ChatMessage } from '../types';
import { useChat } from '../hooks/useChat';

interface ChatInterfaceProps {
  book: Book;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ book, onBack }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { messages, isLoading, sendMessage, rateMessage } = useChat(book.id, book.author);

  const maxChars = 500;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage);
    setInputMessage('');
    setCharCount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInputMessage(value);
      setCharCount(value.length);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleRate = (messageId: string, rating: number) => {
    rateMessage(messageId, rating);
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.sender === 'user' ? '用户' : book.author}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `与${book.author}的对话.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {book.author.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{book.author}</h2>
              <p className="text-sm text-gray-600">《{book.title}》作者</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={exportChat}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              {book.author.charAt(0)}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              开始与{book.author}对话
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              你可以询问关于《{book.title}》的任何问题，或者与作者探讨书中的观点和思想。
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
              </div>
              
              <div className={`flex items-center mt-2 text-xs text-gray-500 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                <span>
                  {message.timestamp.toLocaleTimeString('zh-CN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                
                {message.sender === 'author' && (
                  <div className="flex items-center space-x-2 ml-3">
                    <button
                      onClick={() => handleRate(message.id, 5)}
                      className={`p-1 rounded-full transition-colors ${
                        message.rating === 5
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-400 hover:text-green-600'
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleRate(message.id, 1)}
                      className={`p-1 rounded-full transition-colors ${
                        message.rating === 1
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-400 hover:text-red-600'
                      }`}
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {message.sender === 'author' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                {book.author.charAt(0)}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
              {book.author.charAt(0)}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t px-6 py-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="输入你想问的问题..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                }}
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {charCount}/{maxChars}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading || charCount > maxChars}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-2xl transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        
        <div className="mt-2 text-xs text-gray-500 flex justify-between">
          <span>按Enter发送，Shift+Enter换行</span>
          {charCount > maxChars * 0.8 && (
            <span className={charCount > maxChars ? 'text-red-500' : 'text-orange-500'}>
              字数限制：{charCount}/{maxChars}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;