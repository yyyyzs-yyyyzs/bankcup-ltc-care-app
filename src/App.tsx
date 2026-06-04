import { useState, useCallback } from 'react';
import type { AssessmentOutput } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import MainlandStatus from './components/MainlandStatus';
import TaiwanExperience from './components/TaiwanExperience';
import TaiwanABCModel from './components/TaiwanABCModel';
import CoreLogic from './components/CoreLogic';
import AppModules from './components/AppModules';
import AssessmentForm from './components/AssessmentForm';
import AssessmentResult from './components/AssessmentResult';
import ServiceRecommendation from './components/ServiceRecommendation';
import ServiceGrid from './components/ServiceGrid';
import ServiceClosureFlow from './components/ServiceClosureFlow';
import MealCompanion from './components/MealCompanion';
import MedicalEscort from './components/MedicalEscort';
import RespiteCare from './components/RespiteCare';
import FamilyMonitor from './components/FamilyMonitor';
import ADLsAssessment from './components/ADLsAssessment';
import ServiceProviderDirectory from './components/ServiceProviderDirectory';
import VirtualCareAdvisor from './components/VirtualCareAdvisor';
import PensionCalculator from './components/PensionCalculator';
import BankPensionProducts from './components/BankPensionProducts';
import InternationalComparison from './components/InternationalComparison';
import APIIntegrationPanel from './components/APIIntegrationPanel';
import KnowledgeBase from './components/KnowledgeBase';
import ProfileBindingPanel from './components/ProfileBindingPanel';
import Innovation from './components/Innovation';
import FinancialModel from './components/FinancialModel';
import FinalSummary from './components/FinalSummary';
import Footer from './components/Footer';
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
    const el = document.getElementById('recommendation');
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  // ======== 子女端 ========
  if (portalMode === 'children') {
    return <ChildrenPortal onSwitchToElderly={() => setPortalMode('elderly')} />;
  }

  // ======== 老人端 ========
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Portal mode switcher */}
      <div className="fixed top-20 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={() => setPortalMode('children')}
          className="card !p-3 !rounded-xl shadow-lg flex items-center gap-2 text-sm font-bold text-primary-700 hover:shadow-xl transition-all hover:scale-105 bg-white border-2 border-primary-200"
          title="切换到子女端"
        >
          <span className="text-xl">👨‍👩‍👧</span>
          <span className="hidden sm:inline">子女端</span>
        </button>
      </div>

      {/* Floating profile button */}
      <button
        onClick={() => setShowProfile(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
        title="绑定用户信息"
      >
        👤
      </button>

      {/* ======== 方案展示区 ======== */}
      <Hero />
      <PainPoints />
      <MainlandStatus />
      <TaiwanExperience />
      <TaiwanABCModel />
      <CoreLogic />
      <AppModules />

      {/* ======== 评估体验区 ======== */}
      <AssessmentForm onResult={handleResult} />
      {assessmentResult && (
        <div className="bg-blue-gray-50 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AssessmentResult
              result={assessmentResult}
              onViewRecommendation={handleViewRecommendation}
            />
          </div>
        </div>
      )}

      {/* ======== 服务推荐区 ======== */}
      <ServiceRecommendation activeTier={assessmentResult?.recommendedTier ?? null} assessmentResult={assessmentResult} />
      <ServiceGrid />
      <ServiceClosureFlow />

      {/* ======== 核心服务模块区 ======== */}
      <MealCompanion />
      <MedicalEscort />
      <RespiteCare />
      <FamilyMonitor />

      {/* ======== 评估工具区 ======== */}
      <ADLsAssessment />
      <ServiceProviderDirectory />
      <VirtualCareAdvisor />

      {/* ======== 金融服务区 ======== */}
      <PensionCalculator />
      <BankPensionProducts />

      {/* ======== 知识参考区 ======== */}
      <InternationalComparison />
      <APIIntegrationPanel />
      <KnowledgeBase />

      {/* ======== 收尾区 ======== */}
      <Innovation />
      <FinancialModel />
      <FinalSummary />
      <Footer />

      {/* Profile binding panel */}
      <ProfileBindingPanel isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}
