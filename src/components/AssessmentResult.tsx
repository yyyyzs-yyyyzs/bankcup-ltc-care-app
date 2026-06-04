import type { AssessmentOutput } from '../types';

interface Props {
  result: AssessmentOutput;
  onViewRecommendation: () => void;
}

const colorMap = {
  blue: {
    card: 'bg-gradient-to-br from-primary-600 to-primary-800 text-white',
    badge: 'bg-white/20 text-white',
    label: '等级A — 较高失能风险',
    emoji: '🔵',
  },
  orange: {
    card: 'bg-gradient-to-br from-warm-400 to-warm-600 text-white',
    badge: 'bg-white/20 text-white',
    label: '等级B — 存在照护需求',
    emoji: '🟠',
  },
  green: {
    card: 'bg-gradient-to-br from-care-400 to-care-600 text-white',
    badge: 'bg-white/20 text-white',
    label: '等级C — 基本自理',
    emoji: '🟢',
  },
};

export default function AssessmentResult({ result, onViewRecommendation }: Props) {
  const colors = colorMap[result.color];

  return (
    <div className={`${colors.card} rounded-2xl p-8 shadow-card-hover max-w-2xl mx-auto`}>
      <div className="text-center mb-6">
        <span className="text-5xl block mb-3">{colors.emoji}</span>
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${colors.badge} mb-3`}>
          {colors.label}
        </span>
        <h3 className="text-2xl font-bold">{result.title}</h3>
      </div>

      <div className="bg-white/10 rounded-xl p-4 mb-4 text-center">
        <p className="text-white/70 text-xs uppercase tracking-wide">评估方式</p>
        <p className="text-white font-bold text-sm">银行工作人员 + 医护人员联合上门专业评估</p>
      </div>

      <p className="text-white/90 text-body leading-relaxed mb-6">{result.description}</p>

      <div className="bg-white/10 rounded-xl p-5 space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm">参考可支配养老服务预算</span>
          <span className="text-2xl font-bold">{result.disposableBudget.toLocaleString()} 元/月</span>
        </div>
        {result.recommendedTier && (
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm">匹配服务方案</span>
            <span className="text-lg font-bold">
              {result.recommendedTier === 'basic' ? '预防保健方案' : result.recommendedTier === 'moderate' ? '稳健照护方案' : '综合护理方案'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {result.recommendedTier && (
          <button onClick={onViewRecommendation} className="btn bg-white !text-gray-800 hover:bg-gray-100 flex-1">
            查看推荐服务方案
          </button>
        )}
        <button
          onClick={() => {
            const el = document.getElementById('assessment');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn border border-white/30 text-white hover:bg-white/10 flex-1"
        >
          重新评估
        </button>
      </div>

      <p className="text-white/60 text-xs text-center mt-4">
        ⚠️ 本结果基于专业评估表打分，为预评估参考。正式长护险评定需由医保经办机构指定评估机构完成。
      </p>
    </div>
  );
}
