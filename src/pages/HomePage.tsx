import ChatBot from '../components/ChatBot';
import { currentElderly } from '../data/appData';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-bold text-gray-900">银龄服务</h1>
            <p className="text-xs text-gray-400">厦门银行 · 养老金融服务平台</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <span className="text-lg">{currentElderly.avatar}</span>
            <span className="text-sm font-bold text-blue-700">{currentElderly.name}</span>
          </div>
        </div>
        {/* Quick stats */}
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            评估等级：{currentElderly.assessmentLevel.split('—')[0].trim()}
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            已预约：2项服务
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="flex-1 overflow-hidden">
        <ChatBot />
      </div>
    </div>
  );
}
