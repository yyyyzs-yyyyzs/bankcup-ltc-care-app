import { painPoints } from '../data/mockData';

export default function PainPoints() {
  return (
    <section id="pain-points" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">一、我们要解决的痛点</h2>
        <p className="section-subtitle">
          长护险制度基础上的服务延伸，帮助更广泛的老人群体获得合适的养老服务
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point, i) => (
            <div key={i} className="card group">
              <span className="text-4xl mb-4 block">{point.icon}</span>
              <h3 className="text-card-title font-bold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-body text-gray-600">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="card !bg-primary-50 !border !border-primary-200">
          <div className="flex gap-4">
            <span className="text-3xl flex-shrink-0">💡</span>
            <div>
              <h3 className="text-card-title font-bold text-primary-800 mb-3">我们的思路</h3>
              <p className="text-body text-primary-700 leading-relaxed">
                目前大陆长期护理保险主要解决重度失能老人基础护理费用支付问题，但现实中大量轻度失能、中度照护需求、独居、慢病、失智早期、子女异地照护困难的老人，也已经存在照护需求。因此，我们希望搭建一个平台，帮助老人和子女完成"是否可能申请长护险"和"如果不符合长护险，该选择什么服务"的判断。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
