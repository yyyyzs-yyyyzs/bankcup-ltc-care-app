import type { NavItem, ServiceTier, ServiceItem } from '../types';

export const navItems: NavItem[] = [
  { id: 'hero', label: '项目首页' },
  { id: 'pain-points', label: '痛点分析' },
  { id: 'mainland', label: '大陆现状' },
  { id: 'taiwan', label: '借鉴台湾' },
  { id: 'taiwan-abc', label: 'ABC模式' },
  { id: 'core-logic', label: '核心逻辑' },
  { id: 'app-modules', label: 'App 功能' },
  { id: 'assessment', label: '预评估体验' },
  { id: 'recommendation', label: '服务推荐' },
  { id: 'services', label: '服务内容' },
  { id: 'meal-companion', label: '陪餐服务' },
  { id: 'medical-escort', label: '陪诊服务' },
  { id: 'respite-care', label: '喘息服务' },
  { id: 'family-monitor', label: '家庭监管' },
  { id: 'adls-assessment', label: '能力评估' },
  { id: 'provider-directory', label: '服务方目录' },
  { id: 'virtual-advisor', label: '照护顾问' },
  { id: 'pension-calculator', label: '养老金测算' },
  { id: 'bank-products', label: '银行产品' },
  { id: 'international', label: '国际对比' },
  { id: 'knowledge-base', label: '知识库' },
  { id: 'innovation', label: '创新价值' },
  { id: 'financial', label: '金融模式' },
  { id: 'summary', label: '路演总结' },
];

export const serviceTiers: ServiceTier[] = [
  {
    id: 'basic',
    type: 'basic',
    title: '基础保障型',
    subtitle: '低成本 · 基础支持 · 社区资源',
    suitableFor: '预算有限、基本自理或轻度照护需求的老人',
    services: [
      '社区助餐',
      '健康咨询',
      '志愿陪伴',
      '基础助洁',
      '慢病提醒',
    ],
    estimatedCost: '500 - 1,500 元 / 月',
    insuranceAdvice: '建议了解当地养老服务补贴政策，关注社区免费或低偿服务资源。',
    reason: '以社区和家庭为基础，优先保障基本生活需求，降低老人独居风险，延缓照护需求升级。',
    style: 'bg-care-50 border-care-300',
  },
  {
    id: 'moderate',
    type: 'moderate',
    title: '稳健照护型',
    subtitle: '服务组合 · 稳定照护 · 高性价比',
    suitableFor: '轻中度照护需求、子女异地、需要定期服务的老人',
    services: [
      '陪诊服务',
      '助浴助洁',
      '日间照料',
      '康复训练',
      '上门护理',
    ],
    estimatedCost: '1,500 - 4,000 元 / 月',
    insuranceAdvice: '建议尝试长护险预评估，同时了解商业护理险和地方政府购买养老服务项目。',
    reason: '提供定期、稳定的照护服务组合，在居家养老基础上增加专业服务，降低突发风险。',
    style: 'bg-primary-50 border-primary-300',
  },
  {
    id: 'comprehensive',
    type: 'comprehensive',
    title: '综合护理型',
    subtitle: '安全保障 · 连续照护 · 专业护理',
    suitableFor: '中重度照护需求、独居风险较高、需要长期护理的老人',
    services: [
      '护理型机构',
      '长期上门护理',
      '认知照护',
      '康复护理',
      '适老化改造',
    ],
    estimatedCost: '4,000 - 10,000+ 元 / 月',
    insuranceAdvice: '强烈建议申请长护险正式评定，同时配置商业护理险，并了解政府高龄津贴和护理补贴。',
    reason: '提供连续、专业的照护保障，确保护理质量与安全，降低家庭照护压力。',
    style: 'bg-warm-50 border-warm-300',
  },
];

export const serviceItems: ServiceItem[] = [
  {
    id: 'meal',
    name: '社区助餐',
    icon: '🍽️',
    description: '解决老人每日用餐与营养均衡问题，提供社区食堂、送餐上门等服务。',
    category: 'community',
  },
  {
    id: 'clean',
    name: '助洁助浴',
    icon: '🛁',
    description: '提供居室清洁、洗衣、个人卫生协助和助浴服务，保障老人基本生活质量。',
    category: 'home',
  },
  {
    id: 'escort',
    name: '陪诊服务',
    icon: '🏥',
    description: '帮助老人就医挂号、取药、复诊，减少子女异地照护困难。',
    category: 'community',
  },
  {
    id: 'daycare',
    name: '日间照料',
    icon: '🏠',
    description: '白天托管老人，提供餐饮、活动和健康监测，晚上回家居住。',
    category: 'community',
  },
  {
    id: 'home-nursing',
    name: '上门护理',
    icon: '💉',
    description: '由专业护士上门提供换药、注射、管道护理等医疗护理服务。',
    category: 'professional',
  },
  {
    id: 'rehab',
    name: '康复训练',
    icon: '🦵',
    description: '提供物理治疗、作业治疗、言语治疗等康复训练，帮助老人恢复身体功能。',
    category: 'professional',
  },
  {
    id: 'elderly-renovation',
    name: '适老化改造',
    icon: '🔧',
    description: '通过安装扶手、防滑处理、智能监测等方式降低居家风险，预防跌倒。',
    category: 'home',
  },
  {
    id: 'institution',
    name: '护理型机构',
    icon: '🏡',
    description: '为需要 24 小时专业照护的老人提供机构养老选择，包括护理院、养老公寓等。',
    category: 'professional',
  },
];

export const painPoints = [
  {
    icon: '⚠️',
    title: '长护险重点覆盖重度失能',
    desc: '目前制度以重度失能老人为核心保障对象，轻中度需求覆盖不足。',
  },
  {
    icon: '🔍',
    title: '轻中度照护需求缺口大',
    desc: '大量轻度失能、慢病、独居老人已存在照护需求，但缺少制度性覆盖。',
  },
  {
    icon: '❓',
    title: '不清楚是否符合长护险',
    desc: '老人和子女不了解长护险申请条件和流程，无法快速判断是否符合条件。',
  },
  {
    icon: '📋',
    title: '服务选择困难，费用不透明',
    desc: '养老服务种类繁多，价格信息不透明，难以比较和选择。',
  },
  {
    icon: '💰',
    title: '收入有限，不知能负担什么',
    desc: '老人不清楚自己的养老金和子女支持能支撑什么样的养老服务。',
  },
];

export const mainlandFacts = {
  strengths: [
    '已建立长期护理保险制度试点体系',
    '通过失能等级评估，为符合条件的失能人员支付部分基础护理费用',
    '核心机制：失能评估 → 待遇认定 → 基础护理支付',
    '有效减轻重度失能老人家庭的经济负担',
  ],
  gaps: [
    '重点保障对象偏向重度失能老人',
    '对轻中度照护需求老人覆盖不足',
    '偏向支付制度，而非完整的服务匹配平台',
    '长护险之外的养老服务费用仍需家庭承担',
    '老人和子女缺少统一入口来判断需求、匹配服务和测算费用',
  ],
};

export const taiwanHighlights = [
  {
    icon: '📝',
    title: '先评估，再匹配服务',
    desc: '不是直接推荐养老院，而是先判断老人照护需求等级，再匹配合适的服务类型。',
  },
  {
    icon: '🏘️',
    title: '居家、社区、机构分层',
    desc: '根据评估结果推荐居家照护、社区日托或机构养老，形成连续照护体系。',
  },
  {
    icon: '🌱',
    title: '关注轻中度需求人群',
    desc: '对未达到重度失能标准、但已经需要照护支持的老人进行早期介入和预防。',
  },
  {
    icon: '🔄',
    title: '持续管理与动态调整',
    desc: '老人身体状况和支付能力会变化，服务方案也应定期评估和动态调整。',
  },
];
