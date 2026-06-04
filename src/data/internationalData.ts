export interface CountryLTCData {
  id: string;
  country: string;
  flag: string;
  systemName: string;
  startYear: string;
  systemType: string;
  fundingSource: string;
  coveragePopulation: string;
  serviceTypes: string[];
  selfPayRatio: string;
  features: string[];
  highlights: string;
  sources: { label: string; url: string }[];
}

export const countriesLTC: CountryLTCData[] = [
  {
    id: 'cn',
    country: '中国大陆',
    flag: '🇨🇳',
    systemName: '长期护理保险制度',
    startYear: '2016（试点）',
    systemType: '社会保险（试点推广中）',
    fundingSource: '医保基金划转 + 财政补助 + 个人缴费',
    coveragePopulation: '重度失能人员（逐步扩展）',
    serviceTypes: [
      '生活照料',
      '医疗护理',
      '康复服务',
      '辅具租赁',
    ],
    selfPayRatio: '各地不同，约10%-30%',
    features: [
      '独立于医疗保险的"第六险"',
      '以失能等级评估为待遇依据',
      '各地试点政策有差异',
      '重点覆盖重度失能人群',
    ],
    highlights: '制度快速推进，已覆盖49个试点城市，未来将全国推广。主要解决重度失能老人基础护理费用支付问题。',
    sources: [
      { label: '国家医保局', url: 'https://www.nhsa.gov.cn/' },
    ],
  },
  {
    id: 'tw',
    country: '中国台湾',
    flag: '🇹🇼',
    systemName: '长期照顾十年计划2.0（长照2.0）',
    startYear: '2017',
    systemType: '税收制 + 社会保险（规划中）',
    fundingSource: '政府预算（遗赠税、烟税等）',
    coveragePopulation: '65岁以上失能老人、55岁以上失能原住民、50岁以上失智症患者等',
    serviceTypes: [
      '照顾及专业服务（第一包）',
      '交通接送服务（第二包）',
      '辅具及无障碍改善（第三包）',
      '喘息服务（第四包）',
      '机构住宿式服务专案',
    ],
    selfPayRatio: '一般户16%，中低收入户5%-10%，低收入户0%',
    features: [
      'A-B-C三级社区整体照顾模式',
      '先评估、后匹配、分层服务',
      '四大包服务覆盖全面',
      '关注轻中度失能早期介入',
      '持续管理与动态调整',
    ],
    highlights: '以社区为基础的三级照顾网络，从巷弄长照站（C级）到区域整合中心（A级），形成就近、连续、多元的长照服务体系。',
    sources: [
      { label: '中华民国行政院', url: 'https://english.ey.gov.tw/News3/9E5540D592A5FECD/332a78c0-0c8e-4064-bd71-8c22477dae75' },
      { label: 'PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7533198/' },
    ],
  },
  {
    id: 'jp',
    country: '日本',
    flag: '🇯🇵',
    systemName: '介护保险制度（Kaigo Hoken）',
    startYear: '2000',
    systemType: '强制性社会保险',
    fundingSource: '保费50% + 税收50%（中央25%、都道府县12.5%、市町村12.5%）',
    coveragePopulation: '40岁以上全体国民（65岁以上第1号被保险者，40-64岁第2号被保险者）',
    serviceTypes: [
      '在宅介护服务（居家照顾）',
      '通所/短期入所（日间与短期照顾）',
      '福祉用具与住宅改修',
      '设施介护服务（机构照顾）',
      '介护预防服务',
    ],
    selfPayRatio: '10%（高收入者20%-30%）',
    features: [
      '介护经理人（Care Manager）制定个性化照护计划',
      '实物给付为主，不直接发放现金',
      '7级失能等级评定（要支援1-2、要介护1-5）',
      '定期复评与照护计划动态调整',
      '40岁起强制参保',
    ],
    highlights: '全球最成熟的长照保险制度之一。介护经理人制度是其核心特色，由专业人员为每位老人量身定制照护方案，确保服务精准匹配。',
    sources: [
      { label: '爱知县厅官方指南', url: 'https://www.pref.aichi.jp/uploaded/attachment/366088.pdf' },
      { label: 'ILO政策数据库', url: 'https://webapps.ilo.org/globalcare/south-4-care/24' },
    ],
  },
  {
    id: 'us',
    country: '美国',
    flag: '🇺🇸',
    systemName: '长期照护保险（LTC Insurance）',
    startYear: '1970s（商业保险兴起）',
    systemType: '商业保险为主（少数州推行公营）',
    fundingSource: '个人保费 + 联邦/州医疗补助（Medicaid）兜底',
    coveragePopulation: '自愿购买（约7-8百万美国人拥有LTCI保单）',
    serviceTypes: [
      '居家照护（Home Care）',
      '社区日间照顾（ADHC）',
      '辅助生活机构（ALF）',
      '专业护理机构（Nursing Homes）',
      '喘息服务（Respite Care）',
    ],
    selfPayRatio: '根据保单条款，通常有90天等待期，日赔付上限$100-$250',
    features: [
      'ADLs（日常生活活动）为给付触发条件',
      '传统型与混合型（结合人寿保险）产品',
      '华盛顿州率先推行公营长照税',
      'Medicaid为低收入者兜底',
      '市场化程度高，产品丰富',
    ],
    highlights: '以商业保险为主导的市场化模式。近年来混合型产品（LTC+人寿保险）快速增长，解决传统LTCI"用不上就亏了"的心理障碍。',
    sources: [
      { label: 'CA Health Advocates', url: 'https://cahealthadvocates.org/long-term-care/long-term-care-insurance-an-overview/' },
      { label: 'FLTCIP', url: 'https://www.ltcfeds.gov/long-term-care/insurance' },
    ],
  },
];

export const comparisonDimensions = [
  { key: 'systemType', label: '制度类型' },
  { key: 'startYear', label: '启动时间' },
  { key: 'fundingSource', label: '筹资方式' },
  { key: 'coveragePopulation', label: '覆盖人群' },
  { key: 'selfPayRatio', label: '自付比例' },
] as const;
