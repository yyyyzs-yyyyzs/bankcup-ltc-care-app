export type TabKey = 'home' | 'services' | 'family' | 'my';

interface Props {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const tabs: { key: TabKey; icon: string; label: string; activeIcon: string }[] = [
  { key: 'home', icon: '💬', activeIcon: '💬', label: '首页' },
  { key: 'services', icon: '🏠', activeIcon: '🏠', label: '服务' },
  { key: 'family', icon: '👨‍👩‍👧', activeIcon: '👨‍👩‍👧', label: '家庭监管' },
  { key: 'my', icon: '👤', activeIcon: '👤', label: '我的' },
];

export default function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors active:scale-95 ${
              activeTab === tab.key ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span className={`text-xs font-medium ${activeTab === tab.key ? 'font-bold' : ''}`}>
              {tab.label}
            </span>
            {activeTab === tab.key && (
              <span className="absolute top-0 w-8 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
