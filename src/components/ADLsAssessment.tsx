import { useState, useMemo } from 'react';

interface ADLsItem {
  id: string;
  category: string;
  icon: string;
  question: string;
  options: { label: string; score: number; desc?: string }[];
}

const barthelItems: ADLsItem[] = [
  {
    id: 'eating', category: '进食', icon: '🍽️',
    question: '吃饭时是否需要帮助？',
    options: [
      { label: '完全独立，不需帮助', score: 10, desc: '能在合理时间内自行使用餐具进食' },
      { label: '需要部分帮助（如切食物、盛饭）', score: 5, desc: '需要协助准备或切割食物，但可自行进食' },
      { label: '完全依赖他人喂食', score: 0, desc: '无法自行进食，需他人喂食或鼻饲' },
    ],
  },
  {
    id: 'bathing', category: '洗澡', icon: '🛁',
    question: '洗澡时是否需要帮助？',
    options: [
      { label: '可独立完成洗澡', score: 5 },
      { label: '需要他人帮助洗澡', score: 0, desc: '需要他人协助擦洗身体或进入浴缸' },
    ],
  },
  {
    id: 'grooming', category: '个人卫生', icon: '🪥',
    question: '洗脸、刷牙、梳头、刮胡子是否需要帮助？',
    options: [
      { label: '可独立完成', score: 5 },
      { label: '需要他人帮助', score: 0 },
    ],
  },
  {
    id: 'dressing', category: '穿衣', icon: '👕',
    question: '穿脱衣服是否需要帮助？',
    options: [
      { label: '完全独立，包括系鞋带、扣扣子', score: 10 },
      { label: '需要部分帮助，但可完成一半以上', score: 5 },
      { label: '完全依赖他人帮助穿衣', score: 0 },
    ],
  },
  {
    id: 'toilet', category: '如厕', icon: '🚽',
    question: '如厕是否需要帮助？',
    options: [
      { label: '完全独立，包括脱穿裤子和清洁', score: 10 },
      { label: '需要部分帮助（如帮助平衡、使用便盆）', score: 5 },
      { label: '完全依赖他人/使用导尿管', score: 0 },
    ],
  },
  {
    id: 'transfer', category: '床椅转移', icon: '🪑',
    question: '从床移动到椅子或轮椅是否需要帮助？',
    options: [
      { label: '完全独立，包括锁定轮椅和揭开脚踏板', score: 15 },
      { label: '需少量帮助（口头指导或轻微身体协助）', score: 10 },
      { label: '可独立坐起，但转移需大量帮助', score: 5 },
      { label: '完全无法坐起，需两人协助转移', score: 0 },
    ],
  },
  {
    id: 'mobility', category: '平地行走', icon: '🚶',
    question: '在平地上行走是否需要帮助？',
    options: [
      { label: '独立行走45米以上（可使用辅助工具）', score: 15 },
      { label: '需一人协助行走45米以上', score: 10 },
      { label: '使用轮椅，可自行操作45米以上', score: 5 },
      { label: '无法行走，轮椅也需他人推动', score: 0 },
    ],
  },
  {
    id: 'stairs', category: '上下楼梯', icon: '🪜',
    question: '上下楼梯是否需要帮助？',
    options: [
      { label: '独立上下楼梯（可使用扶手）', score: 10 },
      { label: '需要他人帮助或口头指导', score: 5 },
      { label: '完全无法上下楼梯', score: 0 },
    ],
  },
  {
    id: 'bowel', category: '大便控制', icon: '🧻',
    question: '大便是否能控制？',
    options: [
      { label: '能够完全控制，无失禁', score: 10 },
      { label: '偶尔失禁（每周少于1次）', score: 5 },
      { label: '经常失禁或需灌肠辅助', score: 0 },
    ],
  },
  {
    id: 'bladder', category: '小便控制', icon: '🚰',
    question: '小便是否能控制？',
    options: [
      { label: '能够完全控制，无失禁', score: 10 },
      { label: '偶尔失禁（每天少于1次）', score: 5 },
      { label: '经常失禁或需导尿管', score: 0 },
    ],
  },
];

const iadlItems = [
  { id: 'shopping', category: '购物', icon: '🛒', question: '是否能独立完成日常购物？', options: [
    { label: '独立完成所有购物', score: 1 },
    { label: '可完成小量购物', score: 0.5 },
    { label: '需要他人陪同购物', score: 0 },
    { label: '完全无法购物', score: -1 },
  ]},
  { id: 'cooking', category: '做饭', icon: '🍳', question: '是否能独立准备餐食？', options: [
    { label: '独立计划并烹饪', score: 1 },
    { label: '可加热预制食物', score: 0.5 },
    { label: '需要他人做饭', score: 0 },
    { label: '完全无法准备餐食', score: -1 },
  ]},
  { id: 'housework', category: '家务', icon: '🧹', question: '是否能完成日常家务？', options: [
    { label: '独立完成家务', score: 1 },
    { label: '可完成轻度家务', score: 0.5 },
    { label: '需要他人帮助', score: 0 },
    { label: '完全无法做家务', score: -1 },
  ]},
  { id: 'transport', category: '交通出行', icon: '🚌', question: '是否能独立使用交通工具？', options: [
    { label: '独立使用公交/打车', score: 1 },
    { label: '仅能乘坐私家车', score: 0.5 },
    { label: '需要他人陪同', score: 0 },
    { label: '完全无法出行', score: -1 },
  ]},
  { id: 'medication', category: '服药管理', icon: '💊', question: '是否能自行管理服药？', options: [
    { label: '准确按时自行服药', score: 1 },
    { label: '需提前分药但可自行服用', score: 0.5 },
    { label: '需要他人提醒或协助', score: 0 },
    { label: '完全依赖他人管理', score: -1 },
  ]},
  { id: 'finance', category: '财务管理', icon: '💰', question: '是否能独立处理财务？', options: [
    { label: '独立管理财务', score: 1 },
    { label: '可处理日常小额支付', score: 0.5 },
    { label: '需要他人协助', score: 0 },
    { label: '完全无法处理', score: -1 },
  ]},
];

export default function ADLsAssessment() {
  const [mode, setMode] = useState<'barthel' | 'iadl'>('barthel');
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleScore = (id: string, score: number) => {
    setScores((prev) => ({ ...prev, [id]: score }));
  };

  const totalBarthel = useMemo(() => {
    return barthelItems.reduce((sum, item) => sum + (scores[item.id] || 0), 0);
  }, [scores]);

  const totalIADL = useMemo(() => {
    return iadlItems.reduce((sum, item) => sum + (scores[item.id] || 0), 0);
  }, [scores]);

  const levelBarthel = useMemo(() => {
    if (totalBarthel === 100) return { level: '完全独立', color: 'text-care-600 bg-care-50', desc: '日常生活活动能力完好，可独立生活。建议关注预防性健康管理。', recommendation: '社区健康活动、定期体检、预防性健康课程' };
    if (totalBarthel >= 61) return { level: '轻度功能缺陷', color: 'text-primary-600 bg-primary-50', desc: '基本自理，部分活动需要辅助。适合居家养老+社区服务支持。', recommendation: '适老化改造、社区助餐、定期关怀访视' };
    if (totalBarthel >= 41) return { level: '中度功能缺陷', color: 'text-warm-600 bg-warm-50', desc: '日常生活需明显帮助，建议申请长护险预评估。需要较密集的照护服务。', recommendation: '上门护理、日间照料、喘息服务、长护险正式评估' };
    if (totalBarthel >= 21) return { level: '重度功能缺陷', color: 'text-red-600 bg-red-50', desc: '日常生活活动严重受限，需要大量照护支持。强烈建议申请长护险。', recommendation: '长期上门护理、机构养老评估、24小时照护方案' };
    return { level: '完全依赖', color: 'text-red-700 bg-red-100', desc: '日常生活活动完全依赖他人，需要全天候专业照护。', recommendation: '护理型机构入住、专业医疗护理、临终关怀衔接' };
  }, [totalBarthel]);

  const levelIADL = useMemo(() => {
    if (totalIADL >= 5) return { level: '工具性活动独立', color: 'text-care-600 bg-care-50', desc: '可独立管理日常生活事务。' };
    if (totalIADL >= 3) return { level: '轻度依赖', color: 'text-primary-600 bg-primary-50', desc: '部分工具性活动需要协助，建议配置社区支持服务。' };
    if (totalIADL >= 1) return { level: '中度依赖', color: 'text-warm-600 bg-warm-50', desc: '多数工具性活动需要他人协助，建议加强照护支持。' };
    return { level: '重度依赖', color: 'text-red-600 bg-red-50', desc: '工具性活动严重依赖他人，需全面照护支持。' };
  }, [totalIADL]);

  const items = mode === 'barthel' ? barthelItems : iadlItems;
  const currentScores = mode === 'barthel' ? scores : scores;
  const maxScore = mode === 'barthel' ? 100 : 6;
  const total = mode === 'barthel' ? totalBarthel : Math.max(0, totalIADL);

  return (
    <section id="adls-assessment" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">日常生活能力评估（ADLs / IADLs）</h2>
        <p className="section-subtitle">
          参照国际通用的Barthel指数评定量表与工具性日常生活活动（IADL）量表，对老人的自理能力进行科学评估
        </p>

        {/* Mode switch */}
        <div className="flex justify-center gap-3 mb-8">
          <button onClick={() => { setMode('barthel'); setScores({}); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === 'barthel' ? 'bg-primary-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            📋 基础ADLs（Barthel指数）
          </button>
          <button onClick={() => { setMode('iadl'); setScores({}); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === 'iadl' ? 'bg-primary-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            🛠️ 工具性ADLs（IADL）
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Assessment form */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="font-bold text-gray-900">{item.category}</h4>
                </div>
                <p className="text-body text-gray-700 mb-3">{item.question}</p>
                <div className="space-y-2">
                  {item.options.map((opt) => (
                    <label
                      key={opt.label}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${
                        scores[item.id] === opt.score
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={item.id}
                        value={opt.score}
                        checked={scores[item.id] === opt.score}
                        onChange={() => handleScore(item.id, opt.score)}
                        className="accent-primary-500 w-4 h-4"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                        {opt.desc && <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>}
                      </div>
                      <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">
                        {opt.score}分
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Score panel */}
          <div className="lg:sticky lg:top-24 space-y-4 h-fit">
            <div className={`card border-2 text-center ${mode === 'barthel' ? levelBarthel.color : levelIADL.color}`}>
              <h4 className="text-sm text-gray-500 mb-2">评估结果</h4>
              <p className="text-3xl font-black mb-1">
                {total} <span className="text-base font-normal text-gray-400">/ {maxScore}分</span>
              </p>
              <p className="text-lg font-bold">
                {mode === 'barthel' ? levelBarthel.level : levelIADL.level}
              </p>
              <p className="text-sm mt-2">
                {mode === 'barthel' ? levelBarthel.desc : levelIADL.desc}
              </p>
            </div>

            {mode === 'barthel' && total > 0 && (
              <div className="card border-l-4 border-primary-500">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">📌 照护建议</h4>
                <p className="text-sm text-gray-700">{levelBarthel.recommendation}</p>
              </div>
            )}

            {/* Score breakdown */}
            <div className="card">
              <h4 className="font-bold text-gray-900 mb-3 text-sm">📊 各维度得分</h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-gray-600">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all duration-500"
                          style={{ width: `${mode === 'barthel' ? ((scores[item.id] || 0) / (item.id === 'mobility' || item.id === 'transfer' ? 15 : 10)) * 100 : ((scores[item.id] || 0) / 1) * 100}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-700 w-8 text-right">{scores[item.id] || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setScores({})} className="btn btn-outline w-full text-sm">
              🔄 重新评估
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 p-4 bg-blue-gray-50 rounded-xl text-sm text-gray-500">
          <p><span className="font-bold">量表说明：</span></p>
          <ul className="space-y-1 mt-2">
            <li>• <strong>Barthel指数（BI）</strong>：国际通用的基础日常生活活动能力评定量表，满分100分。广泛应用于康复医学、老年医学和长护险评估中。</li>
            <li>• <strong>IADL量表</strong>：评估更复杂的工具性日常活动能力，反映老人在社区中独立生活的能力。Lawton & Brody于1969年开发。</li>
            <li>• 本评估为简化版量表，仅供自我筛查参考，不代替专业医学评估和正式长护险评定。</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
