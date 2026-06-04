import { useState } from 'react';
import type { AssessmentFormData, AssessmentOutput } from '../types';

const initialForm: AssessmentFormData = {
  age: '',
  city: '',
  livingSituation: '',
  childrenNearby: '',
  dailyLivingAbility: '',
  cognitiveAbility: '',
  mobility: '',
  pension: '',
  childSupport: '',
  livingExpense: '',
  medicalExpense: '',
  carePreference: '',
};

const STORAGE_KEY = 'elderly_care_profile';

const cities = ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '南京', '天津', '重庆', '苏州', '长沙', '青岛', '其他城市'];

function calculateResult(data: AssessmentFormData): AssessmentOutput {
  const age = Number(data.age);
  const pension = Number(data.pension) || 0;
  const childSupport = Number(data.childSupport) || 0;
  const livingExpense = Number(data.livingExpense) || 0;
  const medicalExpense = Number(data.medicalExpense) || 0;
  const disposableBudget = pension + childSupport - livingExpense - medicalExpense;

  let score = 0;
  let riskBonus = 0;

  if (data.dailyLivingAbility === '轻度受限') score += 2;
  else if (data.dailyLivingAbility === '中度受限') score += 4;
  else if (data.dailyLivingAbility === '重度受限') score += 7;

  if (data.cognitiveAbility === '偶尔遗忘') score += 1;
  else if (data.cognitiveAbility === '明显下降') score += 3;
  else if (data.cognitiveAbility === '需要专人看护') score += 6;

  if (data.mobility === '需要拐杖或辅助') score += 2;
  else if (data.mobility === '需要他人搀扶') score += 4;
  else if (data.mobility === '长期卧床') score += 7;

  if (data.livingSituation === '独居') riskBonus += 1;
  if (data.childrenNearby === '否') riskBonus += 1;
  if (age >= 80) riskBonus += 1;

  score += riskBonus;

  let type: AssessmentOutput['type'];
  let title: string;
  let description: string;
  let color: AssessmentOutput['color'];
  let recommendedTier: AssessmentOutput['recommendedTier'] = null;

  if (score >= 10) {
    type = 'A';
    title = '可能符合长护险申请条件';
    color = 'blue';
    description =
      '经专业评估，老人存在较高失能风险（评估分≥10），建议尽快进行正式长护险评定。请准备身份证明、医保参保信息、病历资料等材料，前往当地医保经办机构或社区服务中心咨询正式评定流程。';
    recommendedTier = 'comprehensive';
  } else if (score >= 4) {
    type = 'B';
    title = '暂未达到长护险门槛，但存在照护需求';
    color = 'orange';
    description =
      '经专业评估，老人目前可能暂未达到长护险正式申请门槛（评估分4-9），但已存在明确照护需求。建议优先选择社区助餐、陪诊、助浴助洁、日间照料或上门护理等补充服务。建议定期关注身体状况变化，必要时重新评估。';
    recommendedTier = 'moderate';
  } else {
    type = 'C';
    title = '基本自理，建议预防性健康管理';
    color = 'green';
    description =
      '经专业评估，老人目前整体自理能力较好（评估分<4），建议重点关注健康管理、慢病监测、适老化预防、定期体检和社区活动。通过预防性措施延缓身体机能下降，降低未来照护需求。';
    recommendedTier = 'basic';
  }

  return { type, title, description, color, disposableBudget: Math.max(0, disposableBudget), recommendedTier };
}

interface Props {
  onResult: (result: AssessmentOutput) => void;
}

export default function AssessmentForm({ onResult }: Props) {
  const [form, setForm] = useState<AssessmentFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof AssessmentFormData, string>>>({});
  const [assessorName, setAssessorName] = useState('');
  const [assessorRole, setAssessorRole] = useState('');
  const [assessorOrg, setAssessorOrg] = useState('');
  const [elderlyName, setElderlyName] = useState('');
  const [elderlyIdCard, setElderlyIdCard] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<AssessmentOutput | null>(null);

  const update = (field: keyof AssessmentFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof AssessmentFormData, string>> = {};
    if (!form.age || Number(form.age) < 40 || Number(form.age) > 120) errs.age = '请输入有效年龄（40-120岁）';
    if (!form.city) errs.city = '请选择城市';
    if (!form.livingSituation) errs.livingSituation = '请选择居住情况';
    if (!form.childrenNearby) errs.childrenNearby = '请选择';
    if (!form.dailyLivingAbility) errs.dailyLivingAbility = '请选择日常生活能力';
    if (!form.cognitiveAbility) errs.cognitiveAbility = '请选择认知能力';
    if (!form.mobility) errs.mobility = '请选择行动能力';
    if (!form.carePreference) errs.carePreference = '请选择养老服务偏好';
    if (!assessorName.trim()) errs.age = '请输入评估人员姓名';
    if (!assessorRole) errs.age = '请选择评估人员角色';
    if (!elderlyName.trim()) errs.age = '请输入被评估老人姓名';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = calculateResult(form);
    setCalculatedResult(result);
    setShowResult(true);
    onResult(result);
    setTimeout(() => {
      const el = document.getElementById('assessment-result');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setAssessorName('');
    setAssessorRole('');
    setAssessorOrg('');
    setElderlyName('');
    setElderlyIdCard('');
    setShowResult(false);
    setCalculatedResult(null);
  };

  const selectClass = "w-full px-4 py-3 text-body border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all appearance-none";
  const inputClass = "w-full px-4 py-3 text-body border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all";
  const labelClass = "block text-base font-semibold text-gray-700 mb-2";
  const errorClass = "text-sm text-red-500 mt-1";

  return (
    <section id="assessment" className="bg-blue-gray-50">
      <div className="section-container">
        <h2 className="section-title">六、专业上门评估</h2>
        <p className="section-subtitle">
          由银行工作人员与医护人员共同上门，使用专业评估表对老人身体状况进行全面评估并打分。
          <br />
          <span className="text-sm text-gray-400">评估后，老人可绑定身份信息，系统将基于评估结果推荐个性化服务方案。</span>
        </p>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card !shadow-soft space-y-6">
            {/* ======== 评估人员信息 ======== */}
            <div className="bg-primary-50 rounded-xl p-5 space-y-4 border border-primary-200">
              <p className="text-sm font-bold text-primary-700 flex items-center gap-2">
                <span>🩺</span> 评估执行信息
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">评估人员姓名 <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="请输入评估人员姓名"
                    value={assessorName}
                    onChange={(e) => { setAssessorName(e.target.value); setErrors((prev) => ({ ...prev, age: undefined })); }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">评估角色 <span className="text-red-400">*</span></label>
                  <select
                    className={selectClass}
                    value={assessorRole}
                    onChange={(e) => { setAssessorRole(e.target.value); setErrors((prev) => ({ ...prev, age: undefined })); }}
                  >
                    <option value="">请选择角色</option>
                    <option value="bank">银行工作人员</option>
                    <option value="medical">医护人员（医生/护士）</option>
                    <option value="both">银行 + 医护联合评估</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">所属机构（选填）</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="如：XX银行XX分行 / XX社区卫生服务中心"
                  value={assessorOrg}
                  onChange={(e) => setAssessorOrg(e.target.value)}
                />
              </div>
            </div>

            {/* ======== 被评估老人信息 ======== */}
            <div className="bg-care-50 rounded-xl p-5 space-y-4 border border-care-200">
              <p className="text-sm font-bold text-care-700 flex items-center gap-2">
                <span>👴</span> 被评估老人基本信息
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">老人姓名 <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="请输入老人姓名"
                    value={elderlyName}
                    onChange={(e) => { setElderlyName(e.target.value); setErrors((prev) => ({ ...prev, age: undefined })); }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">身份证号（选填，仅本机）</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="用于身份绑定核验"
                    value={elderlyIdCard}
                    onChange={(e) => setElderlyIdCard(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`${labelClass} !text-sm !font-medium`}>年龄 <span className="text-red-400">*</span></label>
                  <input
                    type="number"
                    className={inputClass}
                    placeholder="40-120"
                    value={form.age}
                    onChange={(e) => update('age', e.target.value)}
                  />
                  {errors.age && <p className={errorClass}>{errors.age}</p>}
                </div>
                <div>
                  <label className={`${labelClass} !text-sm !font-medium`}>所在城市 <span className="text-red-400">*</span></label>
                  <select className={selectClass} value={form.city} onChange={(e) => update('city', e.target.value)}>
                    <option value="">请选择城市</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <p className={errorClass}>{errors.city}</p>}
                </div>
              </div>
            </div>

            {/* ======== 专业评估项目 ======== */}
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span>📋</span> 专业评估项目（参照长护险失能等级评估标准）
              </p>

              <div className="space-y-4">
                {/* Living Situation */}
                <div>
                  <label className={labelClass}>1. 居住情况 <span className="text-red-400">*</span></label>
                  <select className={selectClass} value={form.livingSituation} onChange={(e) => update('livingSituation', e.target.value)}>
                    <option value="">请选择</option>
                    <option value="独居">独居（+1风险分）</option>
                    <option value="与配偶同住">与配偶同住</option>
                    <option value="与子女同住">与子女同住</option>
                    <option value="机构居住">机构居住</option>
                  </select>
                </div>

                {/* Children Nearby */}
                <div>
                  <label className={labelClass}>2. 子女是否同城 <span className="text-red-400">*</span></label>
                  <div className="flex gap-4">
                    {['是', '否'].map((opt) => (
                      <label key={opt} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                        form.childrenNearby === opt ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="childrenNearby"
                          value={opt}
                          checked={form.childrenNearby === opt}
                          onChange={(e) => update('childrenNearby', e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-base font-medium">{opt === '是' ? '✓ 是' : '✗ 否（+1风险分）'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Daily Living Ability */}
                <div>
                  <label className={labelClass}>3. 日常生活活动能力（ADL） <span className="text-red-400">*</span></label>
                  <p className="text-xs text-gray-400 mb-2">评估进食、洗澡、穿衣、如厕、转移等基本日常生活自理程度</p>
                  <select className={selectClass} value={form.dailyLivingAbility} onChange={(e) => update('dailyLivingAbility', e.target.value)}>
                    <option value="">请选择</option>
                    <option value="完全自理">完全自理（0分）</option>
                    <option value="轻度受限">轻度受限 — 部分活动需帮助（+2分）</option>
                    <option value="中度受限">中度受限 — 多项活动需帮助（+4分）</option>
                    <option value="重度受限">重度受限 — 大部分依赖他人（+7分）</option>
                  </select>
                </div>

                {/* Cognitive Ability */}
                <div>
                  <label className={labelClass}>4. 认知能力（IADL相关） <span className="text-red-400">*</span></label>
                  <p className="text-xs text-gray-400 mb-2">评估记忆、判断、沟通、服药管理等工具性日常生活能力</p>
                  <select className={selectClass} value={form.cognitiveAbility} onChange={(e) => update('cognitiveAbility', e.target.value)}>
                    <option value="">请选择</option>
                    <option value="正常">正常（0分）</option>
                    <option value="偶尔遗忘">偶尔遗忘（+1分）</option>
                    <option value="明显下降">明显下降 — 经常忘事（+3分）</option>
                    <option value="需要专人看护">需要专人看护（+6分）</option>
                  </select>
                </div>

                {/* Mobility */}
                <div>
                  <label className={labelClass}>5. 行动与移动能力 <span className="text-red-400">*</span></label>
                  <p className="text-xs text-gray-400 mb-2">评估行走、上下楼梯、床椅转移等移动能力</p>
                  <select className={selectClass} value={form.mobility} onChange={(e) => update('mobility', e.target.value)}>
                    <option value="">请选择</option>
                    <option value="可独立行动">可独立行动（0分）</option>
                    <option value="需要拐杖或辅助">需要拐杖或辅助器具（+2分）</option>
                    <option value="需要他人搀扶">需要他人搀扶（+4分）</option>
                    <option value="长期卧床">长期卧床（+7分）</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Care Preference */}
            <div>
              <label className={labelClass}>6. 养老服务偏好 <span className="text-red-400">*</span></label>
              <select className={selectClass} value={form.carePreference} onChange={(e) => update('carePreference', e.target.value)}>
                <option value="">请选择</option>
                <option value="居家照护">居家照护</option>
                <option value="社区日托">社区日托</option>
                <option value="上门护理">上门护理</option>
                <option value="养老机构">养老机构</option>
                <option value="暂无偏好">暂无偏好</option>
              </select>
            </div>

            {/* Financial Info — Secondary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">收入与支出信息（选填，用于辅助测算可负担预算）</p>
              <p className="text-xs text-gray-400 -mt-2">
                此部分为辅助参考，不影响评估等级判定。评估等级仅由上述专业评估项目打分决定。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">每月养老金（元）</label>
                  <input type="number" className={inputClass} placeholder="如：3500" value={form.pension} onChange={(e) => update('pension', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">子女每月支持（元）</label>
                  <input type="number" className={inputClass} placeholder="如：1000" value={form.childSupport} onChange={(e) => update('childSupport', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">基本生活支出（元/月）</label>
                  <input type="number" className={inputClass} placeholder="如：1500" value={form.livingExpense} onChange={(e) => update('livingExpense', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">医疗药品支出（元/月）</label>
                  <input type="number" className={inputClass} placeholder="如：500" value={form.medicalExpense} onChange={(e) => update('medicalExpense', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button type="submit" className="btn btn-primary flex-1 min-h-[56px]">
                提交专业评估 · 生成评估报告
              </button>
              <button type="button" onClick={handleReset} className="btn btn-outline border-gray-300 text-gray-600 hover:bg-gray-50 min-h-[56px]">
                重置
              </button>
            </div>
          </form>

          {/* Inline result display */}
          {showResult && calculatedResult && (
            <AssessmentResultInline result={calculatedResult} elderlyName={elderlyName} assessorName={assessorName} assessorRole={assessorRole} />
          )}

          {/* Disclaimer */}
          <p className="text-sm text-gray-400 text-center mt-6">
            <span className="font-bold">⚠️ 重要提示：</span>
            本评估结果基于专业评估表打分，为预评估参考。正式长护险评定需由医保经办机构指定评估机构完成。
          </p>
        </div>

        <div id="assessment-result" />
      </div>
    </section>
  );
}

function AssessmentResultInline({
  result,
  elderlyName,
  assessorName,
  assessorRole,
}: {
  result: AssessmentOutput;
  elderlyName: string;
  assessorName: string;
  assessorRole: string;
}) {
  const roleLabel = assessorRole === 'bank' ? '银行工作人员' : assessorRole === 'medical' ? '医护人员' : '银行+医护联合评估';

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

  const colors = colorMap[result.color];

  return (
    <div className={`${colors.card} rounded-2xl p-8 shadow-card-hover mt-6`}>
      <div className="text-center mb-6">
        <span className="text-5xl block mb-3">{colors.emoji}</span>
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${colors.badge} mb-3`}>
          {colors.label}
        </span>
        <h3 className="text-2xl font-bold">{result.title}</h3>
      </div>

      <div className="bg-white/10 rounded-xl p-5 mb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-white/60">被评估人</span>
            <p className="text-white font-bold">{elderlyName || '—'}</p>
          </div>
          <div>
            <span className="text-white/60">评估人员</span>
            <p className="text-white font-bold">{assessorName}（{roleLabel}）</p>
          </div>
        </div>
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
          <button
            onClick={() => {
              const el = document.getElementById('recommendation');
              if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="btn bg-white !text-gray-800 hover:bg-gray-100 flex-1"
          >
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

export { calculateResult };
