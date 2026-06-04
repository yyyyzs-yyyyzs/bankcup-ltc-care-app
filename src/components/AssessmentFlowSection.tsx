import { elderlyCases } from '../data/platformData';
import { useState } from 'react';

export default function AssessmentFlowSection() {
  const [selectedCase, setSelectedCase] = useState(elderlyCases[0]);

  return (
    <section id="assessment-flow" className="bg-slate-50">
      <div className="section-container">
        <h2 className="section-title">上门身体状况评估</h2>
        <p className="section-subtitle">
          银行人员与医护人员共同上门，各司其职，为老人完成全面评估
        </p>

        {/* Role split */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏦</span>
              <div>
                <h3 className="font-bold text-blue-900">银行人员</h3>
                <p className="text-xs text-blue-600">厦门银行客户经理</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">✓</span> 核验客户身份</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">✓</span> 说明厦门银行养老客户权益</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">✓</span> 协助绑定银行账户或养老服务支付账户</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">✓</span> 协助添加子女为家庭监管人</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">✓</span> 说明服务预约和优惠规则</li>
            </ul>
          </div>

          <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🩺</span>
              <div>
                <h3 className="font-bold text-emerald-900">医护人员</h3>
                <p className="text-xs text-emerald-600">社区/康复机构医护</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> 评估老人身体状况</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> 评估自理能力（ADL）</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> 评估基础运动能力</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> 评估慢病情况与跌倒风险</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> 评估认知与精神状态</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">✓</span> 判断照护需求与服务建议</li>
            </ul>
          </div>

          <div className="card bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-bold text-violet-900">平台系统</h3>
                <p className="text-xs text-violet-600">智能评估引擎</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-violet-800">
              <li className="flex items-start gap-2"><span className="text-violet-500 mt-1">✓</span> 生成老人能力等级</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 mt-1">✓</span> 标注主要风险因素</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 mt-1">✓</span> 推荐服务与服务包</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 mt-1">✓</span> 测算预计月度费用</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 mt-1">✓</span> 建议是否申请长护险或机构照护</li>
            </ul>
          </div>
        </div>

        {/* Case selector */}
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 text-center">评估报告案例</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {elderlyCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedCase.id === c.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {c.name} · {c.age}岁
              </button>
            ))}
          </div>

          {/* Case detail */}
          <div className="card border-2 border-blue-200 shadow-card-hover">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-blue-50 rounded-2xl p-5 text-center">
                  <p className="text-4xl mb-2">{selectedCase.gender === '女' ? '👵' : '👴'}</p>
                  <p className="text-xl font-bold text-gray-900">{selectedCase.name}</p>
                  <p className="text-sm text-gray-500">{selectedCase.age}岁 · {selectedCase.gender}</p>
                  <div className="mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
                    {selectedCase.assessmentLevel}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">主要风险</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.mainRisks.map((r) => (
                      <span key={r} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-200">
                        ⚠ {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">推荐服务</p>
                  <ul className="space-y-1">
                    {selectedCase.recommendations.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5">◆</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">预计月费用</p>
                    <p className="text-lg font-bold text-blue-700">{selectedCase.estimatedMonthlyCost}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">评估得分</p>
                    <p className="text-lg font-bold text-amber-600">{selectedCase.score} 分</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 italic bg-gray-50 rounded-xl p-3">
                  {selectedCase.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
