import type { AssessmentOutput } from '../types';

interface ServicePackage {
  id: string;
  title: string;
  icon: string;
  suitable: string;
  services: { name: string; desc: string }[];
  estimatedCost: string;
  insuranceAdvice: string;
  assessmentMatch: string;
}

const servicePackages: ServicePackage[] = [
  {
    id: 'comprehensive',
    title: '综合护理方案',
    icon: '🧡',
    suitable: '评估等级A（≥10分）— 存在较高失能风险，需连续专业照护',
    services: [
      { name: '护理型机构入住', desc: '24小时专业护理，适合重度失能或认知症老人' },
      { name: '长期上门护理', desc: '护士定期上门提供换药、注射、管道护理等医疗服务' },
      { name: '认知症专项照护', desc: '针对认知障碍老人的专业照护方案与环境设计' },
      { name: '康复护理训练', desc: '物理治疗、作业治疗、言语治疗等系统康复' },
      { name: '适老化居家改造', desc: '安装扶手、防滑处理、智能监测等降低居家风险' },
    ],
    estimatedCost: '4,000 - 10,000+ 元/月',
    insuranceAdvice: '强烈建议申请长护险正式评定。可叠加商业护理险，了解政府高龄津贴和护理补贴。',
    assessmentMatch: 'A',
  },
  {
    id: 'moderate',
    title: '稳健照护方案',
    icon: '💙',
    suitable: '评估等级B（4-9分）— 暂未达长护险门槛，但存在明确照护需求',
    services: [
      { name: '上门陪诊服务', desc: '协助挂号、就诊、取药、复诊全流程陪伴' },
      { name: '社区日间照料', desc: '白天托管，提供餐饮、活动、健康监测，晚上回家' },
      { name: '上门助浴助洁', desc: '专业护理员上门提供个人卫生与居室清洁服务' },
      { name: '康复训练指导', desc: '针对性的功能恢复训练，延缓身体机能下降' },
      { name: '社区助餐服务', desc: '社区食堂或送餐上门，保障营养均衡' },
    ],
    estimatedCost: '1,500 - 4,000 元/月',
    insuranceAdvice: '建议尝试长护险预评估，了解商业护理险和地方政府购买养老服务项目。',
    assessmentMatch: 'B',
  },
  {
    id: 'basic',
    title: '预防保健方案',
    icon: '🌿',
    suitable: '评估等级C（<4分）— 基本自理，重点在于预防与健康管理',
    services: [
      { name: '健康管理与监测', desc: '定期体检、慢病指标监测、健康报告解读' },
      { name: '社区食堂/送餐', desc: '解决日常用餐问题，保障营养均衡' },
      { name: '志愿陪伴与探访', desc: '社区志愿者定期探访，减少孤独感' },
      { name: '适老化预防改造', desc: '基础防滑、照明改善、紧急呼叫设备安装' },
      { name: '社区文娱活动', desc: '丰富社交与精神文化生活，延缓认知衰退' },
    ],
    estimatedCost: '500 - 1,500 元/月',
    insuranceAdvice: '建议了解当地养老服务补贴政策，关注社区免费或低偿服务资源。',
    assessmentMatch: 'C',
  },
];

interface Props {
  activeTier?: string | null;
  assessmentResult?: AssessmentOutput | null;
}

export default function ServiceRecommendation({ activeTier, assessmentResult }: Props) {
  const matchedLevel = assessmentResult?.type ?? null;

  return (
    <section id="recommendation" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">七、基于评估结果的服务方案推荐</h2>
        <p className="section-subtitle">
          根据专业上门评估的失能等级，匹配合适的养老服务方案。收入与预算作为辅助参考因素，帮助家庭做出可负担的选择。
        </p>

        {assessmentResult && (
          <div className="max-w-md mx-auto mb-10 p-5 bg-primary-50 border border-primary-200 rounded-2xl text-center">
            <p className="text-sm text-primary-600 font-medium">当前评估结果</p>
            <p className="text-2xl font-bold text-primary-800 mt-1">
              等级 {assessmentResult.type} — {assessmentResult.title}
            </p>
            {assessmentResult.disposableBudget > 0 && (
              <p className="text-sm text-primary-600 mt-2">
                可支配养老服务预算参考：约 <strong>{assessmentResult.disposableBudget.toLocaleString()} 元/月</strong>
              </p>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {servicePackages.map((pkg) => {
            const isRecommended = matchedLevel === pkg.assessmentMatch;
            const borderColor =
              pkg.id === 'comprehensive' ? 'border-warm-300 bg-warm-50/30' :
              pkg.id === 'moderate' ? 'border-primary-300 bg-primary-50/30' :
              'border-care-300 bg-care-50/30';

            return (
              <div
                key={pkg.id}
                className={`card border-2 transition-all duration-300 ${borderColor} ${
                  isRecommended
                    ? 'ring-4 ring-primary-300 scale-[1.02] shadow-card-hover'
                    : 'hover:shadow-card-hover'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{pkg.icon}</span>
                  <div>
                    <h3 className="text-card-title font-bold text-gray-900">{pkg.title}</h3>
                  </div>
                </div>

                {isRecommended && (
                  <span className="inline-block bg-primary-500 text-white text-xs px-4 py-1.5 rounded-full mb-3 font-bold animate-pulse">
                    根据评估结果推荐
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">适用人群</span>
                    <p className="text-body text-gray-700 mt-1">{pkg.suitable}</p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">推荐服务</span>
                    <ul className="mt-2 space-y-2">
                      {pkg.services.map((s) => (
                        <li key={s.name} className="flex items-start gap-2 text-sm">
                          <span className="text-primary-500 mt-0.5 flex-shrink-0">◆</span>
                          <div>
                            <span className="font-semibold text-gray-800">{s.name}</span>
                            <span className="text-gray-500"> — {s.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">预计月费用</span>
                    <p className="text-lg font-bold text-gray-900 mt-1">{pkg.estimatedCost}</p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">保险/补贴建议</span>
                    <p className="text-sm text-gray-700 mt-1">{pkg.insuranceAdvice}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!assessmentResult && (
          <div className="text-center mt-8 p-6 bg-blue-gray-50 rounded-2xl max-w-lg mx-auto">
            <p className="text-gray-500 text-sm">
              尚未完成评估。请先由银行工作人员与医护人员进行上门评估，获得评估结果后系统将自动推荐最合适的服务方案。
            </p>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            * 以上费用区间为参考估算，实际费用因城市、服务机构、服务频次等因素而异。评估结果基于专业评估表打分，服务方案匹配需结合老人实际需求与偏好调整。
          </p>
        </div>
      </div>
    </section>
  );
}
