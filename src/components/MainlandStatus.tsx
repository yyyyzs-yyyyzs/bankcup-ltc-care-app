import { mainlandFacts } from '../data/mockData';

export default function MainlandStatus() {
  return (
    <section id="mainland" className="bg-blue-gray-50">
      <div className="section-container">
        <h2 className="section-title">二、大陆现状</h2>
        <p className="section-subtitle">
          基于已有长期护理保险制度基础，识别当前服务覆盖的边界与延伸空间
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="card !border-l-4 !border-l-care-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✅</span>
              <h3 className="text-card-title font-bold text-gray-900">已有制度基础</h3>
            </div>
            <ul className="space-y-4">
              {mainlandFacts.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-care-500 mt-1 flex-shrink-0">●</span>
                  <span className="text-body text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}
          <div className="card !border-l-4 !border-l-warm-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔍</span>
              <h3 className="text-card-title font-bold text-gray-900">当前仍存在的边界</h3>
            </div>
            <ul className="space-y-4">
              {mainlandFacts.gaps.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-warm-500 mt-1 flex-shrink-0">●</span>
                  <span className="text-body text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 card !bg-blue-gray-100 text-center">
          <p className="text-body text-gray-700">
            <span className="font-bold text-primary-700">核心洞察：</span>
            当前长护险制度偏向"支付"而非"服务匹配"，长护险之外的养老服务选择缺少统一入口。
            <br />
            这为构建"评估—分流—测算—推荐—持续管理"的一站式平台提供了明确的空间。
          </p>
        </div>
      </div>
    </section>
  );
}
