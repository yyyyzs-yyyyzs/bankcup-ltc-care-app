import { useState } from 'react';

interface Question {
  id: string;
  question: string;
  icon: string;
  options: { label: string; value: string; score?: number }[];
}

const questions: Question[] = [
  {
    id: 'living',
    question: '老人的居住情况是？',
    icon: '🏠',
    options: [
      { label: '与子女同住', value: 'with_children' },
      { label: '与配偶同住', value: 'with_spouse' },
      { label: '独居', value: 'alone' },
      { label: '已入住养老机构', value: 'institution' },
    ],
  },
  {
    id: 'mobility',
    question: '老人的行动能力如何？',
    icon: '🚶',
    options: [
      { label: '行动自如，无需辅助', value: 'independent' },
      { label: '需要使用拐杖等辅助工具', value: 'cane' },
      { label: '需要他人搀扶', value: 'assisted' },
      { label: '长期卧床或坐轮椅', value: 'bedridden' },
    ],
  },
  {
    id: 'daily',
    question: '日常生活自理能力如何？',
    icon: '🍽️',
    options: [
      { label: '完全自理（吃饭、洗澡、穿衣均可独立完成）', value: 'full' },
      { label: '部分需要帮助（如洗澡、做饭需要协助）', value: 'partial' },
      { label: '大部分需要帮助', value: 'mostly' },
      { label: '完全依赖他人照顾', value: 'dependent' },
    ],
  },
  {
    id: 'cognitive',
    question: '认知能力状况如何？',
    icon: '🧠',
    options: [
      { label: '认知清晰，记忆力正常', value: 'clear' },
      { label: '偶尔健忘但不影响日常生活', value: 'mild' },
      { label: '明显记忆力下降，有时迷路', value: 'moderate' },
      { label: '确诊认知障碍，需要专人看护', value: 'severe' },
    ],
  },
  {
    id: 'medical',
    question: '是否有慢性病需要定期管理？',
    icon: '💊',
    options: [
      { label: '无慢性病', value: 'none' },
      { label: '1-2种慢性病（如高血压、糖尿病）', value: 'mild' },
      { label: '3种以上慢性病', value: 'multiple' },
      { label: '有严重疾病需要持续医疗护理', value: 'serious' },
    ],
  },
  {
    id: 'budget',
    question: '每月可用于养老服务的预算约为？',
    icon: '💰',
    options: [
      { label: '1,000元以下', value: 'low' },
      { label: '1,000-3,000元', value: 'medium' },
      { label: '3,000-6,000元', value: 'high' },
      { label: '6,000元以上', value: 'premium' },
    ],
  },
  {
    id: 'preference',
    question: '养老偏好是什么？',
    icon: '❤️',
    options: [
      { label: '尽量在家养老', value: 'home' },
      { label: '白天去社区日间照料中心', value: 'community' },
      { label: '考虑入住养老机构', value: 'institution' },
      { label: '不确定，想了解各种方案', value: 'unknown' },
    ],
  },
];

const generatePlan = (answers: Record<string, string>) => {
  const needs: string[] = [];
  const services: string[] = [];
  const priority: string[] = [];

  if (answers.mobility === 'bedridden' || answers.mobility === 'assisted') {
    needs.push('行动支持需求较高');
    services.push('上门护理服务（每周3-5次）');
    services.push('康复训练（物理治疗/作业治疗）');
    priority.push('优先申请长护险正式评定');
  } else if (answers.mobility === 'cane') {
    needs.push('需要适度行动辅助');
    services.push('适老化改造（安装扶手、防滑处理）');
    services.push('陪诊服务（按需）');
  }

  if (answers.daily === 'dependent' || answers.daily === 'mostly') {
    needs.push('日常生活照护需求高');
    services.push('居家照护服务（每日）');
    services.push('助浴助洁服务（每周2-3次）');
  } else if (answers.daily === 'partial') {
    needs.push('部分生活需要协助');
    services.push('社区助餐服务（每日）');
    services.push('助洁服务（每周1-2次）');
  }

  if (answers.cognitive === 'severe' || answers.cognitive === 'moderate') {
    needs.push('认知照护需求');
    services.push('认知症专项照护服务');
    services.push('日间照料中心（防走失监护）');
    priority.push('建议进行专业认知评估');
  }

  if (answers.living === 'alone') {
    needs.push('独居风险需关注');
    services.push('紧急呼叫设备安装');
    services.push('定期关怀访视（每周2-3次）');
    priority.push('建议加入社区独居老人关爱名单');
  }

  if (answers.medical === 'serious' || answers.medical === 'multiple') {
    needs.push('医疗护理需求');
    services.push('上门医疗护理（换药、注射等）');
    services.push('慢病管理服务');
  }

  if (answers.budget === 'low' || answers.budget === 'medium') {
    priority.push('建议了解养老服务补贴政策');
    priority.push('关注社区免费或低偿服务资源');
  }

  let tier = 'basic';
  if (['dependent', 'mostly', 'bedridden', 'severe'].some((v) =>
    [answers.daily, answers.mobility, answers.cognitive].includes(v)
  )) {
    tier = 'comprehensive';
  } else if (['partial', 'cane', 'assisted', 'moderate', 'multiple'].some((v) =>
    [answers.daily, answers.mobility, answers.cognitive, answers.medical].includes(v)
  )) {
    tier = 'moderate';
  }

  if (services.length === 0) {
    services.push('定期健康体检');
    services.push('社区健康讲座与社交活动');
    services.push('预防性健康管理');
  }

  return { needs: [...new Set(needs)], services: [...new Set(services)], priority: [...new Set(priority)], tier };
};

export default function VirtualCareAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [plan, setPlan] = useState<ReturnType<typeof generatePlan> | null>(null);

  const current = questions[step];
  const tierLabels: Record<string, { title: string; emoji: string; color: string }> = {
    basic: { title: '基础预防型', emoji: '🌿', color: 'text-care-600 bg-care-50 border-care-300' },
    moderate: { title: '稳健照护型', emoji: '💙', color: 'text-primary-600 bg-primary-50 border-primary-300' },
    comprehensive: { title: '综合护理型', emoji: '🧡', color: 'text-warm-600 bg-warm-50 border-warm-300' },
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setPlan(generatePlan(newAnswers));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setPlan(null);
  };

  return (
    <section id="virtual-advisor" className="bg-gradient-to-b from-blue-gray-50 to-white">
      <div className="section-container">
        <h2 className="section-title">虚拟照护顾问</h2>
        <p className="section-subtitle">
          借鉴日本"介护经理人（Care Manager）"理念，通过几个简单问题为您生成个性化照护建议
        </p>

        <div className="max-w-2xl mx-auto">
          {!plan ? (
            <div className="card border-2 border-primary-100 shadow-card-hover">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      i < step ? 'bg-primary-500' : i === step ? 'bg-primary-300 animate-pulse' : 'bg-gray-200'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 min-w-[40px]">{step + 1}/{questions.length}</span>
              </div>

              {/* Question */}
              <div className="text-center mb-6">
                <span className="text-5xl block mb-4">{current.icon}</span>
                <h3 className="text-heading font-bold text-gray-900 mb-2">{current.question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 text-body text-gray-700 hover:text-gray-900 font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Plan */
            <div className="space-y-6">
              <div className={`card border-2 ${tierLabels[plan.tier].color} text-center`}>
                <span className="text-6xl block mb-3">{tierLabels[plan.tier].emoji}</span>
                <h3 className="text-display font-black text-gray-900 mb-2">
                  {tierLabels[plan.tier].title}
                </h3>
                <p className="text-gray-500">基于您的回答，我们为您生成了以下照护建议</p>
              </div>

              <div className="card">
                <h4 className="text-card-title font-bold text-gray-900 mb-4">📋 需求分析</h4>
                <div className="flex flex-wrap gap-2">
                  {plan.needs.map((n) => (
                    <span key={n} className="tag tag-orange text-sm">{n}</span>
                  ))}
                </div>
              </div>

              <div className="card border-l-4 border-care-500">
                <h4 className="text-card-title font-bold text-gray-900 mb-4">🎯 推荐服务</h4>
                <ul className="space-y-2">
                  {plan.services.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-body text-gray-700">
                      <span className="text-care-500 mt-0.5">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card border-l-4 border-warm-500">
                <h4 className="text-card-title font-bold text-gray-900 mb-4">⚡ 优先行动</h4>
                <ul className="space-y-2">
                  {plan.priority.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-body text-gray-700">
                      <span className="text-2xl mr-1">📌</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center space-y-3">
                <button onClick={reset} className="btn btn-primary">
                  🔄 重新评估
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  * 本评估为简化参考模型。所有建议不代替正式的长护险评定和专业医疗评估。建议前往本页面的"预评估体验"模块进行更详细的评估。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
