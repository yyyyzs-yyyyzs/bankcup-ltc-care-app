import { innovationPoints, coreMessages } from '../data/platformData';

export default function InnovationSection() {
  return (
    <section id="innovation" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">项目创新点</h2>
        <p className="section-subtitle">
          {coreMessages.compliance5}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {innovationPoints.map((point) => (
            <div key={point.title} className="card border border-gray-100 hover:border-amber-200 hover:shadow-card-hover transition-all group">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{point.icon}</span>
                <div>
                  <h3 className="text-card-title font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sm font-bold text-blue-600 mb-2">{point.desc}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{point.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core messages */}
        <div className="max-w-3xl mx-auto mt-12 grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 text-center">
            <p className="text-lg font-bold">{coreMessages.tagline}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 rounded-2xl p-6 text-center">
            <p className="text-lg font-bold">{coreMessages.compliance4}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-body-lg text-gray-700 font-bold mb-2">
            {coreMessages.compliance3}
          </p>
          <p className="text-sm text-gray-400">
            {coreMessages.compliance5}
          </p>
        </div>
      </div>
    </section>
  );
}
