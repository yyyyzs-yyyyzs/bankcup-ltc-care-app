import { useState } from 'react';

const respiteServices = [
  {
    id: 'home-respite',
    icon: '🏠',
    title: '居家喘息服务',
    subtitle: '派员到府，在家休息也有人照顾',
    color: 'border-care-400 bg-care-50',
    price: '120-200 元 / 次（4小时）',
    desc: '专业照护员到老人家中替代家属进行照护，让家庭照顾者可以外出办事、休息放松或处理个人事务。最长可申请连续3天的居家喘息。',
    process: [
      '提前24小时预约 → 平台匹配合格照护员',
      '照护员按约定时间到府 → 交接照护注意事项',
      '照护员负责：陪伴、用餐协助、如厕协助、服药提醒',
      '家属可随时通过App查看老人状态（如有智能设备）',
      '服务结束 → 照护员填写《照护记录》→ 推送家属',
    ],
    suitable: ['家庭照顾者需要短暂休息', '老人对环境变化敏感、不宜外出', '轻度至中度失能老人', '短期替代照护（家属出差/生病）'],
    includes: ['身体照顾（协助如厕、移动）', '陪伴与安全监护', '协助用餐与服药提醒', '简单家务（限于老人相关）', '照护记录与异常汇报'],
    note: '居家喘息不包含医疗护理操作（如注射、换药等），如有医疗需求请选择专业上门护理服务。',
  },
  {
    id: 'institution-respite',
    icon: '🏡',
    title: '机构喘息服务',
    subtitle: '送至专业机构短期入住，全面照护',
    color: 'border-primary-400 bg-primary-50',
    price: '200-400 元 / 天',
    desc: '老人短期入住合作养老机构（护理院或养老院），享受24小时专业照护。家属可安心出差、旅游或处理家庭事务。最短1天，最长可连续入住14天。',
    process: [
      '提前3天预约 → 选择合作机构 → 提交入住评估表',
      '入住前健康评估 → 机构确认接收 → 通知家属准备物品',
      '专车接送至机构（可选，另计费） → 办理入住手续',
      '入住期间：24小时照护、三餐供应、活动参与、健康监测',
      '家属每日收到《入住日报》（含饮食、活动、情绪评估）',
      '退住当日 → 健康评估 → 交接家属 → 生成《喘息服务总结报告》',
    ],
    suitable: ['家庭照顾者需要多日休息', '失能程度较重、居家喘息难以满足', '老人愿意短期入住机构', '术后恢复期需要短期专业照护'],
    includes: ['24小时专业照护', '每日三餐+间食', '健康监测（血压、血糖等）', '社交娱乐活动', '每日报告推送家属'],
    note: '建议提前考察合作机构环境，确认老人能适应。首次入住建议从1-2天开始尝试。',
  },
  {
    id: 'community-respite',
    icon: '🏘️',
    title: '社区喘息服务',
    subtitle: '日间送至社区日照中心，晚上接回',
    color: 'border-warm-400 bg-warm-50',
    price: '60-100 元 / 天（含午餐）',
    desc: '白天将老人送至社区日间照料中心参与活动，晚上接回家。既让家属白天有自由时间，又让老人获得社交和活动机会。可按天灵活预约。',
    process: [
      '提前1天预约 → 确认日照中心名额',
      '当天上午专车接老人至日照中心（或家属自送）',
      '日照中心：晨检 → 活动 → 午餐 → 午休 → 下午活动 → 点心',
      '下午专车送回（或家属自接）→ 推送《日间照护记录》',
    ],
    suitable: ['家属白天需要工作或外出', '老人轻度失能但社交需求较强', '老人晚上必须回家居住', '需要定期社交互动预防认知退化'],
    includes: ['日间安全监护', '餐饮（午餐+点心）', '健康操/康复活动', '社交与兴趣小组', '健康监测', '往返接送（可选）'],
    note: '社区喘息是最经济实惠的选择，同时为老人提供宝贵的社交机会。研究显示定期参与日间活动可延缓认知功能退化。',
  },
];

const faqItems = [
  {
    q: '喘息服务和普通照护服务有什么不同？',
    a: '喘息服务的核心目的是"让家庭照顾者休息"，而非单纯为老人提供照护。它是台湾长照2.0四大包服务之一，被国际公认为维护家庭照护能力、防止照顾者过劳的关键支持机制。普通照护服务以老人为中心，而喘息服务同时关注照顾者和被照顾者双方。',
  },
  {
    q: '家庭照顾者过劳有哪些警示信号？',
    a: '如果你出现以下3个以上信号，建议尽快申请喘息服务：①睡眠质量持续下降；②经常感到疲惫、易怒或焦虑；③社交活动大幅减少；④自己的健康问题被忽略（如推迟体检）；⑤对照顾工作产生排斥或无力感；⑥频繁生病（免疫力下降）。照顾者健康是老人照护质量的基础。',
  },
  {
    q: '喘息服务是否可以走长护险报销？',
    a: '目前大陆长护险暂未将喘息服务纳入常规支付范围（以重度失能护理为主），但部分试点城市已开始探索。建议：①咨询当地医保局是否有相关试点政策；②了解社区养老服务补贴是否可覆盖部分费用；③部分商业护理保险产品已开始涵盖喘息服务。',
  },
  {
    q: '如何判断哪种喘息服务适合我家？',
    a: '选择原则：①老人照护需求较简单+照顾者只需几小时休息→居家喘息；②老人需要全天照护+照顾者需多日休息→机构喘息；③老人白天需要社交+照顾者白天需工作→社区喘息。建议从1次短时间服务开始尝试，根据老人和家属的反馈再调整。',
  },
];

export default function RespiteCare() {
  const [selectedId, setSelectedId] = useState('home-respite');

  const current = respiteServices.find((s) => s.id === selectedId)!;

  return (
    <section id="respite-care" className="bg-gradient-to-b from-care-50/30 to-white">
      <div className="section-container">
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">😌</span>
          <h2 className="section-title">喘息服务</h2>
          <p className="section-subtitle">
            借鉴台湾长照2.0第四包服务经验 — 让家庭照顾者得以休息，才能持续提供有质量的照护
          </p>
        </div>

        {/* Info banner */}
        <div className="max-w-4xl mx-auto mb-8 card bg-warm-50 border border-warm-200">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="text-card-title font-bold text-warm-800 mb-2">为什么要关注"照顾者"？</h3>
              <p className="text-body text-warm-700 leading-relaxed">
                台湾长照2.0将喘息服务列为四大包服务之一，因其认识到：<strong>家庭照顾者的身心健康直接影响照护质量。</strong>
                研究显示，长期无休的照顾者中，超过60%出现焦虑或抑郁症状，40%以上出现慢性健康问题。
                喘息服务不是"偷懒"，而是让照顾者充电后更好地照顾老人。
              </p>
            </div>
          </div>
        </div>

        {/* Service selector + detail */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="space-y-3">
            {respiteServices.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full text-left card border-2 transition-all duration-200 ${
                  selectedId === s.id
                    ? 'border-care-500 bg-care-50 shadow-card-hover scale-[1.02]'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{s.title}</h4>
                    <p className="text-sm text-care-600 font-medium">{s.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 card border-2 border-care-200 shadow-card-hover">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{current.icon}</span>
              <div>
                <h3 className="text-heading font-bold text-gray-900">{current.title}</h3>
                <p className="text-sm text-gray-500">{current.subtitle}</p>
              </div>
            </div>

            <p className="text-body-lg text-gray-700 mb-6 leading-relaxed">{current.desc}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-bold text-gray-900 mb-3 text-sm">📋 服务流程</h5>
                <div className="space-y-2">
                  {current.process.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-care-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 mb-3 text-sm">✅ 服务包含</h5>
                <ul className="space-y-1.5">
                  {current.includes.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-care-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h5 className="font-bold text-gray-900 mb-2 text-sm">👤 适合情况</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {current.suitable.map((s) => (
                      <span key={s} className="inline-block bg-care-50 text-care-700 text-xs px-2 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warm-50 border border-warm-200 rounded-xl p-4 text-sm text-warm-700 mb-4">
              <span className="font-bold">⚠️ 注意事项：</span>{current.note}
            </div>

            <div className="flex gap-3">
              <button className="btn btn-primary">📅 预约喘息服务</button>
              <button className="btn btn-outline text-sm">📖 了解照顾者支持资源</button>
            </div>
          </div>
        </div>

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

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            来源参考：台湾长照2.0四大包服务之喘息服务、日本介护保险短期入所服务、美国LTCI Respite Care条款
          </p>
        </div>
      </div>
    </section>
  );
}
