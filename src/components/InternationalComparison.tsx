import { useState } from 'react';
import { countriesLTC, comparisonDimensions } from '../data/internationalData';
import type { CountryLTCData } from '../data/internationalData';

export default function InternationalComparison() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const selected = countriesLTC.find((c) => c.id === selectedCountry);

  return (
    <section id="international" className="bg-gradient-to-b from-blue-gray-50 to-white">
      <div className="section-container">
        <h2 className="section-title">国际经验对比</h2>
        <p className="section-subtitle">
          借鉴台湾、日本、美国长期照护体系经验，为中国大陆长护险制度完善提供参考
        </p>

        {/* Country selector cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {countriesLTC.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCountry(selectedCountry === c.id ? null : c.id)}
              className={`card text-left transition-all duration-300 cursor-pointer border-2 ${
                selectedCountry === c.id
                  ? 'border-primary-500 ring-4 ring-primary-200 shadow-card-hover scale-[1.03]'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <span className="text-4xl block mb-3">{c.flag}</span>
              <h3 className="text-card-title font-bold text-gray-900 mb-1">{c.country}</h3>
              <p className="text-sm text-gray-500">{c.systemName}</p>
              <p className="text-xs text-primary-600 mt-2 font-medium">
                {selectedCountry === c.id ? '收起详情 ▲' : '点击查看详情 ▼'}
              </p>
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="bg-primary-50">
                <th className="p-4 text-left font-bold text-gray-700 rounded-tl-xl">对比维度</th>
                {countriesLTC.map((c) => (
                  <th key={c.id} className="p-4 text-left font-bold text-gray-700 last:rounded-tr-xl">
                    <span className="mr-2">{c.flag}</span>
                    {c.country}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonDimensions.map((dim) => (
                <tr key={dim.key} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-600 whitespace-nowrap">{dim.label}</td>
                  {countriesLTC.map((c) => (
                    <td key={c.id} className="p-4 text-gray-700 leading-relaxed">
                      {c[dim.key as keyof CountryLTCData] as string}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-600">服务类型</td>
                {countriesLTC.map((c) => (
                  <td key={c.id} className="p-4">
                    <ul className="space-y-1">
                      {c.serviceTypes.map((s, i) => (
                        <li key={i} className="text-gray-700 text-xs">{s}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-600">核心特色</td>
                {countriesLTC.map((c) => (
                  <td key={c.id} className="p-4">
                    <ul className="space-y-1">
                      {c.features.map((f, i) => (
                        <li key={i} className="text-gray-700 text-xs">• {f}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Selected country detail */}
        {selected && (
          <div className="card border-2 border-primary-200 bg-primary-50/30 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{selected.flag}</span>
              <div className="flex-1">
                <h3 className="text-heading font-bold text-gray-900 mb-2">
                  {selected.country} — {selected.systemName}
                </h3>
                <p className="text-body-lg text-gray-700 mb-4">{selected.highlights}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.features.map((f, i) => (
                    <span key={i} className="tag tag-blue text-sm">{f}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  {selected.sources.map((src, i) => (
                    <div key={i}>
                      来源：{src.label}
                      {src.url && (
                        <span className="text-primary-500 ml-1">{src.url}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insight box */}
        <div className="mt-8 card gradient-blue !text-white">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="text-card-title font-bold mb-2">对中国的启示</h3>
              <p className="text-white/90 leading-relaxed">
                中国大陆长护险制度具有"广覆盖、强支付"优势，结合台湾"分层评估匹配"经验、日本"介护经理人"精准照护规划机制、以及美国商业保险产品创新思路，可以构建更加完善的养老金融服务生态系统。本App正是基于这一理念，整合"评估—匹配—支付—管理"全链条。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
