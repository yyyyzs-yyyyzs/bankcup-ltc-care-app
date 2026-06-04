import { useState } from 'react';

interface EscortService {
  id: string;
  name: string;
  icon: string;
  desc: string;
  price: string;
  duration: string;
  suitable: string[];
  includes: string[];
  flowchart: string[];
}

const escortServices: EscortService[] = [
  {
    id: 'basic-escort',
    name: '基础陪诊服务',
    icon: '🏥',
    desc: '专业陪诊师全程陪同老人就医，包括挂号、候诊、就诊、检查、取药全流程。确保老人不迷路、不错过、有人帮沟通。服务前与家属沟通确认就诊需求。',
    price: '150-250 元 / 次',
    duration: '约 2-4 小时（视医院情况而定）',
    suitable: ['不熟悉医院流程', '子女异地无法陪同', '行动不便需搀扶', '需要帮助与医生沟通'],
    includes: [
      '提前代挂号（挂号费另计）',
      '上门接老人前往医院',
      '全程陪同候诊、就诊、检查',
      '协助与医生沟通病情、记录医嘱',
      '代为缴费、取药（费用实报实销）',
      '安全送回家中并交代用药说明',
      '生成《就诊陪护报告》推送家属',
    ],
    flowchart: [
      '家属/老人预约 → 确认时间和医院',
      '陪诊师上门接老人 → 携带病历资料',
      '到达医院 → 取号/报到 → 候诊陪同',
      '进入诊室 → 协助沟通 → 记录医嘱',
      '陪同检查 → 缴费 → 取药',
      '安全送回 → 交代用药 → 推送报告',
    ],
  },
  {
    id: 'executive-escort',
    name: '尊享全程就医管理',
    icon: '⭐',
    desc: '包含基础陪诊+专属就医规划+专家预约+复诊提醒+全年健康档案管理。适合有复杂慢病需要长期医疗管理的老人。',
    price: '400-800 元 / 次',
    duration: '全天（含前期准备和后续跟踪）',
    suitable: ['多科室就诊需求', '慢病综合管理', '术后复查', '需要多学科会诊'],
    includes: [
      '基础陪诊全部内容',
      '专属就医规划师提前规划就诊路线',
      '优先预约专家号源（合作医院网络）',
      '多科室间协调和转诊引导',
      '全年电子健康档案管理',
      '复诊自动提醒与提前预约',
      '与家庭医生信息同步',
    ],
    flowchart: [
      '需求评估 → 制定个性化就医方案',
      '提前一周预约专家号 → 规划最优路线',
      '就医前日提醒准备 → 当天专车接送（可选）',
      '全程VIP通道 → 多科室间无缝衔接',
      '医生沟通全程录音（经授权）→ 详细记录',
      '紧急检查结果即时通知家属',
      '后续复诊自动排期 → 持续健康跟踪',
    ],
  },
  {
    id: 'remote-escort',
    name: '远程陪诊指导',
    icon: '📱',
    desc: '通过视频连线方式，由专业陪诊师远程指导老人完成就医流程。适合老人有一定自理能力、手机操作熟练，只需要远程协助的场景。价格实惠，覆盖广泛。',
    price: '50-80 元 / 次',
    duration: '按实际就医时间计费',
    suitable: ['手机操作熟练', '轻度行动不便', '预算有限', '非复杂就诊'],
    includes: [
      '提前指导线上挂号操作',
      '就诊过程中视频/语音实时指导',
      '帮助远程查看报告单并解读',
      '指导在线缴费和药品配送',
      '生成电子版就诊摘要',
    ],
    flowchart: [
      '预约 → 确认就诊需求 → 指导挂号',
      '就医当天 → 视频连线 → 全程导航',
      '远程指导排队、找科室、缴费',
      '协助理解医嘱 → 指导取药',
      '推送电子就诊摘要给家属',
    ],
  },
];

const faqItems = [
  { q: '陪诊师的专业背景是什么？', a: '陪诊师持有健康管理师/护士资格证/养老护理员等专业资质，经过80小时以上专业培训和实习，熟悉本市主要医院的就诊流程。所有人员通过公安背景审查。' },
  { q: '如果老人临时身体不适怎么办？', a: '陪诊师接受过基础急救培训，遇到老人身体突发不适会立即启动应急预案：联系紧急联系人、拨打120、现场基础救护，直至专业医疗人员到达。' },
  { q: '就诊费用如何结算？', a: '陪诊服务费通过平台预付，挂号费、检查费、药费等医院费用由老人/家属自行承担（可授权陪诊师代缴后凭票报销）。' },
  { q: '如何确保陪诊师不遗漏医嘱？', a: '陪诊师使用平台标准化《就诊记录表》，逐项记录医嘱内容、用药说明、复诊时间等，并录音（经授权）备查。就诊结束后生成结构化报告推送家属，关键医嘱还会口头复述给老人和家属。' },
];

export default function MedicalEscort() {
  const [selectedService, setSelectedService] = useState<string>('basic-escort');
  const [showBooking, setShowBooking] = useState(false);

  const current = escortServices.find((s) => s.id === selectedService)!;

  return (
    <section id="medical-escort" className="bg-gradient-to-b from-primary-50/50 to-white">
      <div className="section-container">
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">🏥</span>
          <h2 className="section-title">陪诊服务</h2>
          <p className="section-subtitle">
            让专业的人陪老人看病——从挂号到取药全流程陪伴，让子女放心、让老人安心
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Service type tabs */}
          <div className="space-y-3">
            {escortServices.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`w-full text-left card border-2 transition-all duration-200 ${
                  selectedService === s.id
                    ? 'border-primary-500 bg-primary-50 shadow-card-hover scale-[1.02]'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{s.name}</h4>
                    <p className="text-sm text-primary-600 font-medium">{s.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Service detail */}
          <div className="lg:col-span-2 card border-2 border-primary-200 shadow-card-hover">
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
                      <span className="text-primary-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 mb-3 text-sm">👤 适合人群</h5>
                <div className="flex flex-wrap gap-2">
                  {current.suitable.map((s) => (
                    <span key={s} className="inline-block bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Flowchart */}
            <div className="mb-6 bg-blue-gray-50 rounded-xl p-4">
              <h5 className="font-bold text-gray-900 mb-3 text-sm">🔄 服务流程</h5>
              <div className="space-y-2">
                {current.flowchart.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowBooking(true)} className="btn btn-primary">
                📅 立即预约
              </button>
              <button className="btn btn-outline text-sm">
                📞 咨询陪诊师
              </button>
            </div>
          </div>
        </div>

        {/* Booking form */}
        {showBooking && (
          <div className="mt-8 card border-2 border-primary-300 max-w-lg mx-auto shadow-card-hover animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-card-title font-bold text-gray-900">预约 {current.name}</h4>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">期望就诊日期</label>
                  <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">就诊时间</label>
                  <select className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none">
                    <option>上午 08:00-12:00</option>
                    <option>下午 13:00-17:00</option>
                    <option>全天</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">就诊医院</label>
                <input type="text" placeholder="请输入医院名称" className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">就诊科室</label>
                <input type="text" placeholder="如：心内科、骨科..." className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">主要症状/就诊原因</label>
                <textarea rows={2} placeholder="请简要描述..." className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
              </div>
              <div className="bg-primary-50 rounded-xl p-3 text-sm text-primary-700">
                <span className="font-bold">📱 通知机制：</span>预约确认后，关联的子女账号将收到短信通知。就诊完成后推送《就诊陪护报告》含医嘱详情。
              </div>
              <button onClick={() => setShowBooking(false)} className="btn btn-primary w-full">
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
