import { platformFlow } from '../data/platformData';

export default function PlatformFlow() {
  return (
    <section id="platform-flow" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">平台服务流程</h2>
        <p className="section-subtitle">
          从预约评估到子女监管，完整的养老服务闭环
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-amber-300 to-blue-200 -translate-y-1/2" />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {platformFlow.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-blue-200 flex items-center justify-center text-2xl shadow-sm group-hover:border-amber-400 group-hover:shadow-md transition-all duration-300 relative z-10">
                  {step.icon}
                </div>
                <div className="mt-3">
                  <p className="text-xs font-bold text-blue-500 mb-1">步骤 {i + 1}</p>
                  <p className="text-sm font-bold text-gray-800">{step.title}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
