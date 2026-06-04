// ========== 平台数据：厦门银行银龄服务平台 ==========

export interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  marketPrice: string;
  bankPrice: string;
  suitableFor: string;
  partner: string;
  tags?: string[];
}

export interface ServiceModule {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  positioning: string;
  partners: string;
  services: ServiceItem[];
}

export interface ElderlyCase {
  id: string;
  name: string;
  age: number;
  gender: string;
  assessmentLevel: string;
  score: number;
  mainRisks: string[];
  recommendations: string[];
  estimatedMonthlyCost: string;
  story: string;
}

export interface BankTier {
  id: string;
  name: string;
  icon: string;
  condition: string;
  benefits: string[];
  highlight: boolean;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  services: string[];
  location: string;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  service: string;
  provider: string;
  originalPrice: number;
  discountPrice: number;
  status: '已完成' | '待确认' | '已预约' | '异常';
  elderlyName: string;
}

export interface InnovationPoint {
  icon: string;
  title: string;
  desc: string;
  detail: string;
}

// ========== 八大服务板块 ==========

export const serviceModules: ServiceModule[] = [
  {
    id: 'assessment',
    icon: '🩺',
    title: '身体评估与照护建议',
    subtitle: '平台入口，银行+医护联合上门评估',
    positioning: '这是平台入口。老人或子女先预约评估，平台根据评估结果推荐后续服务。',
    partners: '医护人员、护理评估员、社区卫生服务中心、康复机构、厦门银行客户经理',
    services: [
      {
        id: 'basic-assessment',
        name: '上门基础能力评估',
        desc: '评估进食、穿衣、洗澡、如厕、行走、上下楼、认知状态',
        marketPrice: '300元/次',
        bankPrice: '免费（开户客户）',
        suitableFor: '所有60岁以上老人',
        partner: '厦门安心护理中心',
        tags: ['银行客户免费'],
      },
      {
        id: 'fall-risk',
        name: '跌倒风险评估',
        desc: '检查行动能力、平衡能力、居家环境风险',
        marketPrice: '200元/次',
        bankPrice: '免费（开户客户）',
        suitableFor: '有跌倒史或行动不便老人',
        partner: '鹭岛康复服务站',
        tags: ['含居家环境检查'],
      },
      {
        id: 'chronic-screening',
        name: '慢病风险筛查',
        desc: '血压、血糖、用药情况、慢病管理建议',
        marketPrice: '150元/次',
        bankPrice: '80元/次',
        suitableFor: '有慢病史老人',
        partner: '思明社区健康中心',
        tags: ['首次半价'],
      },
      {
        id: 'disability-preassessment',
        name: '失能风险预评估',
        desc: '判断是否需要进一步申请长护险或专业护理',
        marketPrice: '250元/次',
        bankPrice: '120元/次',
        suitableFor: '高龄或身体功能下降老人',
        partner: '厦门安心护理中心',
        tags: ['长护险预评'],
      },
      {
        id: 'budget-planning',
        name: '养老服务预算测算',
        desc: '根据老人身体状况和家庭预算推荐服务包',
        marketPrice: '100元/次',
        bankPrice: '免费（开户客户）',
        suitableFor: '所有老人家庭',
        partner: '厦门银行客户经理',
        tags: ['智能测算'],
      },
      {
        id: 'family-care-report',
        name: '家庭照护建议报告',
        desc: '输出老人现状、风险点、推荐服务、预计费用',
        marketPrice: '200元/次',
        bankPrice: '免费（开户客户）',
        suitableFor: '所有评估老人',
        partner: '厦门安心护理中心',
        tags: ['电子报告'],
      },
    ],
  },
  {
    id: 'home-care',
    icon: '🏠',
    title: '居家生活照护',
    subtitle: '解决老人最日常、最高频的生活困难',
    positioning: '解决老人最日常、最高频的生活困难。',
    partners: '社区养老服务中心、居家护理公司、养老服务机构、助餐点、专业助浴机构',
    services: [
      {
        id: 'meal',
        name: '助餐服务',
        desc: '老年餐配送、社区食堂预约、低盐低糖餐、糖尿病餐、术后营养餐',
        marketPrice: '18元/餐',
        bankPrice: '15元/餐',
        suitableFor: '做饭不便、需营养管理的老人',
        partner: '鼓浪长者助餐点',
        tags: ['月套餐更优惠'],
      },
      {
        id: 'bath',
        name: '助浴服务',
        desc: '上门助浴、社区助浴点预约、移动助浴车、卧床老人擦浴',
        marketPrice: '150元/次',
        bankPrice: '120元/次',
        suitableFor: '洗澡困难、独居老人',
        partner: '厦门安心护理中心',
        tags: ['含浴前评估'],
      },
      {
        id: 'cleaning',
        name: '助洁服务',
        desc: '居家清洁、床单更换、厨房卫生、卫生间清洁、垃圾清理',
        marketPrice: '120元/次',
        bankPrice: '99元/次',
        suitableFor: '打扫困难的老人',
        partner: '思明社区服务中心',
        tags: ['每周套餐85折'],
      },
      {
        id: 'mobility-aid',
        name: '助行服务',
        desc: '陪同散步、上下楼协助、轮椅推行、外出安全陪护',
        marketPrice: '80元/小时',
        bankPrice: '65元/小时',
        suitableFor: '行动不便老人',
        partner: '银龄陪诊服务中心',
      },
      {
        id: 'daily-living',
        name: '起居照护',
        desc: '协助穿衣、洗漱、翻身、床椅转移、整理床铺',
        marketPrice: '120元/次',
        bankPrice: '100元/次',
        suitableFor: '半失能或术后恢复老人',
        partner: '厦门安心护理中心',
      },
      {
        id: 'toilet-care',
        name: '如厕护理',
        desc: '协助如厕、尿垫更换、失禁护理、便秘照护',
        marketPrice: '180元/次',
        bankPrice: '150元/次',
        suitableFor: '失禁或行动不便老人',
        partner: '厦门安心护理中心',
        tags: ['含护理用品'],
      },
      {
        id: 'medication-reminder',
        name: '用药提醒',
        desc: '定时提醒服药、药盒整理、慢病用药记录',
        marketPrice: '60元/月',
        bankPrice: '免费（尊享客户）',
        suitableFor: '多药物长期服药老人',
        partner: '思明社区健康中心',
        tags: ['智能提醒'],
      },
      {
        id: 'regular-visit',
        name: '定期探访',
        desc: '每周上门探访、独居老人安全确认、生活情况记录',
        marketPrice: '100元/次',
        bankPrice: '80元/次',
        suitableFor: '独居老人',
        partner: '思明社区服务中心',
        tags: ['周套餐65折'],
      },
    ],
  },
  {
    id: 'medical-rehab',
    icon: '🏥',
    title: '医护康复服务',
    subtitle: '医养结合，银行不直接提供医疗服务',
    positioning: '体现医养结合，但银行不直接提供医疗服务，实际服务由具备资质的医院、诊所、护理站、康复机构提供。',
    partners: '康复医院、护理院、社区卫生服务中心、互联网护理服务机构、诊所、康复理疗机构',
    services: [
      {
        id: 'home-nursing',
        name: '上门护理',
        desc: '血压血糖测量、基础生命体征监测、伤口护理、管路护理',
        marketPrice: '200元/次',
        bankPrice: '160元/次（8折）',
        suitableFor: '术后或慢病需定期护理老人',
        partner: '鹭岛康复服务站',
        tags: ['专业护士'],
      },
      {
        id: 'rehab-training',
        name: '康复训练',
        desc: '术后康复、关节康复、偏瘫康复、平衡训练、步态训练',
        marketPrice: '300元/次',
        bankPrice: '240元/次（8折）',
        suitableFor: '术后或中风后需康复老人',
        partner: '鹭岛康复服务站',
        tags: ['8折优惠'],
      },
      {
        id: 'chronic-management',
        name: '慢病管理',
        desc: '高血压管理、糖尿病管理、心脑血管风险随访',
        marketPrice: '150元/月',
        bankPrice: '首次免费，后续99元/月',
        suitableFor: '高血压、糖尿病等慢病老人',
        partner: '思明社区健康中心',
        tags: ['首次免费'],
      },
      {
        id: 'nursing-guidance',
        name: '护理指导',
        desc: '家属翻身拍背培训、压疮预防指导、失禁护理指导',
        marketPrice: '180元/次',
        bankPrice: '150元/次（83折）',
        suitableFor: '家属承担照护的家庭',
        partner: '厦门XX护理站',
        tags: ['家属培训'],
      },
      {
        id: 'cognitive-screening',
        name: '认知筛查',
        desc: '老年认知功能初筛、失智风险提示、转诊建议',
        marketPrice: '250元/次',
        bankPrice: '180元/次',
        suitableFor: '记忆下降或行为异常老人',
        partner: '合作医院老年科',
        tags: ['优先预约'],
      },
      {
        id: 'nutrition-guidance',
        name: '营养指导',
        desc: '老年营养评估、低盐低糖饮食建议、吞咽困难饮食指导',
        marketPrice: '120元/次',
        bankPrice: '90元/次',
        suitableFor: '营养不良或特殊饮食需求老人',
        partner: '思明社区健康中心',
      },
      {
        id: 'psycho-support',
        name: '心理支持',
        desc: '情绪疏导、抑郁风险初筛、独居老人心理关怀',
        marketPrice: '200元/次',
        bankPrice: '150元/次',
        suitableFor: '情绪低落、独居、丧偶老人',
        partner: '厦门XX心理服务中心',
        tags: ['首次免费'],
      },
      {
        id: 'hospice-referral',
        name: '安宁疗护转介',
        desc: '对重度失能或终末期老人提供转介咨询',
        marketPrice: '免费咨询',
        bankPrice: '免费',
        suitableFor: '终末期或重度失能老人',
        partner: '合作医院',
        tags: ['免费咨询'],
      },
    ],
  },
  {
    id: 'medical-escort',
    icon: '🚗',
    title: '陪诊助医与交通接送',
    subtitle: '解决老人看病难、出门难、子女不在身边的问题',
    positioning: '解决老人看病难、出门难、子女不在身边的问题。',
    partners: '陪诊公司、网约车平台、社区服务中心、医院导诊服务商、康复机构接送车队',
    services: [
      {
        id: 'regular-escort',
        name: '普通陪诊',
        desc: '陪同挂号、取号、排队、缴费、取药',
        marketPrice: '220元/半日',
        bankPrice: '180元/半日',
        suitableFor: '需就医陪同的老人',
        partner: '银龄陪诊服务中心',
        tags: ['含交通'],
      },
      {
        id: 'specialist-escort',
        name: '专科陪诊',
        desc: '心内科、骨科、康复科、眼科、老年科专科陪诊',
        marketPrice: '280元/次',
        bankPrice: '230元/次',
        suitableFor: '需专科就诊老人',
        partner: '银龄陪诊服务中心',
      },
      {
        id: 'followup-escort',
        name: '复诊陪同',
        desc: '定期复查、报告领取、医生建议记录',
        marketPrice: '200元/次',
        bankPrice: '160元/次',
        suitableFor: '需定期复诊老人',
        partner: '银龄陪诊服务中心',
      },
      {
        id: 'hospitalization-assist',
        name: '住院协助',
        desc: '入院手续办理、出院手续办理、床位咨询',
        marketPrice: '300元/次',
        bankPrice: '250元/次',
        suitableFor: '需住院或出院老人',
        partner: '合作医院导诊服务商',
      },
      {
        id: 'rehab-transport',
        name: '康复接送',
        desc: '家到康复机构往返接送',
        marketPrice: '100元起/次',
        bankPrice: '85元起/次',
        suitableFor: '需定期往返康复机构老人',
        partner: '康复机构接送车队',
      },
      {
        id: 'medical-transport',
        name: '就医交通',
        desc: '轮椅车、无障碍车辆、陪同上下车',
        marketPrice: '150元/次',
        bankPrice: '120元/次',
        suitableFor: '行动不便需专车老人',
        partner: '合作无障碍车队',
        tags: ['含陪同'],
      },
      {
        id: 'medication-delivery',
        name: '取药送药',
        desc: '慢病药品代取、药品配送到家',
        marketPrice: '30元起/次',
        bankPrice: '20元起/次',
        suitableFor: '不便到医院取药的老人',
        partner: '思明社区服务中心',
      },
      {
        id: 'exam-escort',
        name: '检查陪同',
        desc: 'CT、核磁、抽血、B超等检查流程陪同',
        marketPrice: '250元/次',
        bankPrice: '200元/次',
        suitableFor: '需大型设备检查老人',
        partner: '银龄陪诊服务中心',
      },
    ],
  },
  {
    id: 'daycare',
    icon: '☀️',
    title: '社区日间照料',
    subtitle: '白天照护、晚上回家，适合轻中度需求老人',
    positioning: '适合白天需要照护、晚上仍回家的老人。',
    partners: '社区日间照料中心、街道养老服务中心、老年活动中心、养老机构日托部门',
    services: [
      {
        id: 'day-care',
        name: '日间托老',
        desc: '白天照护、午餐、午休、活动陪伴',
        marketPrice: '120元/天',
        bankPrice: '108元/天（9折）',
        suitableFor: '白天无家人照看的老人',
        partner: '思明社区日照中心',
        tags: ['月卡更优惠'],
      },
      {
        id: 'cognitive-activity',
        name: '认知活动',
        desc: '记忆训练、益智活动、手工活动',
        marketPrice: '80元/次',
        bankPrice: '首次体验价40元',
        suitableFor: '认知下降风险老人',
        partner: '思明社区日照中心',
        tags: ['首次半价'],
      },
      {
        id: 'rehab-activity',
        name: '康复活动',
        desc: '简单肢体训练、平衡训练、柔韧训练',
        marketPrice: '100元/次',
        bankPrice: '80元/次',
        suitableFor: '轻度功能下降老人',
        partner: '鹭岛康复服务站',
      },
      {
        id: 'social-activity',
        name: '社交活动',
        desc: '老年课堂、兴趣小组、节日活动',
        marketPrice: '免费/部分收费',
        bankPrice: '开户客户优先报名',
        suitableFor: '社交需求老人',
        partner: '思明社区日照中心',
        tags: ['优先报名'],
      },
      {
        id: 'short-respite-care',
        name: '短时看护',
        desc: '子女临时外出时的半日看护',
        marketPrice: '80元/半日',
        bankPrice: '65元/半日',
        suitableFor: '子女临时外出的家庭',
        partner: '思明社区日照中心',
      },
      {
        id: 'community-dining',
        name: '社区助餐',
        desc: '午餐、晚餐、送餐服务',
        marketPrice: '15元/餐',
        bankPrice: '12元/餐',
        suitableFor: '社区就餐需求老人',
        partner: '鼓浪长者助餐点',
        tags: ['月套餐优惠'],
      },
      {
        id: 'health-monitor',
        name: '健康监测',
        desc: '血压、血糖、体温等基础监测',
        marketPrice: '30元/次',
        bankPrice: '免费（开户客户）',
        suitableFor: '需日常健康监测老人',
        partner: '思明社区健康中心',
        tags: ['开户免费'],
      },
      {
        id: 'safety-care',
        name: '安全照护',
        desc: '防走失、防跌倒、紧急联系',
        marketPrice: '含在日托费中',
        bankPrice: '含在日托费中',
        suitableFor: '有走失或跌倒风险老人',
        partner: '思明社区日照中心',
      },
    ],
  },
  {
    id: 'institution',
    icon: '🏡',
    title: '养老机构与短期托养',
    subtitle: '中重度照护需求老人的专业解决方案',
    positioning: '解决中重度照护老人和家庭照护压力大的问题。',
    partners: '养老院、护理院、康养中心、医养结合机构、短期托养机构',
    services: [
      {
        id: 'institution-search',
        name: '养老机构查询',
        desc: '价格、位置、床位、护理等级、服务内容对比',
        marketPrice: '免费查询',
        bankPrice: '免费',
        suitableFor: '考虑机构养老的家庭',
        partner: '合作养老机构联盟',
      },
      {
        id: 'institution-visit',
        name: '机构参观预约',
        desc: '子女或老人预约实地参观',
        marketPrice: '免费参观',
        bankPrice: '优先预约',
        suitableFor: '有意向入住养老机构的家庭',
        partner: '海沧康养公寓等',
        tags: ['优先预约'],
      },
      {
        id: 'admission-assessment',
        name: '入住评估',
        desc: '判断老人适合自理区、介助区、介护区还是护理区',
        marketPrice: '500元/次',
        bankPrice: '300元/次',
        suitableFor: '准备入住机构的老人',
        partner: '合作评估机构',
      },
      {
        id: 'short-stay',
        name: '短期托养',
        desc: '7天、15天、30天短住服务',
        marketPrice: '200元/天起',
        bankPrice: '170元/天起（85折）',
        suitableFor: '家属暂时无法照顾的老人',
        partner: '海沧康养公寓',
        tags: ['85折'],
      },
      {
        id: 'post-op-stay',
        name: '术后短住康复',
        desc: '出院后短期入住康复护理',
        marketPrice: '350元/天',
        bankPrice: '280元/天',
        suitableFor: '术后需短期康复老人',
        partner: '海沧康养公寓',
      },
      {
        id: 'severe-care-bed',
        name: '重度照护床位',
        desc: '失能老人长期护理床位咨询',
        marketPrice: '按机构定价',
        bankPrice: '协议价',
        suitableFor: '重度失能老人',
        partner: '合作护理院',
        tags: ['协议价'],
      },
      {
        id: 'dementia-care',
        name: '认知症照护专区',
        desc: '失智老人专业照护机构推荐',
        marketPrice: '按机构定价',
        bankPrice: '协议价',
        suitableFor: '认知障碍老人',
        partner: '合作认知照护中心',
        tags: ['专业照护'],
      },
      {
        id: 'respite-institution',
        name: '机构喘息服务',
        desc: '家属暂时无法照顾时，老人短期入住机构',
        marketPrice: '220元/天',
        bankPrice: '180元/天',
        suitableFor: '家庭照护压力大的情况',
        partner: '海沧康养公寓',
        tags: ['按需入住'],
      },
    ],
  },
  {
    id: 'equipment',
    icon: '🔧',
    title: '辅具租赁与适老化改造',
    subtitle: '帮助老人继续在家安全、独立生活',
    positioning: '帮助老人继续在家生活，降低跌倒、失能和照护风险。',
    partners: '辅具租赁公司、适老化改造企业、装修公司、康复器械公司、社区养老服务中心',
    services: [
      {
        id: 'equipment-rental',
        name: '辅具租赁',
        desc: '轮椅、助行器、护理床、气垫床、坐便椅',
        marketPrice: '按辅具定价',
        bankPrice: '首月9折，押金减免',
        suitableFor: '短期使用辅具需求的老人',
        partner: '湖里适老化改造服务站',
        tags: ['押金减免'],
      },
      {
        id: 'care-supplies',
        name: '护理用品',
        desc: '尿垫、成人纸尿裤、防褥疮垫、护理垫',
        marketPrice: '按用品定价',
        bankPrice: '月套餐85折',
        suitableFor: '失禁或长期卧床老人',
        partner: '合作护理用品供应商',
        tags: ['月套餐85折'],
      },
      {
        id: 'bathroom-renovation',
        name: '浴室改造',
        desc: '防滑地垫、淋浴椅、浴室扶手、坐式淋浴',
        marketPrice: '3,000-8,000元',
        bankPrice: '9折',
        suitableFor: '浴室存在安全隐患的老人',
        partner: '湖里适老化改造服务站',
        tags: ['9折'],
      },
      {
        id: 'bedroom-renovation',
        name: '卧室改造',
        desc: '护理床、床边扶手、夜间感应灯',
        marketPrice: '2,000-5,000元',
        bankPrice: '9折',
        suitableFor: '起夜或起床困难老人',
        partner: '湖里适老化改造服务站',
      },
      {
        id: 'kitchen-renovation',
        name: '厨房改造',
        desc: '防滑处理、低位收纳、燃气报警器',
        marketPrice: '1,500-4,000元',
        bankPrice: '9折',
        suitableFor: '仍自己做饭的老人',
        partner: '湖里适老化改造服务站',
      },
      {
        id: 'doorstep-renovation',
        name: '门槛改造',
        desc: '消除高低差、安装坡道、轮椅通行优化',
        marketPrice: '2,000-6,000元',
        bankPrice: '9折',
        suitableFor: '使用轮椅或行动不便老人',
        partner: '湖里适老化改造服务站',
        tags: ['含评估'],
      },
      {
        id: 'emergency-call',
        name: '紧急呼叫',
        desc: '一键呼叫器、跌倒报警器、烟雾报警器',
        marketPrice: '500-2,000元/套',
        bankPrice: '开户客户免费安装基础套装',
        suitableFor: '独居或高龄老人',
        partner: '合作智能设备供应商',
        tags: ['开户免费'],
      },
      {
        id: 'home-safety-assessment',
        name: '适老化评估',
        desc: '上门查看居家风险并出具改造建议',
        marketPrice: '300元/次',
        bankPrice: '免费（开户客户）',
        suitableFor: '所有居家老人',
        partner: '湖里适老化改造服务站',
        tags: ['开户免费'],
      },
    ],
  },
  {
    id: 'family-monitor',
    icon: '👨‍👩‍👧',
    title: '家庭照护监管与服务流水',
    subtitle: '子女授权查看，账户资金安全隔离',
    positioning: '区别于普通养老服务平台。突出银行账户、支付记录、服务凭证、子女监管。',
    partners: '厦门银行、合作养老服务机构、子女端App',
    services: [
      {
        id: 'service-booking',
        name: '服务预约',
        desc: '选择助浴、陪诊、康复、机构参观等服务并预约',
        marketPrice: '—',
        bankPrice: '—',
        suitableFor: '老人端/子女端均可操作',
        partner: '平台统一预约系统',
      },
      {
        id: 'discount-view',
        name: '专属优惠查看',
        desc: '查看厦门银行客户各服务专属折扣',
        marketPrice: '—',
        bankPrice: '—',
        suitableFor: '已开户客户',
        partner: '厦门银行权益系统',
        tags: ['客户专属'],
      },
      {
        id: 'service-confirm',
        name: '服务确认',
        desc: '服务完成后确认是否真实完成',
        marketPrice: '—',
        bankPrice: '—',
        suitableFor: '老人或子女均可确认',
        partner: '平台服务确认系统',
      },
      {
        id: 'bill-view',
        name: '账单查看',
        desc: '查看每笔服务费用、优惠金额、支付记录',
        marketPrice: '—',
        bankPrice: '—',
        suitableFor: '老人+已授权子女',
        partner: '厦门银行支付系统',
        tags: ['含优惠明细'],
      },
      {
        id: 'child-authorize',
        name: '子女授权管理',
        desc: '添加/移除子女为家庭监管人，设置查看权限',
        marketPrice: '—',
        bankPrice: '—',
        suitableFor: '所有老人',
        partner: '平台授权管理系统',
        tags: ['权限可控'],
      },
      {
        id: 'complaint',
        name: '投诉反馈',
        desc: '对服务机构评价或投诉，平台跟进处理',
        marketPrice: '—',
        bankPrice: '—',
        suitableFor: '所有用户',
        partner: '平台客服系统',
      },
    ],
  },
];

// ========== 老人案例 ==========

export const elderlyCases: ElderlyCase[] = [
  {
    id: 'case-1',
    name: '陈阿姨',
    age: 76,
    gender: '女',
    assessmentLevel: 'B — 中度照护需求',
    score: 7,
    mainRisks: ['洗澡困难', '上下楼不便', '跌倒风险较高', '轻度高血压'],
    recommendations: [
      '上门助浴（每周2次）',
      '居家康复训练（每周1次）',
      '陪诊服务（每月1次复诊）',
      '浴室适老化改造（安装扶手、淋浴椅）',
    ],
    estimatedMonthlyCost: '1,800 - 2,500 元/月',
    story: '陈阿姨76岁，独居在思明区老小区三楼（无电梯）。子女在上海工作。日常生活基本自理，但洗澡时需要借助椅子，上下楼膝盖疼痛明显。近半年跌倒过一次。平台评估后推荐中度照护方案，重点解决助浴、康复和居家安全问题。',
  },
  {
    id: 'case-2',
    name: '李爷爷',
    age: 82,
    gender: '男',
    assessmentLevel: 'A — 较高失能风险',
    score: 12,
    mainRisks: ['脑卒中后偏瘫', '长期卧床风险', '压疮风险', '吞咽困难', '认知功能下降'],
    recommendations: [
      '长期上门护理（每周3次）',
      '偏瘫康复训练（每周2次）',
      '护理床+气垫床租赁',
      '建议申请长护险正式评定',
      '考虑护理型机构入住评估',
    ],
    estimatedMonthlyCost: '5,000 - 8,000 元/月',
    story: '李爷爷82岁，与老伴同住在湖里区。三个月前脑卒中后出院，左侧偏瘫，目前由78岁老伴照顾。老伴体力不支，翻身困难，李爷爷已出现早期压疮。子女在北京。平台评估后推荐综合护理方案，并建议尽快申请长护险及考虑机构照护。',
  },
  {
    id: 'case-3',
    name: '王奶奶',
    age: 68,
    gender: '女',
    assessmentLevel: 'C — 基本自理',
    score: 3,
    mainRisks: ['轻度关节退化', '骨质疏松', '独居'],
    recommendations: [
      '社区日间照料（每周2-3天）',
      '社区助餐服务',
      '定期探访（每周1次）',
      '健康管理（每月血压血糖监测）',
      '参加社区老年活动',
    ],
    estimatedMonthlyCost: '800 - 1,200 元/月',
    story: '王奶奶68岁，独居在思明区。身体基本健康，生活自理，但膝关节退化走路稍慢。子女在广州。王奶奶主要需求是社交、用餐保障和基础健康管理，希望有定期探访让子女放心。平台推荐预防保健方案，以社区服务为主。',
  },
];

// ========== 银行客户权益等级 ==========

export const bankTiers: BankTier[] = [
  {
    id: 'basic',
    name: '基础客户',
    icon: '🌱',
    condition: '开立厦门银行个人养老金账户或养老服务账户',
    benefits: [
      '免费基础身体评估（每年1次）',
      '合作机构公开报价',
      '养老服务咨询',
      '社区助餐优惠',
      '紧急呼叫设备免费安装',
    ],
    highlight: false,
  },
  {
    id: 'advanced',
    name: '进阶客户',
    icon: '💎',
    condition: '持续缴存或达到一定储蓄金额',
    benefits: [
      '含基础客户全部权益',
      '父母照护评估券（每年2次）',
      '陪诊助浴优惠（85折）',
      '体检折扣（8折）',
      '养老机构参观优先预约',
      '辅具租赁押金减免',
      '社区日托9折',
    ],
    highlight: true,
  },
  {
    id: 'premium',
    name: '尊享客户',
    icon: '👑',
    condition: '长期缴存、退休领取或高黏性养老客户',
    benefits: [
      '含进阶客户全部权益',
      '合作机构协议价',
      '服务包折扣（最高7折）',
      '优先预约绿色通道',
      '服务流水月度报告',
      '家庭账单自动生成',
      '异常消费提醒',
      '专属客户经理',
      '用药提醒免费',
    ],
    highlight: false,
  },
];

// ========== 合作机构 ==========

export const partners: Partner[] = [
  { id: 'p1', name: '厦门安心护理中心', type: '居家护理', services: ['上门护理', '助浴', '起居照护', '评估'], location: '思明区' },
  { id: 'p2', name: '鹭岛康复服务站', type: '康复机构', services: ['康复训练', '理疗', '评估'], location: '湖里区' },
  { id: 'p3', name: '银龄陪诊服务中心', type: '陪诊服务', services: ['陪诊', '取药', '就医交通'], location: '思明区' },
  { id: 'p4', name: '思明社区日照中心', type: '社区养老', services: ['日间照料', '助餐', '活动'], location: '思明区' },
  { id: 'p5', name: '海沧康养公寓', type: '养老机构', services: ['长期入住', '短期托养', '术后康复'], location: '海沧区' },
  { id: 'p6', name: '湖里适老化改造服务站', type: '适老化改造', services: ['辅具租赁', '居家改造', '安全评估'], location: '湖里区' },
  { id: 'p7', name: '鼓浪长者助餐点', type: '社区助餐', services: ['老年餐配送', '社区食堂', '营养餐'], location: '思明区' },
  { id: 'p8', name: '思明社区健康中心', type: '社区医疗', services: ['慢病管理', '健康监测', '用药管理'], location: '思明区' },
  { id: 'p9', name: '厦门XX护理站', type: '护理站', services: ['上门护理', '护理指导', '压疮护理'], location: '湖里区' },
  { id: 'p10', name: '厦门XX心理服务中心', type: '心理健康', services: ['心理支持', '认知评估', '情绪疏导'], location: '思明区' },
];

// ========== 服务流水 ==========

export const transactions: Transaction[] = [
  { id: 't1', date: '6月3日', time: '9:00', service: '上门助浴', provider: '厦门安心护理中心', originalPrice: 150, discountPrice: 120, status: '已完成', elderlyName: '陈阿姨' },
  { id: 't2', date: '6月5日', time: '14:00', service: '陪诊服务', provider: '银龄陪诊服务中心', originalPrice: 220, discountPrice: 180, status: '已完成', elderlyName: '陈阿姨' },
  { id: 't3', date: '6月8日', time: '10:00', service: '上门康复', provider: '鹭岛康复服务站', originalPrice: 300, discountPrice: 240, status: '待确认', elderlyName: '李爷爷' },
  { id: 't4', date: '6月12日', time: '11:30', service: '助餐配送', provider: '鼓浪长者助餐点', originalPrice: 18, discountPrice: 15, status: '已完成', elderlyName: '王奶奶' },
  { id: 't5', date: '6月15日', time: '8:30', service: '上门护理', provider: '厦门XX护理站', originalPrice: 200, discountPrice: 160, status: '已完成', elderlyName: '李爷爷' },
  { id: 't6', date: '6月18日', time: '15:00', service: '社区日托', provider: '思明社区日照中心', originalPrice: 120, discountPrice: 108, status: '已完成', elderlyName: '王奶奶' },
  { id: 't7', date: '6月20日', time: '9:30', service: '居家清洁', provider: '思明社区服务中心', originalPrice: 120, discountPrice: 99, status: '已预约', elderlyName: '陈阿姨' },
  { id: 't8', date: '6月22日', time: '14:30', service: '认知筛查', provider: '合作医院老年科', originalPrice: 250, discountPrice: 180, status: '已预约', elderlyName: '李爷爷' },
];

// ========== 创新点 ==========

export const innovationPoints: InnovationPoint[] = [
  {
    icon: '🩺',
    title: '评估前置',
    desc: '先评估老人身体状况，再推荐服务。',
    detail: '不同于传统养老服务平台直接展示服务列表，我们强调先由银行人员与医护人员联合上门评估，基于客观评估结果推荐最适合的服务方案，避免盲目消费。',
  },
  {
    icon: '🏦',
    title: '账户赋能',
    desc: '把银行账户从单纯金融产品延伸为养老服务权益入口。',
    detail: '个人养老金账户不再只是存钱、理财、保险的工具，而是连接真实养老服务场景的权益入口。账户等级越高，服务优惠越多。',
  },
  {
    icon: '🤝',
    title: '服务整合',
    desc: '整合康复、养老、医疗、护理、社区、辅具等多类机构。',
    detail: '银行作为客户入口和信任中介，整合8大类合作机构，为客户提供一站式养老服务对比、预约、支付和监管，解决信息不对称问题。',
  },
  {
    icon: '👨‍👩‍👧',
    title: '家庭监管',
    desc: '老人和子女都能预约服务，子女可查看服务流水、费用账单和服务凭证。',
    detail: '区别于普通平台，老人授权后子女可实时查看服务记录和费用支出，但不能操作账户资金。这解决了"子女异地照护焦虑"和"钱花到哪里"的信任问题，同时保护老人财务自主权。',
  },
];

// ========== 核心表达 ==========

export const coreMessages = {
  tagline: '账户专属，服务可共管。',
  compliance1: '子女不直接操作账户资金，而是在老人授权后查看服务流水与费用账单。',
  compliance2: '银行不直接提供护理服务，而是整合合作机构、账户权益和支付监管能力。',
  compliance3: '让个人养老金账户从单纯金融产品，延伸为养老服务入口。',
  compliance4: '先评估，再匹配；先服务，再留痕；先授权，再监管。',
  compliance5: '让养老金融不止于存钱，更连接真实养老服务。',
};

export const complianceNotices = [
  '银行不直接提供医疗护理服务。',
  '医疗、护理、康复服务由具备资质的第三方机构提供。',
  '子女需经老人授权后才能查看服务流水。',
  '子女不能直接操作老人个人养老金账户资金。',
  '平台评估结果仅用于服务推荐，不替代政府部门正式长护险评定或医疗诊断。',
];

// ========== 平台流程 ==========

export const platformFlow = [
  { icon: '📋', title: '预约评估', desc: '老人或子女在平台预约上门评估' },
  { icon: '🏠', title: '上门评估', desc: '银行人员+医护人员共同上门' },
  { icon: '📊', title: '生成报告', desc: '能力等级、风险、推荐服务、费用预算' },
  { icon: '🎯', title: '推荐服务', desc: '基于评估结果匹配个性化服务方案' },
  { icon: '💎', title: '享受优惠', desc: '厦门银行客户专属协议价与折扣' },
  { icon: '✅', title: '服务完成', desc: '机构完成服务并上传记录' },
  { icon: '📝', title: '生成流水', desc: '平台生成服务记录与费用账单' },
  { icon: '👁️', title: '子女监管', desc: '子女查看服务流水与异常提醒' },
];

// ========== 痛点数据 ==========

export const painPointsData = [
  {
    target: '老人痛点',
    icon: '👴',
    items: [
      { title: '不知道自己适合什么服务', desc: '养老服务种类繁多，信息不透明，难以判断哪种服务真正适合自己。' },
      { title: '服务价格不透明', desc: '同样的服务不同机构价格差异大，缺乏统一比价渠道。' },
      { title: '预约复杂', desc: '不同服务需要联系不同机构，缺乏一站式预约入口。' },
    ],
  },
  {
    target: '子女痛点',
    icon: '👨‍👩‍👧',
    items: [
      { title: '异地照护困难', desc: '子女经常不在老人身边，无法了解老人是否真正接受了服务。' },
      { title: '不清楚老人有没有真正接受服务', desc: '花钱买了服务，但不清楚服务是否真实完成、质量如何。' },
      { title: '不知道钱花到哪里', desc: '老人养老服务支出不透明，子女无法查看消费明细。' },
    ],
  },
  {
    target: '银行痛点',
    icon: '🏦',
    items: [
      { title: '偏金融产品，缺少养老场景', desc: '个人养老金账户目前以开户、缴存、理财为主，缺少高频养老服务连接。' },
      { title: '客户黏性不足', desc: '单一金融产品难以提升客户活跃度和忠诚度。' },
      { title: '缺少差异化竞争优势', desc: '各大银行养老金融产品同质化严重，难以形成独特竞争力。' },
    ],
  },
];
