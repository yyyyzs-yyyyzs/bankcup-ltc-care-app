const stakeholders = [
  {
    title: '老人 / 子女',
    icon: '👴👵',
    items: ['了解照护需求', '预评估长护险资格', '测算养老预算', '匹配养老服务'],
    color: 'border-warm-400 bg-warm-50',
    position: 'top',
  },
  {
    title: '银行 / 保险机构',
    icon: '🏦',
    items: ['养老账户管理', '养老金支付', '商业护理险适配', '补贴发放服务'],
    color: 'border-primary-400 bg-primary-50',
    position: 'right',
  },
  {
    title: '养老服务机构',
    icon: '🏥',
    items: ['提供养老服务', '费用透明展示', '服务质量评估', '动态需求对接'],
    color: 'border-care-400 bg-care-50',
    position: 'bottom',
  },
  {
    title: '政府 / 社区',
    icon: '🏛️',
    items: ['长护险制度管理', '补贴政策发布', '养老服务监管', '社区资源协调'],
    color: 'border-primary-500 bg-primary-100',
    position: 'left',
  },
];

const financePoints = [
  {
    icon: '🏦',
    title: '长护险属于养老金融体系',
    desc: '长护险本身属于养老金融与社会保险支付体系的重要组成部分，App 帮助老人判断是否可能进入长护险支付体系。',
  },
  {
    icon: '💰',
    title: '收入分层推荐可负担服务',
    desc: '对未达长护险门槛的人群，App 根据可支配收入推荐可负担的养老服务，实现"需求—预算—服务"的精准匹配。',
  },
  {
    icon: '🔗',
    title: '连接多方金融服务主体',
    desc: '平台可以连接银行、保险、养老服务机构、社区和家庭，形成多方协同的养老服务生态。',
  },
  {
    icon: '🏦',
    title: '银行可拓展养老金融服务',
    desc: '银行可围绕养老账户、养老金管理、养老服务支付、补贴发放、家庭子女支持账户等场景拓展服务。',
  },
  {
    icon: '🛡️',
    title: '保险机构可适配产品',
    desc: '保险机构可围绕商业护理险、补充医疗险、长期照护产品进行适配，形成多层次保障。',
  },
  {
    icon: '🌐',
    title: '构建养老金融生态',
    desc: '最终形成"保险保障 + 支付管理 + 服务匹配 + 风险预防"的养老金融生态闭环。',
  },
];

export default function FinancialModel() {
  return (
    <section id="financial" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">十、金融服务模式体现在哪里？</h2>
        <p className="section-subtitle">
          本项目不只是养老服务推荐工具，更是一个养老金融服务创新方案
        </p>

        {/* Financial points grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {financePoints.map((point, i) => (
            <div key={i} className="card group">
              <span className="text-3xl block mb-3">{point.icon}</span>
              <h3 className="text-card-title font-bold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-body text-gray-600">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Four-party coordination diagram */}
        <div className="card !bg-blue-gray-50 !shadow-soft">
          <h3 className="text-card-title font-bold text-gray-900 text-center mb-8">四方协同 · 养老金融生态</h3>

          <div className="relative max-w-lg mx-auto aspect-square flex items-center justify-center">
            {/* Center: App Platform */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="gradient-blue card !rounded-full !p-6 md:!p-8 text-center !shadow-card-hover">
                <span className="text-4xl block mb-2">📱</span>
                <p className="text-lg font-bold">App 平台</p>
                <p className="text-xs text-white/70">一站式养老服务匹配</p>
              </div>
            </div>

            {/* Top: Elderly/Family */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 card !p-3 md:!p-4 !rounded-xl text-center !shadow-soft border-t-4 border-warm-400">
              <span className="text-2xl block">👴👵</span>
              <p className="text-sm font-bold">老人/子女</p>
              <p className="text-xs text-gray-500">需求方</p>
            </div>

            {/* Right: Bank/Insurance */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 card !p-3 md:!p-4 !rounded-xl text-center !shadow-soft border-t-4 border-primary-400">
              <span className="text-2xl block">🏦</span>
              <p className="text-sm font-bold">银行/保险</p>
              <p className="text-xs text-gray-500">金融方</p>
            </div>

            {/* Bottom: Service Providers */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 card !p-3 md:!p-4 !rounded-xl text-center !shadow-soft border-t-4 border-care-400">
              <span className="text-2xl block">🏥</span>
              <p className="text-sm font-bold">服务机构</p>
              <p className="text-xs text-gray-500">服务方</p>
            </div>

            {/* Left: Government */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 card !p-3 md:!p-4 !rounded-xl text-center !shadow-soft border-t-4 border-primary-500">
              <span className="text-2xl block">🏛️</span>
              <p className="text-sm font-bold">政府/社区</p>
              <p className="text-xs text-gray-500">监管方</p>
            </div>

            {/* Connection lines (CSS approximation) */}
            <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full" />
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            四方协同，形成"保险保障 + 支付管理 + 服务匹配 + 风险预防"的养老金融生态
          </p>
        </div>

        {/* Mobile version - list style */}
        <div className="lg:hidden mt-6 space-y-4">
          {stakeholders.map((s, i) => (
            <div key={i} className={`card border-l-4 ${s.color}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{s.icon}</span>
                <h4 className="font-bold text-gray-900">{s.title}</h4>
              </div>
              <ul className="space-y-1">
                {s.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-gray-300">·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
