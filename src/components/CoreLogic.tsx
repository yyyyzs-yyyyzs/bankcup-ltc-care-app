const steps = [
  {
    icon: '📝',
    title: '老人基础信息录入',
    desc: '年龄、居住情况、养老金、支出等',
    color: 'border-primary-400 bg-primary-50',
  },
  {
    icon: '🔍',
    title: '长护险资格预评估',
    desc: '从日常生活能力、认知能力等方面判断',
    color: 'border-primary-500 bg-primary-100',
  },
  {
    icon: '⚖️',
    title: '判断是否符合长护险',
    desc: '根据评分判定可能结果',
    color: 'border-warm-400 bg-warm-50',
  },
  {
    icon: '📋',
    title: '符合 → 提供申请指引',
    desc: '准备材料、了解流程、对接经办机构',
    color: 'border-care-400 bg-care-50',
  },
  {
    icon: '🔄',
    title: '暂未达到门槛 → 服务匹配',
    desc: '有照护需求但未达长护险标准',
    color: 'border-warm-500 bg-warm-100',
  },
  {
    icon: '💰',
    title: '计算可支配养老预算',
    desc: '养老金 + 子女支持 - 生活支出 - 医疗支出',
    color: 'border-primary-500 bg-primary-100',
  },
  {
    icon: '🎯',
    title: '照护等级 + 收入 → 推荐方案',
    desc: '根据需求和预算精准匹配服务',
    color: 'border-care-500 bg-care-100',
  },
  {
    icon: '📊',
    title: '展示推荐与动态调整',
    desc: '推荐理由、费用、补贴建议、动态管理',
    color: 'border-primary-600 bg-primary-200',
  },
];

export default function CoreLogic() {
  return (
    <section id="core-logic" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">四、核心逻辑</h2>
        <p className="section-subtitle">
          从评估到推荐，构建"评估—分流—测算—推荐—持续管理"一站式流程
        </p>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-8 gap-3 mb-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className={`card !p-4 !rounded-xl !border-2 ${step.color} h-full`}>
                  <span className="text-3xl block mb-2">{step.icon}</span>
                  <h4 className="text-sm font-bold text-gray-800 mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <span className="text-xl text-primary-400">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical timeline */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 ${step.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-primary-200 my-1" />
                  )}
                </div>
                <div className="card !p-4 flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key principles */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '✅', text: '符合长护险条件 → 提供申请指引', color: 'border-care-500 bg-care-50' },
            { icon: '🔄', text: '不符合但有需求 → 进入服务匹配', color: 'border-warm-500 bg-warm-50' },
            { icon: '🎯', text: '照护等级 + 可支配收入 = 推荐方案', color: 'border-primary-500 bg-primary-50' },
            { icon: '🔗', text: '长护险内衔接，长护险外补充', color: 'border-primary-600 bg-primary-100' },
          ].map((item, i) => (
            <div key={i} className={`card !border-l-4 ${item.color} !py-4`}>
              <p className="text-body font-bold text-gray-800">
                <span className="mr-2">{item.icon}</span>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
