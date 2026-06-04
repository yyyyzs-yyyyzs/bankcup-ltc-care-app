import { useState } from 'react';
import { bankProducts } from '../data/bankProducts';
import type { BankProduct } from '../data/bankProducts';

const categoryFilterLabels = [
  { key: 'all', label: '全部', emoji: '🏦' },
  { key: 'calc', label: '智能测算', emoji: '🧮' },
  { key: 'tax', label: '财税服务', emoji: '📄' },
  { key: 'benefits', label: '康养权益', emoji: '🌟' },
  { key: 'invest', label: '资产配置', emoji: '📊' },
  { key: 'rural', label: '县域养老', emoji: '🏘️' },
];

const featureColors: Record<string, string> = {
  icbc: 'border-red-500 bg-red-50',
  boc: 'border-rose-700 bg-rose-50',
  abc: 'border-green-600 bg-green-50',
  ccb: 'border-blue-600 bg-blue-50',
};

export default function BankPensionProducts() {
  const [activeBank, setActiveBank] = useState<string>('icbc');

  const bank = bankProducts.find((b) => b.id === activeBank)!;

  return (
    <section id="bank-products" className="bg-blue-gray-50">
      <div className="section-container">
        <h2 className="section-title">银行养老金融产品</h2>
        <p className="section-subtitle">
          四大银行养老金融特色产品与服务，为养老服务提供金融支撑
        </p>

        {/* Bank tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {bankProducts.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBank(b.id)}
              className={`px-6 py-4 rounded-2xl font-bold text-body transition-all duration-300 border-2 flex items-center gap-3 ${
                activeBank === b.id
                  ? 'bg-white border-primary-500 shadow-card-hover scale-105 text-gray-900'
                  : 'bg-white/60 border-transparent text-gray-500 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{b.icon}</span>
              <div className="text-left">
                <div className="text-sm">{b.shortName}</div>
                <div className="text-xs text-gray-400 font-normal">{b.bankName}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active bank display */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bank info + products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bank header */}
            <div className={`card bg-gradient-to-r ${bank.color} text-white !shadow-card-hover`}>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">{bank.icon}</span>
                <div>
                  <h3 className="text-heading font-bold">{bank.bankName}</h3>
                  <p className="text-white/70 text-body">{bank.slogan}</p>
                </div>
              </div>
            </div>

            {/* Products */}
            {bank.products.map((product, i) => (
              <div key={i} className="card border-2 border-transparent hover:border-primary-200 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{product.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-card-title font-bold text-gray-900">{product.title}</h4>
                      {product.highlight && (
                        <span className="tag tag-orange text-xs">{product.highlight}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <p className="text-body text-gray-700 leading-relaxed mb-3">{product.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-blue-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Exclusive benefits sidebar */}
          <div className="card h-fit sticky top-24">
            <h4 className="text-card-title font-bold text-gray-900 mb-4">🎁 独家权益</h4>
            <ul className="space-y-3">
              {bank.exclusiveBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-body text-gray-700">
                  <span className="text-care-500 mt-1">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-primary-50 rounded-xl">
              <p className="text-sm text-primary-700">
                <span className="font-bold">💡 提示：</span>
                以上产品信息来自各银行官网公开资料，具体产品详情、费率和购买条件请以银行官方渠道为准。本平台不构成任何投资或购买建议。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
