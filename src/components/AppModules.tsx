const modules = [
  {
    num: '01',
    icon: '📝',
    title: '老人基础信息录入',
    color: 'border-primary-400',
    bg: 'bg-primary-50',
    content: '填写年龄、城市、居住情况、是否独居、子女是否同城、医保/长护险参保情况、养老偏好等。',
  },
  {
    num: '02',
    icon: '🔍',
    title: '长护险资格预评估',
    color: 'border-warm-400',
    bg: 'bg-warm-50',
    content: '参考失能评估逻辑，从日常生活能力、认知能力、沟通能力等方面判断老人是否可能符合长护险申请条件。输出包括：可能符合长护险 / 暂未达到门槛但存在照护需求 / 基本自理，仅需预防性服务。',
  },
  {
    num: '03',
    icon: '💰',
    title: '可支配收入测算',
    color: 'border-primary-500',
    bg: 'bg-primary-100',
    content: '计算老人每月真正可用于养老服务的金额。',
    formula: '可支配养老服务预算 = 月养老金 + 子女支持 + 补贴/保险金 − 基本生活支出 − 医疗药品支出 − 其他固定支出',
  },
  {
    num: '04',
    icon: '🎯',
    title: '养老服务智能推荐',
    color: 'border-care-400',
    bg: 'bg-care-50',
    content: '根据"照护需求等级 + 可支配收入"推荐服务组合。',
    services: '社区助餐 · 助洁助浴 · 陪诊服务 · 日间照料 · 上门护理 · 康复训练 · 适老化改造 · 护理型机构',
  },
  {
    num: '05',
    icon: '📊',
    title: '推荐方案展示',
    color: 'border-warm-500',
    bg: 'bg-warm-100',
    content: '展示推荐理由、预计月费用、是否超过预算、是否建议申请长护险、是否建议申请补贴等。',
  },
];

export default function AppModules() {
  return (
    <section id="app-modules" className="bg-blue-gray-50">
      <div className="section-container">
        <h2 className="section-title">五、App 主要模块</h2>
        <p className="section-subtitle">
          五大核心模块，覆盖从信息录入到方案推荐的完整流程
        </p>

        <div className="space-y-6">
          {modules.map((mod, i) => (
            <div key={i} className={`card !border-l-4 ${mod.color}`}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className={`flex items-center gap-3 flex-shrink-0 min-w-[200px]`}>
                  <span className={`text-3xl ${mod.bg} rounded-xl w-14 h-14 flex items-center justify-center`}>
                    {mod.icon}
                  </span>
                  <div>
                    <span className="text-xs text-gray-400 font-bold">{mod.num}</span>
                    <h3 className="text-card-title font-bold text-gray-900">{mod.title}</h3>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-body text-gray-700 mb-3">{mod.content}</p>
                  {mod.formula && (
                    <div className="bg-primary-50 rounded-xl p-4 text-sm text-primary-800 font-medium">
                      {mod.formula}
                    </div>
                  )}
                  {mod.services && (
                    <div className="bg-care-50 rounded-xl p-4">
                      <span className="text-sm text-care-700 font-medium">{mod.services}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
