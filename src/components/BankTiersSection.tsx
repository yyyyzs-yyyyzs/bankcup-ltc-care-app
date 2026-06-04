import { bankTiers, transactions, complianceNotices, elderlyCases } from '../data/platformData';
import { useState } from 'react';

export default function BankTiersSection() {
  return (
    <section id="bank-tiers" className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="section-container">
        <h2 className="text-heading md:text-display font-bold text-center mb-4 text-white">厦门银行客户专属权益</h2>
        <p className="text-blue-200/80 text-center max-w-3xl mx-auto mb-12 text-body-lg">
          账户等级越高，养老服务优惠越多。让个人养老金账户从单纯金融产品，延伸为养老服务权益入口。
        </p>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {bankTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 border transition-all ${
                tier.highlight
                  ? 'bg-blue-900/40 border-amber-400/50 ring-2 ring-amber-400/30 scale-[1.02]'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {tier.highlight && (
                <div className="text-center -mt-9 mb-4">
                  <span className="inline-block bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">推荐</span>
                </div>
              )}
              <div className="text-center mb-4">
                <span className="text-5xl block mb-3">{tier.icon}</span>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              </div>
              <p className="text-sm text-blue-200/70 text-center mb-4 bg-white/5 rounded-xl p-3">{tier.condition}</p>
              <ul className="space-y-2">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-blue-100">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Transactions table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span> 服务流水示例
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-blue-200/60 text-xs uppercase tracking-wide">
                  <th className="pb-3 pr-4">时间</th>
                  <th className="pb-3 pr-4">老人</th>
                  <th className="pb-3 pr-4">服务项目</th>
                  <th className="pb-3 pr-4">机构</th>
                  <th className="pb-3 pr-4">原价</th>
                  <th className="pb-3 pr-4">优惠价</th>
                  <th className="pb-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((t) => (
                  <tr key={t.id} className="text-white/80">
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className="text-white font-medium">{t.date}</span>
                      <br />
                      <span className="text-xs text-white/40">{t.time}</span>
                    </td>
                    <td className="py-3 pr-4">{t.elderlyName}</td>
                    <td className="py-3 pr-4 font-medium text-white">{t.service}</td>
                    <td className="py-3 pr-4 text-xs text-white/60">{t.provider}</td>
                    <td className="py-3 pr-4 text-white/50 line-through">{t.originalPrice}元</td>
                    <td className="py-3 pr-4 text-amber-400 font-bold">{t.discountPrice}元</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        t.status === '已完成' ? 'bg-emerald-500/20 text-emerald-300' :
                        t.status === '待确认' ? 'bg-amber-500/20 text-amber-300' :
                        t.status === '已预约' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChildrenMonitorDashboard() {
  const selectedElderly = elderlyCases[0];
  const monthlyTotal = transactions.reduce((sum, t) => sum + t.discountPrice, 0);
  const monthlySaved = transactions.reduce((sum, t) => sum + (t.originalPrice - t.discountPrice), 0);
  const pendingCount = transactions.filter((t) => t.status === '待确认').length;
  const abnormalCount = transactions.filter((t) => t.status === '异常').length;

  return (
    <section id="children-monitor" className="bg-slate-50">
      <div className="section-container">
        <h2 className="section-title">子女端家庭监管</h2>
        <p className="section-subtitle">
          老人授权后，子女可查看服务流水与费用账单，但不能操作个人养老金账户资金
        </p>

        {/* Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-center">
            <p className="text-3xl font-bold text-blue-700">{selectedElderly.name}</p>
            <p className="text-xs text-blue-500 mt-1">被监管老人</p>
            <p className="text-sm text-blue-600 mt-2 bg-blue-100 rounded-full px-3 py-1 inline-block">{selectedElderly.assessmentLevel.split('—')[0].trim()}</p>
          </div>
          <div className="card bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 text-center">
            <p className="text-3xl font-bold text-emerald-700">{transactions.filter((t) => t.status === '已完成').length}</p>
            <p className="text-xs text-emerald-500 mt-1">本月服务次数</p>
          </div>
          <div className="card bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200 text-center">
            <p className="text-3xl font-bold text-violet-700">¥{monthlyTotal}</p>
            <p className="text-xs text-violet-500 mt-1">本月总支出</p>
          </div>
          <div className="card bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 text-center">
            <p className="text-3xl font-bold text-amber-700">¥{monthlySaved}</p>
            <p className="text-xs text-amber-500 mt-1">本月节省金额</p>
          </div>
        </div>

        {/* Alerts + authorizations */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="card border-l-4 border-amber-400">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span>⚠️</span> 待确认服务</h4>
            {transactions.filter((t) => t.status === '待确认').map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium">{t.service}</p>
                  <p className="text-xs text-gray-400">{t.date} · {t.provider}</p>
                </div>
                <button className="text-xs px-3 py-1 bg-blue-500 text-white rounded-lg font-bold">确认</button>
              </div>
            ))}
          </div>

          <div className="card border-l-4 border-red-400">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span>🔔</span> 异常提醒</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="bg-red-50 rounded-xl p-3">
                <p className="font-bold text-red-700">费用异常</p>
                <p className="text-xs text-red-500">上门康复费用高于预估，请核实</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="font-bold text-amber-700">服务提醒</p>
                <p className="text-xs text-amber-600">陈阿姨评估已超过3个月，建议重新评估</p>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-blue-400">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span>🔒</span> 子女权限说明</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-emerald-600"><span>✓</span> 可查看服务记录</li>
              <li className="flex items-start gap-2 text-emerald-600"><span>✓</span> 可查看费用账单</li>
              <li className="flex items-start gap-2 text-emerald-600"><span>✓</span> 可接收异常提醒</li>
              <li className="flex items-start gap-2 text-emerald-600"><span>✓</span> 可协助预约服务</li>
              <li className="flex items-start gap-2 text-red-500"><span>✗</span> 不可操作账户资金</li>
            </ul>
            <p className="text-xs text-gray-400 mt-3 bg-gray-50 rounded-xl p-2">
              子女仅可查看经老人授权的服务记录与费用流水，不直接操作个人养老金账户资金。
            </p>
          </div>
        </div>

        {/* Transactions table */}
        <div className="card">
          <h4 className="font-bold text-gray-900 mb-4">服务流水明细</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide border-b">
                  <th className="pb-3 pr-4">时间</th>
                  <th className="pb-3 pr-4">服务项目</th>
                  <th className="pb-3 pr-4">机构</th>
                  <th className="pb-3 pr-4">原价</th>
                  <th className="pb-3 pr-4">优惠价</th>
                  <th className="pb-3 pr-4">节省</th>
                  <th className="pb-3">状态</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50">
                    <td className="py-3 pr-4">
                      <span className="font-medium">{t.date}</span>
                      <br /><span className="text-xs text-gray-400">{t.time}</span>
                    </td>
                    <td className="py-3 pr-4 font-medium">{t.service}</td>
                    <td className="py-3 pr-4 text-xs text-gray-500">{t.provider}</td>
                    <td className="py-3 pr-4 text-gray-400 line-through">{t.originalPrice}元</td>
                    <td className="py-3 pr-4 text-blue-700 font-bold">{t.discountPrice}元</td>
                    <td className="py-3 pr-4 text-emerald-600 font-bold">{t.originalPrice - t.discountPrice}元</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        t.status === '已完成' ? 'bg-emerald-100 text-emerald-700' :
                        t.status === '待确认' ? 'bg-amber-100 text-amber-700' :
                        t.status === '已预约' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComplianceSection() {
  return (
    <section id="compliance" className="bg-white">
      <div className="section-container max-w-4xl mx-auto">
        <h2 className="section-title">合规边界与重要提示</h2>
        <p className="section-subtitle">平台严格遵循银行监管要求与养老服务规范</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {complianceNotices.map((notice, i) => (
            <div key={i} className="card border-l-4 border-blue-500 bg-blue-50/50 flex items-start gap-3">
              <span className="text-blue-500 text-xl flex-shrink-0">⚠️</span>
              <p className="text-sm text-gray-700 font-medium">{notice}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
