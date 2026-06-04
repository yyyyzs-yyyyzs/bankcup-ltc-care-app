import { taiwanHighlights } from '../data/mockData';

export default function TaiwanExperience() {
  return (
    <section id="taiwan" className="bg-gradient-to-b from-care-50/50 to-white">
      <div className="section-container">
        <h2 className="section-title">三、借鉴台湾的方面</h2>
        <p className="section-subtitle">
          我们主要借鉴台湾长期照护体系中的服务组织思路，而不是照搬台湾制度
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {taiwanHighlights.map((item, i) => (
            <div key={i} className="card !border !border-care-200 hover:!border-care-400">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-card-title font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-body text-gray-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 highlight-box highlight-green">
          <p className="text-body text-care-800">
            <span className="font-bold">借鉴要点：</span>
            台湾长照体系的核心经验在于"先评估、后匹配、分层服务、持续管理"，这与大陆长护险制度的支付优势相结合，可以构建一个更完整的养老服务平台。
          </p>
        </div>
      </div>
    </section>
  );
}
