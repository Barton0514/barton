import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface DifyChatProps {
  difyUrl: string;
  onBack: () => void;
}

const DifyChat: React.FC<DifyChatProps> = ({ difyUrl, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回书籍列表</span>
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe 
            src={difyUrl} 
            className="w-full h-screen max-h-screen border-0"
            title="Dify Chat"
          />
        </div>
      </div>
    </div>
  );
};

export default DifyChat;