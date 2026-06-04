import { useState, useEffect, useMemo } from 'react';
import type { ServiceDetail } from '../types/service';
import type { RecommendOutput } from '../types/service';
import { recommendProviders } from '../utils/recommendProviders';
import { getUserLocation, scatterNearby } from '../utils/geo';
import type { UserLocation } from '../utils/geo';
import ProviderCard from './ProviderCard';
import NearbyProviderMap from './NearbyProviderMap';
import BookingForm from './BookingForm';

interface Props {
  service: ServiceDetail;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'detail' | 'providers' | 'booking'>('detail');
  const [recommendOutput, setRecommendOutput] = useState<RecommendOutput | null>(null);
  const [userLoc, setUserLoc] = useState<UserLocation | null>(null);

  useEffect(() => {
    getUserLocation().then(setUserLoc);
  }, []);

  const positionedOutput = useMemo(() => {
    if (!recommendOutput) return null;
    if (!userLoc || userLoc.source === 'fallback') return recommendOutput;
    return {
      ...recommendOutput,
      providers: scatterNearby(recommendOutput.providers, userLoc.lng, userLoc.lat),
    };
  }, [recommendOutput, userLoc]);

  const handleFindProviders = () => {
    const result = recommendProviders({ serviceType: service.id });
    setRecommendOutput(result);
    setActiveTab('providers');
  };

  const handleBooking = () => {
    setActiveTab('booking');
  };

  const categoryLabel =
    service.category === 'community' ? '社区服务' : service.category === 'home' ? '居家服务' : '专业照护';

  const tagColors: Record<string, string> = {
    '支持长护险衔接': 'bg-blue-100 text-blue-700',
    '支持补贴咨询': 'bg-care-100 text-care-700',
    '可上门': 'bg-warm-100 text-warm-700',
    '需资质机构': 'bg-purple-100 text-purple-700',
    '适合独居老人': 'bg-orange-100 text-orange-700',
    '社区资源': 'bg-green-100 text-green-700',
    '需子女确认': 'bg-yellow-100 text-yellow-700',
    '专业医疗': 'bg-red-100 text-red-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h2 className="text-heading font-bold text-gray-900">{service.name}</h2>
                <span className="text-sm text-gray-400">{categoryLabel}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-2">
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-3">
            {(['detail', 'providers', 'booking'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === 'detail' ? '服务详情' : tab === 'providers' ? '附近推荐' : '预约服务'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {activeTab === 'detail' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">服务介绍</h3>
                <p className="text-body text-gray-600 leading-relaxed">{service.fullDesc}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-full text-sm ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-1">适合人群</h4>
                  <ul className="text-body text-gray-600 space-y-1">
                    {service.suitableFor.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary-500 mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-1">具体服务项目</h4>
                  <ul className="text-body text-gray-600 space-y-1">
                    {service.specificServices.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-care-500 mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-2">
                  <span className="text-warm-600">💰</span> 费用参考与支付建议
                </h4>
                <p className="text-body text-gray-700">
                  <strong>参考费用：</strong>
                  {service.estimatedCost}
                </p>
                <p className="text-body text-gray-600 mt-1">{service.paymentAdvice}</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-bold text-red-700 mb-1">⚠️ 风险提示</h4>
                <p className="text-body text-gray-700">{service.riskNote}</p>
              </div>

              <div className="bg-blue-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-1">服务提供方类型</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {service.providerTypes.map((pt, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-400 italic">
                本页面为比赛演示原型，所有费用为参考区间，实际费用以当地服务提供方报价和政府部门最新政策为准。预评估结果不代替政府部门或医保经办机构的正式评定。
              </p>
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">附近服务提供方参考</h3>
                <button
                  onClick={handleFindProviders}
                  className="btn btn-primary text-sm"
                >
                  刷新推荐
                </button>
              </div>

              {recommendOutput && positionedOutput ? (
                <>
                  <NearbyProviderMap providers={positionedOutput.providers} userLocation={userLoc} />
                  <p className="text-body text-gray-600 bg-blue-gray-50 rounded-xl p-3">
                    {recommendOutput.reason}
                  </p>
                  {recommendOutput.suggestLTC && (
                    <p className="text-sm text-primary-600 bg-primary-50 rounded-lg p-3">
                      建议：部分推荐机构支持长护险结算，您可先尝试长护险预评估以确定资格。
                    </p>
                  )}
                  {recommendOutput.suggestSubsidy && (
                    <p className="text-sm text-care-600 bg-care-50 rounded-lg p-3">
                      提示：部分机构支持政府补贴咨询，建议联系机构了解具体补贴政策。
                    </p>
                  )}
                  {recommendOutput.suggestInsuranceOrChildPay && (
                    <p className="text-sm text-warm-600 bg-warm-50 rounded-lg p-3">
                      提示：预算偏紧，建议考虑商业护理险补充，或与子女协商费用分摊。
                    </p>
                  )}
                  <div className="space-y-3">
                    {positionedOutput.providers.map((p) => (
                      <ProviderCard key={p.id} provider={p} onBook={handleBooking} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-3">📍</p>
                  <p>点击"刷新推荐"查看附近服务提供方参考</p>
                </div>
              )}
              <p className="text-xs text-gray-400 italic">
                以上服务提供方信息为演示数据，仅用于展示匹配逻辑。距离、评分、价格等为模拟值，不构成推荐建议。
              </p>
            </div>
          )}

          {activeTab === 'booking' && (
            <BookingForm
              serviceType={service.id}
              serviceName={service.name}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
