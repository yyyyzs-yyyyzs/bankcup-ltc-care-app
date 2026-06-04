import { useState, useMemo } from 'react';

export default function PensionCalculator() {
  const [form, setForm] = useState({
    currentAge: 35,
    retireAge: 60,
    lifeExpectancy: 85,
    monthlyIncome: 15000,
    currentPension: 100000,
    monthlyContribution: 1000,
    expectedMonthlyExpense: 8000,
    socialPensionReplacement: 45,
  });

  const results = useMemo(() => {
    const yearsToRetire = form.retireAge - form.currentAge;
    const yearsInRetirement = form.lifeExpectancy - form.retireAge;
    const totalContributions = form.monthlyContribution * 12 * yearsToRetire + form.currentPension;
    const estimatedGrowth = totalContributions * 1.4; // 假设年化约4%的复利增长

    const monthlySocialPension = (form.monthlyIncome * form.socialPensionReplacement) / 100;
    const monthlyFromPrivate = estimatedGrowth / (yearsInRetirement * 12);
    const totalMonthlyPension = monthlySocialPension + monthlyFromPrivate;
    const monthlyGap = form.expectedMonthlyExpense - totalMonthlyPension;
    const gapRatio = totalMonthlyPension > 0 ? (monthlyGap / form.expectedMonthlyExpense) * 100 : 100;

    const personalPensionTaxSaved = form.monthlyContribution > 1000
      ? 12000 * 0.2
      : form.monthlyContribution * 12 * 0.2;

    return {
      yearsToRetire,
      yearsInRetirement,
      totalContributions: Math.round(totalContributions),
      estimatedGrowth: Math.round(estimatedGrowth),
      monthlySocialPension: Math.round(monthlySocialPension),
      monthlyFromPrivate: Math.round(monthlyFromPrivate),
      totalMonthlyPension: Math.round(totalMonthlyPension),
      monthlyGap: Math.round(monthlyGap),
      gapRatio: Math.round(gapRatio * 10) / 10,
      personalPensionTaxSaved: Math.round(personalPensionTaxSaved),
      needMore: monthlyGap > 0,
    };
  }, [form]);

  const update = (key: string, value: number) => setForm((f) => ({ ...f, [key]: value }));

  const Field = ({ label, value, unit, onChange, min, max, step = 1, hint }: {
    label: string; value: number; unit?: string; onChange: (v: number) => void;
    min: number; max: number; step?: number; hint?: string;
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
        <span>{label}</span>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-primary-500"
        />
        <span className="min-w-[80px] text-right text-body font-bold text-primary-700">
          {value.toLocaleString()}{unit || ''}
        </span>
      </div>
    </div>
  );

  return (
    <section id="pension-calculator" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">养老金智能计算器</h2>
        <p className="section-subtitle">
          参考工商银行智能养老测算逻辑，估算退休缺口、税优优惠与养老金储备需求
        </p>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input panel */}
          <div className="card border-2 border-primary-100">
            <h3 className="text-card-title font-bold text-gray-900 mb-6">📋 输入您的信息</h3>
            <div className="space-y-5">
              <Field label="当前年龄" value={form.currentAge} unit="岁" onChange={(v) => update('currentAge', v)} min={25} max={65} />
              <Field label="预计退休年龄" value={form.retireAge} unit="岁" onChange={(v) => update('retireAge', v)} min={50} max={70} hint="法定退休年龄即将延迟" />
              <Field label="预期寿命" value={form.lifeExpectancy} unit="岁" onChange={(v) => update('lifeExpectancy', v)} min={70} max={100} hint="上海平均预期寿命约84岁" />
              <Field label="当前月收入" value={form.monthlyIncome} unit="元" onChange={(v) => update('monthlyIncome', v)} min={3000} max={100000} step={500} />
              <Field label="已储备养老金" value={form.currentPension} unit="元" onChange={(v) => update('currentPension', v)} min={0} max={5000000} step={10000} />
              <Field label="每月养老金缴存" value={form.monthlyContribution} unit="元" onChange={(v) => update('monthlyContribution', v)} min={0} max={5000} step={100} hint="含个人养老金账户" />
              <Field label="期望退休月支出" value={form.expectedMonthlyExpense} unit="元" onChange={(v) => update('expectedMonthlyExpense', v)} min={3000} max={50000} step={500} />
              <Field label="社保养老金替代率" value={form.socialPensionReplacement} unit="%" onChange={(v) => update('socialPensionReplacement', v)} min={20} max={80} hint="当前约40-60%" />
            </div>
          </div>

          {/* Results panel */}
          <div className="space-y-6">
            <div className={`card border-2 ${results.needMore ? 'border-warm-300 bg-warm-50/30' : 'border-care-300 bg-care-50/30'}`}>
              <h3 className="text-card-title font-bold text-gray-900 mb-4">📊 测算结果</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">距离退休</span>
                  <span className="font-bold text-gray-900">{results.yearsToRetire} 年</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">退休生活年限</span>
                  <span className="font-bold text-gray-900">{results.yearsInRetirement} 年</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">预计养老金总额</span>
                  <span className="font-bold text-gray-900">{results.estimatedGrowth.toLocaleString()} 元</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">预估月社保养老金</span>
                  <span className="font-bold text-primary-700">{results.monthlySocialPension.toLocaleString()} 元/月</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">私人养老金月收入</span>
                  <span className="font-bold text-primary-700">{results.monthlyFromPrivate.toLocaleString()} 元/月</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-white rounded-xl px-3">
                  <span className="font-bold text-gray-900">合计月退休收入</span>
                  <span className="text-lg font-black text-gray-900">{results.totalMonthlyPension.toLocaleString()} 元/月</span>
                </div>
                <div className={`flex justify-between items-center py-3 rounded-xl px-3 ${results.needMore ? 'bg-warm-100' : 'bg-care-100'}`}>
                  <span className="font-bold text-gray-900">
                    {results.needMore ? '⚠️ 月度缺口' : '✅ 月度盈余'}
                  </span>
                  <span className={`text-lg font-black ${results.needMore ? 'text-warm-600' : 'text-care-600'}`}>
                    {results.needMore ? '-' : '+'}{Math.abs(results.monthlyGap).toLocaleString()} 元/月
                  </span>
                </div>
              </div>
            </div>

            {/* Tax benefit */}
            <div className="card bg-primary-50 border border-primary-200">
              <h4 className="font-bold text-primary-800 mb-2">💰 预估年节税金额</h4>
              <p className="text-2xl font-black text-primary-700">{results.personalPensionTaxSaved.toLocaleString()} 元</p>
              <p className="text-xs text-primary-500 mt-1">
                * 基于20%税率估算，实际节税金额与您的适用税率相关。缴存时不交税，领取时按3%缴纳。
              </p>
            </div>

            {/* Recommendation */}
            {results.needMore && (
              <div className="card border-2 border-warm-300">
                <h4 className="font-bold text-gray-900 mb-2">📌 建议</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 考虑增加每月养老金缴存至 <strong>{(form.monthlyContribution + Math.ceil(results.monthlyGap * 0.4)).toLocaleString()} 元</strong></li>
                  <li>• 充分利用个人养老金账户每年12,000元额度享受税优</li>
                  <li>• 考虑配置商业养老理财或基金产品提高投资回报</li>
                  <li>• 延迟退休至 <strong>{form.retireAge + 3} 岁</strong> 可缩小约30%缺口</li>
                  <li>• 了解长护险政策，为照护支出做额外规划</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          * 本计算器为简化估算工具，仅做参考。实际养老金受政策调整、投资市场波动、通货膨胀等因素影响。
          不构成任何投资或养老规划建议。
        </p>
      </div>
    </section>
  );
}
