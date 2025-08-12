import { useState, useCallback } from 'react';
import { ChatMessage, ChatSession } from '../types';
import { useAuth } from '../context/AuthContext';

export const useChat = (bookId: string, authorName: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const { user } = useAuth();

  const generateAuthorResponse = async (userMessage: string, bookId: string, authorName: string): Promise<string> => {
    // 模拟AI响应生成
    const responses = [
      `感谢您对《${userMessage}》的提问！这确实是一个值得深思的问题。根据我在书中的观点...`,
      `您提出了一个非常有见地的观点。在我的研究中，我发现...`,
      `这个问题让我想起了书中第三章的内容。我认为...`,
      `从我的角度来看，这个问题的核心在于...`,
      `您的思考很有深度。让我从另一个角度来解释...`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!user || !content.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      bookId,
      authorName,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 模拟AI响应延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const authorResponse = await generateAuthorResponse(content, bookId, authorName);
      
      const authorMessage: ChatMessage = {
        id: `msg_${Date.now()}_author`,
        content: authorResponse,
        sender: 'author',
        timestamp: new Date(),
        bookId,
        authorName,
      };

      setMessages(prev => [...prev, authorMessage]);
      
      // 保存到本地存储
      const session: ChatSession = {
        id: sessionId || `chat_${Date.now()}`,
        bookId,
        authorName,
        title: `与${authorName}的对话`,
        messages: [...messages, userMessage, authorMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const savedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
      const existingIndex = savedSessions.findIndex((s: ChatSession) => s.id === session.id);
      
      if (existingIndex >= 0) {
        savedSessions[existingIndex] = session;
      } else {
        savedSessions.push(session);
        setSessionId(session.id);
      }
      
      localStorage.setItem('chatSessions', JSON.stringify(savedSessions));
      
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, bookId, authorName, messages, sessionId]);

  const rateMessage = useCallback((messageId: string, rating: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  }, []);

  const loadChatHistory = useCallback((sessionId: string) => {
    const savedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
    const session = savedSessions.find((s: ChatSession) => s.id === sessionId);
    
    if (session) {
      setMessages(session.messages);
      setSessionId(session.id);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    rateMessage,
    loadChatHistory,
  };
};