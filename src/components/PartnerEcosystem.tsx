import { partners, coreMessages } from '../data/platformData';

const typeColors: Record<string, string> = {
  '居家护理': 'bg-blue-100 text-blue-700 border-blue-200',
  '康复机构': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  '陪诊服务': 'bg-amber-100 text-amber-700 border-amber-200',
  '社区养老': 'bg-violet-100 text-violet-700 border-violet-200',
  '养老机构': 'bg-rose-100 text-rose-700 border-rose-200',
  '适老化改造': 'bg-teal-100 text-teal-700 border-teal-200',
  '社区助餐': 'bg-orange-100 text-orange-700 border-orange-200',
  '社区医疗': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  '护理站': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  '心理健康': 'bg-pink-100 text-pink-700 border-pink-200',
};

export default function PartnerEcosystem() {
  return (
    <section id="partners" className="bg-slate-50">
      <div className="section-container">
        <h2 className="section-title">合作机构生态</h2>
        <p className="section-subtitle">
          厦门银行整合多类养老服务机构，为客户提供一站式服务入口
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {partners.map((p) => (
            <div key={p.id} className="card border border-gray-100 hover:border-blue-200 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${typeColors[p.type] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {p.type}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{p.name}</h4>
              <p className="text-xs text-gray-400 mb-2">{p.location}</p>
              <div className="flex flex-wrap gap-1">
                {p.services.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bank's role */}
        <div className="card bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🏦</span>
            <h3 className="text-xl font-bold text-gray-900">银行的角色</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
            {coreMessages.compliance2}
          </p>
        </div>
      </div>
    </section>
  );
}
