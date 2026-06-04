// Simulated LLM responses for the elderly care chatbot
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: { id: string; title: string; icon: string; desc: string }[];
}

const serviceDB = [
  { keywords: ['洗澡', '助浴', '洗浴', '沐浴', '擦浴'], module: 'home-care', service: '助浴服务', desc: '上门助浴、社区助浴点、卧床擦浴', icon: '🛁' },
  { keywords: ['吃饭', '做饭', '餐', '送餐', '饮食', '营养餐', '食堂'], module: 'home-care', service: '助餐服务', desc: '老年餐配送、社区食堂、营养餐', icon: '🍽️' },
  { keywords: ['打扫', '清洁', '卫生', '洗衣', '床单'], module: 'home-care', service: '助洁服务', desc: '居家清洁、床单更换、厨房卫生间清洁', icon: '🧹' },
  { keywords: ['走路', '散步', '出行', '外出', '轮椅', '上下楼'], module: 'home-care', service: '助行服务', desc: '陪同散步、轮椅推行、外出陪护', icon: '🦽' },
  { keywords: ['翻身', '穿衣', '起床', '洗漱', '床椅'], module: 'home-care', service: '起居照护', desc: '协助穿衣洗漱、翻身、床椅转移', icon: '🛌' },
  { keywords: ['失禁', '尿垫', '如厕', '便秘', '排便'], module: 'home-care', service: '如厕护理', desc: '协助如厕、失禁护理、尿垫更换', icon: '🚽' },
  { keywords: ['吃药', '用药', '服药', '药盒', '慢病药'], module: 'home-care', service: '用药提醒', desc: '定时提醒服药、药盒整理、用药记录', icon: '💊' },
  { keywords: ['独居', '探访', '看望', '孤单', '安全确认'], module: 'home-care', service: '定期探访', desc: '每周上门探访、独居安全确认', icon: '🏠' },
  { keywords: ['护士', '换药', '伤口', '血压', '血糖', '管路', '护理'], module: 'medical-rehab', service: '上门护理', desc: '血压血糖测量、伤口护理、管路护理', icon: '💉' },
  { keywords: ['康复', '中风', '偏瘫', '关节', '术后', '训练', '理疗'], module: 'medical-rehab', service: '康复训练', desc: '术后康复、偏瘫康复、关节康复', icon: '🦵' },
  { keywords: ['高血压', '糖尿病', '慢病', '血压', '随访'], module: 'medical-rehab', service: '慢病管理', desc: '高血压/糖尿病管理、风险随访', icon: '📊' },
  { keywords: ['认知', '记忆', '痴呆', '失智', '筛查', '忘事'], module: 'medical-rehab', service: '认知筛查', desc: '认知功能初筛、失智风险提示', icon: '🧠' },
  { keywords: ['抑郁', '情绪', '心理', '焦虑', '孤独'], module: 'medical-rehab', service: '心理支持', desc: '情绪疏导、抑郁筛查、心理关怀', icon: '💝' },
  { keywords: ['看病', '挂号', '排队', '取药', '陪诊', '就医', '医院'], module: 'medical-escort', service: '陪诊服务', desc: '陪同挂号就诊、取药、复诊', icon: '🏥' },
  { keywords: ['住院', '出院', '手续', '床位'], module: 'medical-escort', service: '住院协助', desc: '入院/出院手续办理、床位咨询', icon: '🛏️' },
  { keywords: ['接送', '交通', '车', '出行', '往返'], module: 'medical-escort', service: '就医交通', desc: '无障碍车辆、轮椅车接送', icon: '🚗' },
  { keywords: ['白天', '日托', '日照', '日间', '托管'], module: 'daycare', service: '日间照料', desc: '白天照护、午餐午休、活动陪伴', icon: '☀️' },
  { keywords: ['活动', '社交', '老年课', '棋牌', '手工', '兴趣'], module: 'daycare', service: '社交活动', desc: '老年课堂、兴趣小组、节日活动', icon: '🎨' },
  { keywords: ['机构', '养老院', '护理院', '入住', '公寓'], module: 'institution', service: '养老机构', desc: '机构查询、参观预约、入住评估', icon: '🏡' },
  { keywords: ['短期', '短住', '托养', '暂住', '喘息'], module: 'institution', service: '短期托养', desc: '7-30天短期入住、机构喘息', icon: '🏨' },
  { keywords: ['轮椅', '助行器', '护理床', '气垫床', '辅具', '租赁'], module: 'equipment', service: '辅具租赁', desc: '轮椅、护理床、助行器租赁', icon: '🦼' },
  { keywords: ['改造', '扶手', '防滑', '坡道', '浴室', '适老'], module: 'equipment', service: '适老化改造', desc: '浴室改造、扶手安装、门槛坡道', icon: '🔧' },
  { keywords: ['跌倒', '摔倒', '平衡', '不稳', '风险'], module: 'assessment', service: '跌倒风险评估', desc: '检查行动能力、平衡能力、居家风险', icon: '⚠️' },
  { keywords: ['长护险', '评估', '失能', '能力', '等级', '鉴定'], module: 'assessment', service: '失能风险预评估', desc: '判断是否需要申请长护险', icon: '📋' },
  { keywords: ['预算', '费用', '价格', '多少钱', '花费'], module: 'assessment', service: '养老服务预算测算', desc: '根据身体状况推荐服务包及费用', icon: '💰' },
];

const greetingResponses = ['你好', '您好', 'hi', 'hello', '嗨', '在吗', '在不在'];
const thanksResponses = ['谢谢', '感谢', '多谢', 'thanks', 'thank'];

export function getChatResponse(userInput: string): ChatMessage {
  const input = userInput.toLowerCase().trim();

  // Greeting
  if (greetingResponses.some((g) => input.includes(g))) {
    return {
      role: 'assistant',
      content: '您好！我是银龄服务助手的智能客服。您可以告诉我老人的身体状况、生活困难或照护需求，我来帮您分析适合的养老服务。\n\n例如您可以说：\n• "老人洗澡困难，走路也不太稳"\n• "想给80岁的独居父亲找服务"\n• "老人中风后需要康复"\n• "想了解长护险怎么申请"',
    };
  }

  if (thanksResponses.some((t) => input.includes(t))) {
    return { role: 'assistant', content: '不客气！如有其他问题随时问我。祝您和家人健康平安 🌿' };
  }

  // Match services
  const matched = serviceDB.filter((s) => s.keywords.some((kw) => input.includes(kw)));

  if (matched.length > 0) {
    const unique = matched.filter((m, i, arr) => arr.findIndex((x) => x.service === m.service) === i).slice(0, 4);
    return {
      role: 'assistant',
      content: `根据您描述的情况，我为您推荐以下${unique.length}项服务：`,
      recommendations: unique.map((m) => ({
        id: m.module,
        title: m.service,
        icon: m.icon,
        desc: m.desc,
      })),
    };
  }

  // General fallback
  return {
    role: 'assistant',
    content: '我了解到您想咨询养老服务方面的问题。为了更好地帮您分析，请告诉我更多细节：\n\n• 老人的年龄和居住情况（独居/与子女同住）\n• 身体方面有哪些困难（如洗澡、走路、做饭、看病等）\n• 是否患有慢病（高血压、糖尿病等）\n• 是否有术后康复或认知方面的需求\n\n您也可以直接问我："老人中风偏瘫需要什么服务？"',
  };
}

export const suggestedQuestions = [
  '老人洗澡困难、走路不稳怎么办',
  '80岁独居老人适合什么服务',
  '中风偏瘫后需要哪些康复服务',
  '长护险怎么申请评估',
  '上门护理和陪诊怎么收费',
  '子女怎么帮老人预约服务',
];
