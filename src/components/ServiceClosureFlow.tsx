const steps = [
  {
    icon: '🔍',
    title: '需求发现',
    desc: '预评估 → 了解照护需求和风险等级',
    color: 'bg-primary-50 border-primary-300',
  },
  {
    icon: '📋',
    title: '政策匹配',
    desc: '长护险资格 → 补贴政策 → 商业保险',
    color: 'bg-care-50 border-care-300',
  },
  {
    icon: '💰',
    title: '预算测算',
    desc: '收入评估 → 费用估算 → 支付方案',
    color: 'bg-warm-50 border-warm-300',
  },
  {
    icon: '🏥',
    title: '服务匹配',
    desc: '需求分层 → 服务推荐 → 机构筛选',
    color: 'bg-purple-50 border-purple-300',
  },
  {
    icon: '📝',
    title: '预约对接',
    desc: '预约服务 → 机构确认 → 方案沟通',
    color: 'bg-blue-50 border-blue-300',
  },
  {
    icon: '🤝',
    title: '服务落地',
    desc: '签订协议 → 服务执行 → 持续管理',
    color: 'bg-care-50 border-care-300',
  },
  {
    icon: '🔄',
    title: '动态调整',
    desc: '定期评估 → 方案优化 → 长期跟踪',
    color: 'bg-warm-50 border-warm-300',
  },
];

export default function ServiceClosureFlow() {
  return (
    <section id="service-flow" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">服务闭环：从推荐到落地的完整流程</h2>
        <p className="section-subtitle">
          不只是推荐服务，更帮助老人和子女走完"发现需求 → 匹配服务 → 对接落地 → 持续管理"的全程
        </p>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start justify-between gap-3 mt-10">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex flex-col items-center text-center ${step.color} border-2 rounded-2xl p-4 w-36 min-h-[160px]`}>
                <span className="text-3xl mb-2">{step.icon}</span>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="text-2xl text-gray-300 mx-1 flex-shrink-0">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden mt-8 space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${step.color} border-2`}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
              </div>
              <div className="flex-1 pb-2">
                <h4 className="font-bold text-gray-800">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 italic mt-8 text-center">
          以上流程为比赛方案展示的参考逻辑，实际服务闭环需依托政府养老服务平台的正式流程和政策规定执行。
          本页面不保证任何服务能够成功申请、报销或上门。
        </p>
      </div>
    </section>
  );
}
