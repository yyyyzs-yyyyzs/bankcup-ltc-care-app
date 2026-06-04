import { useState, useCallback } from 'react';
import type { AssessmentOutput } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import PlatformFlow from './components/PlatformFlow';
import AssessmentFlowSection from './components/AssessmentFlowSection';
import AssessmentForm from './components/AssessmentForm';
import AssessmentResult from './components/AssessmentResult';
import ServiceRecommendation from './components/ServiceRecommendation';
import ServiceModulesSection from './components/ServiceModulesSection';
import BankTiersSection, { ChildrenMonitorDashboard, ComplianceSection } from './components/BankTiersSection';
import PartnerEcosystem from './components/PartnerEcosystem';
import InnovationSection from './components/InnovationSection';
import Footer from './components/Footer';
import ProfileBindingPanel from './components/ProfileBindingPanel';
import ChildrenPortal from './components/ChildrenPortal';

type PortalMode = 'elderly' | 'children';

export default function App() {
  const [assessmentResult, setAssessmentResult] = useState<AssessmentOutput | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [portalMode, setPortalMode] = useState<PortalMode>('elderly');

  const handleResult = useCallback((result: AssessmentOutput) => {
    setAssessmentResult(result);
  }, []);

  const handleViewRecommendation = useCallback(() => {
    const el = document.getElementById('service-modules');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  if (portalMode === 'children') {
    return <ChildrenPortal onSwitchToElderly={() => setPortalMode('elderly')} />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Portal mode switcher */}
      <div className="fixed top-20 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={() => setPortalMode('children')}
          className="card !p-3 !rounded-xl shadow-lg flex items-center gap-2 text-sm font-bold text-blue-700 hover:shadow-xl transition-all hover:scale-105 bg-white border-2 border-blue-200"
          title="切换到子女端"
        >
          <span className="text-xl">👨‍👩‍👧</span>
          <span className="hidden sm:inline">子女端</span>
        </button>
      </div>

      {/* Floating profile button */}
      <button
        onClick={() => setShowProfile(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
        title="绑定用户信息"
      >
        👤
      </button>

      {/* ======== 首页 ======== */}
      <Hero />

      {/* ======== 痛点分析 ======== */}
      <PainPoints />

      {/* ======== 平台流程 ======== */}
      <PlatformFlow />

      {/* ======== 身体评估 ======== */}
      <AssessmentFlowSection />

      {/* ======== 专业评估表单（演示用） ======== */}
      <AssessmentForm onResult={handleResult} />

      {assessmentResult && (
        <div className="bg-slate-50 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AssessmentResult
              result={assessmentResult}
              onViewRecommendation={handleViewRecommendation}
            />
          </div>
        </div>
      )}

      {/* ======== 基于评估的服务推荐 ======== */}
      <ServiceRecommendation
        activeTier={assessmentResult?.recommendedTier ?? null}
        assessmentResult={assessmentResult}
      />

      {/* ======== 八大服务板块 ======== */}
      <ServiceModulesSection />

      {/* ======== 银行客户权益 + 服务流水 ======== */}
      <BankTiersSection />

      {/* ======== 子女端家庭监管 ======== */}
      <ChildrenMonitorDashboard />

      {/* ======== 合作机构生态 ======== */}
      <PartnerEcosystem />

      {/* ======== 创新点总结 ======== */}
      <InnovationSection />

      {/* ======== 合规说明 ======== */}
      <ComplianceSection />

      {/* ======== 页脚 ======== */}
      <Footer />

      {/* Profile binding panel */}
      <ProfileBindingPanel isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}
