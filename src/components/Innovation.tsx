const innovations = [
  {
    num: '01',
    title: '服务对象创新',
    subtitle: '覆盖"未达门槛但已有需求"的群体',
    desc: '不是只服务已经达到长护险标准的老人，而是覆盖"未达长护险门槛但已有照护需求"的老人，填补制度与服务之间的空白地带。',
    gradient: 'gradient-blue',
  },
  {
    num: '02',
    title: '匹配逻辑创新',
    subtitle: '照护需求 + 可支配收入 = 精准匹配',
    desc: '不是单纯按身体状况推荐服务，而是结合照护需求等级与可支配收入进行分层匹配，确保推荐方案既满足需求也可负担。',
    gradient: 'gradient-warm',
  },
  {
    num: '03',
    title: '金融服务创新',
    subtitle: '构建养老金融服务闭环',
    desc: '把长护险、个人支付能力、家庭支持、补贴申请和养老服务消费连接起来，形成"保障—支付—服务—管理"的养老金融服务闭环。',
    gradient: 'gradient-blue',
  },
  {
    num: '04',
    title: '平台模式创新',
    subtitle: '从单一支付到一站式平台',
    desc: '从"单一支付制度"拓展为"评估—分流—测算—推荐—持续管理"的一站式平台，打通养老服务供需两端。',
    gradient: 'gradient-care',
  },
];

export default function Innovation() {
  return (
    <section id="innovation" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">九、项目创新点</h2>
        <p className="section-subtitle">
          四个维度的创新，构建差异化的养老金融服务方案
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {innovations.map((item, i) => (
            <div key={i} className={`card ${item.gradient} !text-white !shadow-card-hover`}>
              <span className="text-5xl font-bold opacity-30 block mb-2">{item.num}</span>
              <h3 className="text-card-title font-bold mb-1">{item.title}</h3>
              <p className="text-white/80 text-sm font-medium mb-3">{item.subtitle}</p>
              <p className="text-white/90 text-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
