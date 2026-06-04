import { useState } from 'react';

interface MealService {
  id: string;
  name: string;
  icon: string;
  desc: string;
  price: string;
  duration: string;
  suitable: string[];
  includes: string[];
}

const mealServices: MealService[] = [
  {
    id: 'basic-meal',
    name: '基础陪餐服务',
    icon: '🍽️',
    desc: '服务人员上门陪伴老人用餐，协助加热或简单烹饪，确保老人按时、安全用餐。同时观察老人进食情况，记录食欲变化和特殊需求。',
    price: '30-50 元 / 次',
    duration: '约 1 小时',
    suitable: ['独居老人', '轻度失能', '需要用餐陪伴', '食欲不振需关注'],
    includes: [
      '协助加热餐食或简单烹饪',
      '陪伴老人用餐并进行交流',
      '观察并记录进食量、食欲变化',
      '餐后简单清理',
      '提醒按时服药（如需要）',
      '异常情况即时反馈给家属',
    ],
  },
  {
    id: 'nutrition-meal',
    name: '营养配餐服务',
    icon: '🥗',
    desc: '由营养师定制每周营养菜单，服务人员按菜单准备食材并上门烹饪，确保老人获得均衡营养。适合有糖尿病、高血压等需要饮食管理的慢病老人。',
    price: '80-150 元 / 次',
    duration: '约 2 小时',
    suitable: ['慢病管理需求', '营养不均衡', '术后恢复期', '牙口不好需软食'],
    includes: [
      '营养师定制每周菜单',
      '新鲜食材代购配送（食材费另计）',
      '上门烹饪适口软硬度的饭菜',
      '分装存放，标注食用日期',
      '饮食建议与健康教育',
      '每周营养摄入评估报告',
    ],
  },
  {
    id: 'social-meal',
    name: '社交共餐服务',
    icon: '👥',
    desc: '组织2-4位同社区老人一起用餐，由服务人员主持，促进社交互动。可轮流在不同老人家中举办，也可在社区活动中心集中进行。',
    price: '20-35 元 / 人 / 次',
    duration: '约 1.5 小时',
    suitable: ['轻度孤独感', '社交需求强', '自理能力较好', '同社区有邻里基础'],
    includes: [
      '组织同社区2-4位老人共餐',
      '提供社交话题引导和活动组织',
      '监督每位老人的进食情况',
      '餐后简单娱乐活动（下棋、聊天等）',
      '活动照片分享给子女',
      '社区活动中心或居家轮流举办',
    ],
  },
  {
    id: 'full-meal',
    name: '全天饮食照护',
    icon: '🍳',
    desc: '服务人员全天分三个时段上门，负责早餐、午餐、晚餐的准备与陪伴，确保老人一日三餐规律、营养。适合需要全天照护但暂未入住机构的老人。',
    price: '200-350 元 / 天',
    duration: '全天（分三个时段）',
    suitable: ['中重度失能', '独居高风险', '术后短期照护', '认知障碍早期'],
    includes: [
      '早/中/晚三餐准备与陪伴',
      '间食点心/水果准备',
      '全天饮水量监控',
      '每餐进食情况详细记录',
      '与家庭医生/营养师沟通调整方案',
      '紧急情况即时处理与家属通报',
    ],
  },
];

const faqItems = [
  { q: '服务人员是否经过背景审查？', a: '所有服务人员均经过公安背景审查、健康体检、专业培训，持证上岗。平台定期进行服务质量抽查。' },
  { q: '如何保证食品安全？', a: '食材采购自正规商超或合作生鲜平台，保留购买凭证。服务人员持有健康证，严格遵守食品卫生操作规范。' },
  { q: '可以临时取消服务吗？', a: '提前2小时可免费取消；2小时内取消收取50%服务费；服务人员已到达则收取全额。特殊情况（如老人突发身体不适）免收取消费用。' },
  { q: '子女如何了解陪餐情况？', a: '每次服务完成后，服务人员在平台填报《陪餐记录》，包括进食量、情绪状态、异常情况等。关联的子女账号会收到推送通知。如发现异常，系统会立即短信/电话通知紧急联系人。' },
];

export default function MealCompanion() {
  const [selectedService, setSelectedService] = useState<string>('basic-meal');
  const [showBooking, setShowBooking] = useState(false);

  const current = mealServices.find((s) => s.id === selectedService)!;

  return (
    <section id="meal-companion" className="bg-gradient-to-b from-warm-50/50 to-white">
      <div className="section-container">
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">🍽️</span>
          <h2 className="section-title">上门陪餐服务</h2>
          <p className="section-subtitle">
            不只是"送饭"，更是有温度的陪伴。让每一餐都有人关心、有人记录、有人及时反馈。
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Service type tabs */}
          <div className="space-y-3">
            {mealServices.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`w-full text-left card border-2 transition-all duration-200 ${
                  selectedService === s.id
                    ? 'border-warm-500 bg-warm-50 shadow-card-hover scale-[1.02]'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{s.name}</h4>
                    <p className="text-sm text-warm-600 font-medium">{s.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Service detail */}
          <div className="lg:col-span-2 card border-2 border-warm-200 shadow-card-hover">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{current.icon}</span>
              <div>
                <h3 className="text-heading font-bold text-gray-900">{current.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>💰 {current.price}</span>
                  <span>⏱️ {current.duration}</span>
                </div>
              </div>
            </div>

            <p className="text-body-lg text-gray-700 mb-6 leading-relaxed">{current.desc}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-bold text-gray-900 mb-3 text-sm">✅ 服务内容</h5>
                <ul className="space-y-2">
                  {current.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-care-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 mb-3 text-sm">👤 适合人群</h5>
                <div className="flex flex-wrap gap-2">
                  {current.suitable.map((s) => (
                    <span key={s} className="inline-block bg-warm-50 text-warm-700 text-xs px-3 py-1 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowBooking(true)} className="btn btn-warm">
                📅 立即预约
              </button>
              <button className="btn btn-outline text-sm">
                📞 咨询客服
              </button>
            </div>
          </div>
        </div>

        {/* Booking form modal */}
        {showBooking && (
          <div className="mt-8 card border-2 border-warm-300 max-w-lg mx-auto shadow-card-hover animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-card-title font-bold text-gray-900">预约 {current.name}</h4>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">期望日期</label>
                <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-warm-400 outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">期望时间</label>
                <select className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-warm-400 outline-none">
                  <option>早餐时段 07:00-08:30</option>
                  <option>午餐时段 11:00-12:30</option>
                  <option>晚餐时段 17:00-18:30</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">服务地址</label>
                <input type="text" placeholder="请输入上门地址" className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-warm-400 outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">饮食偏好/忌口</label>
                <textarea rows={2} placeholder="如：不吃辣、低盐、糖尿病饮食..." className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-warm-400 outline-none" />
              </div>
              <div className="bg-warm-50 rounded-xl p-3 text-sm text-warm-700">
                <span className="font-bold">📱 通知机制：</span>预约确认后，关联的子女账号将收到短信提醒，服务完成后推送《陪餐记录》。
              </div>
              <button onClick={() => setShowBooking(false)} className="btn btn-warm w-full">
                提交预约（模拟演示）
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-heading font-bold text-center mb-6">常见问题</h3>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details key={i} className="card group cursor-pointer">
                <summary className="font-bold text-gray-900 text-body list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-body text-gray-600 leading-relaxed pt-3 border-t border-gray-100">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
