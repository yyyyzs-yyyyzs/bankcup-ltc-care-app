import { painPointsData } from '../data/platformData';

export default function PainPoints() {
  return (
    <section id="pain-points" className="bg-slate-50">
      <div className="section-container">
        <h2 className="section-title">为什么需要银龄服务平台？</h2>
        <p className="section-subtitle">当前养老服务市场面临的三方痛点</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {painPointsData.map((group) => (
            <div key={group.target} className="card hover:shadow-card-hover">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{group.icon}</span>
                <h3 className="text-card-title font-bold text-gray-900">{group.target}</h3>
              </div>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.title} className="border-l-4 border-amber-400 pl-4">
                    <p className="text-sm font-bold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
