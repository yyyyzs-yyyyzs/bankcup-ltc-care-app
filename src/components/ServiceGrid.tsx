import { useState } from 'react';
import { serviceItems } from '../data/mockData';
import { getServiceById } from '../data/serviceDetails';
import ServiceDetailModal from './ServiceDetailModal';

const categoryColors: Record<string, string> = {
  community: 'border-care-400 bg-care-50',
  home: 'border-warm-400 bg-warm-50',
  professional: 'border-primary-400 bg-primary-50',
};

export default function ServiceGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedService = selectedId ? getServiceById(selectedId) : undefined;

  return (
    <section id="services" className="bg-blue-gray-50">
      <div className="section-container">
        <h2 className="section-title">八、推荐服务内容</h2>
        <p className="section-subtitle">
          覆盖居家、社区、机构三大场景，满足不同照护需求等级的养老服务
          <br />
          <span className="text-sm text-primary-600 mt-1 inline-block">点击服务卡片查看详情、附近推荐和预约参考</span>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`card border-t-4 ${categoryColors[item.category]} text-center group cursor-pointer hover:shadow-card-hover transition-all duration-300 text-left w-full`}
            >
              <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {item.icon}
              </span>
              <h3 className="text-card-title font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-body text-gray-600">{item.description}</p>
              <span className="inline-block mt-3 text-xs text-gray-400 uppercase tracking-wide">
                {item.category === 'community' ? '社区服务' : item.category === 'home' ? '居家服务' : '专业照护'}
              </span>
              <div className="mt-3 text-primary-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                点击查看详情 →
              </div>
            </button>
          ))}
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </section>
  );
}
