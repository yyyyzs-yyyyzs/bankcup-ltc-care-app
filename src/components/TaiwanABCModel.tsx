const abcLevels = [
  {
    level: 'A',
    title: '社区整合型服务中心',
    subtitle: '区域级综合评估与管理',
    color: 'from-primary-600 to-primary-800',
    borderColor: 'border-primary-500',
    bgColor: 'bg-primary-50',
    icon: '🏥',
    functions: [
      '专业失能评估与个案管理',
      '整合区域内长照资源',
      '协调B级与C级单位',
      '复杂个案转介与追踪',
    ],
    targetArea: '区域层级（每乡镇市区至少1处）',
  },
  {
    level: 'B',
    title: '复合型服务中心',
    subtitle: '次区域级多元服务提供',
    color: 'from-care-500 to-care-700',
    borderColor: 'border-care-500',
    bgColor: 'bg-care-50',
    icon: '🏘️',
    functions: [
      '提供居家服务与日间照顾',
      '专业复能与护理指导',
      '交通接送服务协调',
      '辅具租借与无障碍评估',
    ],
    targetArea: '次区域层级（每国中学区至少1处）',
  },
  {
    level: 'C',
    title: '巷弄长照站',
    subtitle: '社区邻里边预防照护',
    color: 'from-warm-400 to-warm-600',
    borderColor: 'border-warm-400',
    bgColor: 'bg-warm-50',
    icon: '🏠',
    functions: [
      '就近关怀访视与问候',
      '健康促进与共餐服务',
      '预防失能/失智活动',
      '初级咨询与资源转介',
    ],
    targetArea: '邻里层级（每3个村里至少1处）',
  },
];

const fourPackages = [
  {
    num: '第一包',
    icon: '🩺',
    title: '照顾及专业服务',
    items: ['居家照顾（家务及身体照顾）', '日间照顾与家庭托顾', '物理/职能力治疗师到府复能', '护理师护理指导'],
    color: 'border-primary-400 bg-primary-50',
  },
  {
    num: '第二包',
    icon: '🚐',
    title: '交通接送服务',
    items: ['长照专车往返医院就医', '复健交通补助', '中重度失能者优先（2级以上）'],
    color: 'border-care-400 bg-care-50',
  },
  {
    num: '第三包',
    icon: '🔧',
    title: '辅具及无障碍改善',
    items: ['居家无障碍空间修缮（浴室防滑、扶手）', '轮椅/气垫床等辅具租借', '购买辅具补贴'],
    color: 'border-warm-400 bg-warm-50',
  },
  {
    num: '第四包',
    icon: '😌',
    title: '喘息服务',
    items: ['居家喘息（派员到府照顾）', '机构喘息（送至安养机构暂住）', '社区喘息（送至日照中心）'],
    color: 'border-primary-500 bg-primary-100',
  },
];

export default function TaiwanABCModel() {
  return (
    <section id="taiwan-abc" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">台湾长照ABC三级照顾模式</h2>
        <p className="section-subtitle">
          台湾长照2.0以"A-B-C三级社区整体照顾模式"为核心，构建"区域—次区域—邻里"连续照护体系
        </p>

        {/* ABC 三级金字塔 */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center gap-6">
            {/* A Level - largest, bottom */}
            <div className={`card w-full max-w-2xl border-l-4 ${abcLevels[0].borderColor} bg-gradient-to-r ${abcLevels[0].color} text-white shadow-card-hover`}>
              <div className="flex items-start gap-5">
                <div className="bg-white/20 rounded-2xl p-4 text-center min-w-[80px]">
                  <span className="text-4xl block">{abcLevels[0].icon}</span>
                  <span className="text-3xl font-black">A</span>
                </div>
                <div>
                  <h3 className="text-heading font-bold mb-1">{abcLevels[0].title}</h3>
                  <p className="text-white/70 text-sm mb-3">{abcLevels[0].subtitle}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {abcLevels[0].functions.map((f, i) => (
                      <li key={i} className="text-sm text-white/90 flex items-start gap-1">
                        <span className="text-white/60">▪</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/50 mt-3">{abcLevels[0].targetArea}</p>
                </div>
              </div>
            </div>

            {/* B Level - medium */}
            <div className={`card w-full max-w-lg border-l-4 ${abcLevels[1].borderColor} bg-gradient-to-r ${abcLevels[1].color} text-white shadow-card-hover`}>
              <div className="flex items-start gap-5">
                <div className="bg-white/20 rounded-2xl p-4 text-center min-w-[80px]">
                  <span className="text-3xl block">{abcLevels[1].icon}</span>
                  <span className="text-2xl font-black">B</span>
                </div>
                <div>
                  <h3 className="text-card-title font-bold mb-1">{abcLevels[1].title}</h3>
                  <p className="text-white/70 text-sm mb-3">{abcLevels[1].subtitle}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {abcLevels[1].functions.map((f, i) => (
                      <li key={i} className="text-sm text-white/90 flex items-start gap-1">
                        <span className="text-white/60">▪</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/50 mt-3">{abcLevels[1].targetArea}</p>
                </div>
              </div>
            </div>

            {/* C Level - smallest */}
            <div className={`card w-full max-w-sm border-l-4 ${abcLevels[2].borderColor} bg-gradient-to-r ${abcLevels[2].color} text-white shadow-card-hover`}>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3 text-center min-w-[70px]">
                  <span className="text-2xl block">{abcLevels[2].icon}</span>
                  <span className="text-xl font-black">C</span>
                </div>
                <div>
                  <h3 className="text-card-title font-bold mb-1">{abcLevels[2].title}</h3>
                  <p className="text-white/70 text-sm mb-2">{abcLevels[2].subtitle}</p>
                  <ul className="space-y-1">
                    {abcLevels[2].functions.map((f, i) => (
                      <li key={i} className="text-sm text-white/90 flex items-start gap-1">
                        <span className="text-white/60">▪</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/50 mt-2">{abcLevels[2].targetArea}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            ▲ A-B-C三级从区域到邻里的金字塔结构，覆盖密度递增，服务强度递减
          </p>
        </div>

        {/* 四大包服务 */}
        <h3 className="text-heading font-bold text-center mb-8">四大包服务 + 机构住宿专案</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fourPackages.map((pkg) => (
            <div key={pkg.num} className={`card border-l-4 ${pkg.color} group`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{pkg.icon}</span>
                <div>
                  <span className="text-xs font-bold text-gray-400">{pkg.num}</span>
                  <h4 className="font-bold text-gray-900 text-sm">{pkg.title}</h4>
                </div>
              </div>
              <ul className="space-y-1.5">
                {pkg.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                    <span className="text-gray-300 mt-1.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* + 机构住宿 */}
        <div className="mt-4 card border-2 border-dashed border-primary-300 bg-primary-50/50 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">🏡</span>
            <span className="font-bold text-primary-800">机构住宿式服务专案</span>
            <span className="text-gray-500 text-sm">针对入住住宿式长照机构的重度失能者，另设有年度定额现金费用补助</span>
          </div>
        </div>

        <div className="highlight-box highlight-green mt-8">
          <p className="text-body text-care-800">
            <span className="font-bold">对大陆的启示：</span>
            台湾ABC模式将"评估—服务—管理"下沉到社区邻里层级，让老人在家门口就能获得专业评估和适切服务。大陆可以借鉴这种"分层分级、社区落地"的组织模式，在本App中实现"根据评估结果推荐不同层级的服务组合"。
          </p>
        </div>
      </div>
    </section>
  );
}
