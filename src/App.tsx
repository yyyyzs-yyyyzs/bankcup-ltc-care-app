import { useState } from 'react';
import BottomNav from './components/BottomNav';
import type { TabKey } from './components/BottomNav';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import FamilyPage from './pages/FamilyPage';
import MyPage from './pages/MyPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'family':
        return <FamilyPage />;
      case 'my':
        return <MyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-gray-50 max-w-lg mx-auto relative overflow-hidden shadow-2xl">
      {/* Page content */}
      <div className="flex-1 overflow-hidden">
        {renderPage()}
      </div>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
