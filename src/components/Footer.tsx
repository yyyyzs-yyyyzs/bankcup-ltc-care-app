import { complianceNotices } from '../data/platformData';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="section-container !py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-amber-400">厦门银行银龄服务平台</h3>
            <p className="text-blue-100/60 text-sm leading-relaxed">
              基于个人养老金账户与银行客户权益的养老服务预约、优惠与家庭监管平台。
              <br /><br />
              让养老金融不止于存钱，更连接真实养老服务。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">快速导航</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'pain-points', label: '痛点分析' },
                { id: 'platform-flow', label: '服务流程' },
                { id: 'assessment-flow', label: '上门评估' },
                { id: 'service-modules', label: '八大板块' },
                { id: 'bank-tiers', label: '客户权益' },
                { id: 'children-monitor', label: '子女监管' },
                { id: 'innovation', label: '创新点' },
                { id: 'compliance', label: '合规说明' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-blue-100/50 hover:text-amber-400 text-sm text-left transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">重要声明</h3>
            <ul className="text-blue-100/50 text-sm space-y-2 leading-relaxed">
              {complianceNotices.map((n, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">⚠️</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-blue-200/30 text-sm">
          <p>厦门银行银龄服务平台 · 2026厦门银行杯金融创新创意比赛展示项目</p>
          <p className="mt-1">本项目为创新方案展示原型，不构成任何形式的服务承诺或政策解读。</p>
        </div>
      </div>
    </footer>
  );
}
