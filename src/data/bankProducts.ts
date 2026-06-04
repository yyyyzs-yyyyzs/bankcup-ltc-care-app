export interface BankProduct {
  id: string;
  bankName: string;
  shortName: string;
  icon: string;
  color: string;
  slogan: string;
  products: {
    category: string;
    emoji: string;
    title: string;
    desc: string;
    tags: string[];
    highlight?: string;
  }[];
  exclusiveBenefits: string[];
}

export const bankProducts: BankProduct[] = [
  {
    id: 'icbc',
    bankName: '中国工商银行',
    shortName: '工行',
    icon: '🏦',
    color: 'from-red-500 to-red-700',
    slogan: '智能养老规划，200+产品随心选',
    products: [
      {
        category: '养老财富规划',
        emoji: '🧮',
        title: '智能养老测算计算器',
        desc: '退休缺口测算、缴存金额测算、税优抵扣自动计算。千人千面资产诊断，"省心投"智能默认资产配置方案，按年龄/风险等级自动配比储蓄/理财/基金/保险。',
        tags: ['智能测算', '资产诊断', '自动配置'],
        highlight: '200+监管准入养老产品货架',
      },
      {
        category: '财税配套',
        emoji: '📄',
        title: '一站式税优管理',
        desc: '线上一键开具个税递延扣除凭证、自动归集个税抵扣数据，对接个税APP汇算清缴。统筹个人养老金+企业年金全养老资产一站式视图管理。',
        tags: ['税优凭证', '个税抵扣', '资产归集'],
      },
      {
        category: '养老生态增值',
        emoji: '🌟',
        title: '康养权益联盟',
        desc: '合作全国康养机构，开立养老金账户客户享居家养老上门护理优惠、养老院入住折扣、老年体检套餐补贴。养老科普直播、线下社区养老沙龙。',
        tags: ['康养折扣', '上门护理', '体检补贴'],
      },
    ],
    exclusiveBenefits: [
      '200+全品类养老产品货架（储蓄/理财/公募/保险/国债）',
      '智能资产诊断与自动配置',
      '个人养老金+企业年金统一视图',
      '全国康养机构合作网络',
    ],
  },
  {
    id: 'boc',
    bankName: '中国银行',
    shortName: '中行',
    icon: '🏛️',
    color: 'from-red-800 to-rose-900',
    slogan: '全球资产配置，养老传承一站式',
    products: [
      {
        category: '资产配置',
        emoji: '📊',
        title: '个人养老金资产配置方案（年度版）',
        desc: '分青年/中年/准退休三档配置策略，配套产品说明书、收益回溯。免费专业理财师一对一养老资产诊断。',
        tags: ['分层配置', '收益回溯', '理财师诊断'],
        highlight: '三档策略覆盖全生命周期',
      },
      {
        category: '养老传承',
        emoji: '📜',
        title: '养老传承配套服务',
        desc: '依托中银保险、信托资源，养老金客户专属养老信托咨询、身故养老金定向传承规划、终身寿险搭配方案。',
        tags: ['养老信托', '定向传承', '终身寿险'],
      },
      {
        category: '适老权益',
        emoji: '💚',
        title: '适老生活权益包',
        desc: '网点适老化绿色通道（优先办理养老金支取）、合作体检机构、旅居养老优惠、失能老人辅具租赁补贴权益。',
        tags: ['绿色通道', '旅居养老', '辅具租赁'],
      },
    ],
    exclusiveBenefits: [
      '国际视野的全球资产配置',
      '养老信托与传承规划',
      '网点适老化绿色通道',
      '旅居养老与辅具租赁权益',
    ],
  },
  {
    id: 'abc',
    bankName: '中国农业银行',
    shortName: '农行',
    icon: '🌾',
    color: 'from-green-600 to-emerald-800',
    slogan: '扎根城乡，县域养老贴心服务',
    products: [
      {
        category: '智能缴存',
        emoji: '🔄',
        title: '自动缴存智能服务',
        desc: '设置按月/按季自动划转资金进入个人养老金账户，工资代发客户一键签约工资定向缴存。',
        tags: ['自动划转', '工资代发', '一键签约'],
        highlight: '工资定向缴存，攒养老金无忧',
      },
      {
        category: '阶梯储蓄',
        emoji: '📈',
        title: '养老阶梯储蓄',
        desc: '专属个人养老金定期存款（阶梯利率，缴存年限越长利率上浮），养老理财定投智能扣款。',
        tags: ['阶梯利率', '定投扣款', '年限上浮'],
      },
      {
        category: '县域养老',
        emoji: '🏘️',
        title: '县域养老配套服务',
        desc: '县域客户对接乡镇养老服务中心，养老账户客户居家助浴、助餐服务补贴申领指引。养老反诈科普、农村老年金融防骗专项服务。',
        tags: ['乡镇对接', '助浴助餐', '反诈科普'],
      },
    ],
    exclusiveBenefits: [
      '县域养老服务中心深度对接',
      '阶梯利率养老储蓄产品',
      '工资代发联动自动缴存',
      '农村老年金融防骗专项服务',
    ],
  },
  {
    id: 'ccb',
    bankName: '中国建设银行',
    shortName: '建行',
    icon: '🔷',
    color: 'from-blue-600 to-blue-900',
    slogan: '养老账本智能记账，康养联盟全国覆盖',
    products: [
      {
        category: '智能记账',
        emoji: '📒',
        title: '「养老账本」智能记账',
        desc: '自动统计每年缴存、投资盈亏、预计退休月领取金额，动态更新养老缺口。一目了然看清养老储备全貌。',
        tags: ['自动统计', '养老缺口', '动态更新'],
        highlight: '养老资产全景视图，缺口一目了然',
      },
      {
        category: '康养联盟',
        emoji: '🏥',
        title: '康养权益联盟',
        desc: '建行生活APP联动全国连锁养老机构、康复医院，个人养老金客户享体检折扣、上门康复、短期托养优惠。',
        tags: ['连锁机构', '上门康复', '短期托养'],
      },
      {
        category: '代发联动',
        emoji: '💼',
        title: '代发联动优惠',
        desc: '企事业单位代发工资客户开立养老金账户，专属开户立减、理财申购手续费减免。个税汇算专题指引，自动测算全年个税抵扣额度。',
        tags: ['开户立减', '手续费减免', '税筹服务'],
      },
    ],
    exclusiveBenefits: [
      '「养老账本」全景资产管理',
      '建行生活APP康养生态联动',
      '代发工资客户专属优惠',
      '个税汇算专题指引',
    ],
  },
];
