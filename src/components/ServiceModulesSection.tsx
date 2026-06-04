import { useState } from 'react';
import { serviceModules } from '../data/platformData';
import type { ServiceModule } from '../data/platformData';

function ServiceCard({ services, moduleId }: { services: ServiceModule['services']; moduleId: string }) {
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [form, setForm] = useState({ booker: '', elderlyName: '', phone: '', serviceTime: '', useBankDiscount: true });
  const [submitted, setSubmitted] = useState(false);

  const handleBook = (serviceName: string) => {
    setBookingService(serviceName);
    setSubmitted(false);
    setForm({ booker: '', elderlyName: '', phone: '', serviceTime: '', useBankDiscount: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setBookingService(null); setSubmitted(false); }, 2000);
  };

  return (
    <div className="space-y-4">
      {services.map((s) => (
        <div key={s.id} className="card border border-gray-100 hover:border-blue-200 transition-all group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-900">{s.name}</h4>
                {s.tags?.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md text-xs font-bold">{t}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-2">{s.desc}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span>合作机构：{s.partner}</span>
                <span>适合：{s.suitableFor}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-400 line-through">市场价 {s.marketPrice}</p>
                <p className="text-lg font-bold text-blue-700">厦门银行客户价 {s.bankPrice}</p>
              </div>
              <button
                onClick={() => handleBook(s.name)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
              >
                立即预约
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Booking Modal */}
      {bookingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setBookingService(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="font-bold text-gray-900">预约服务</h3>
              <button onClick={() => setBookingService(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            {submitted ? (
              <div className="p-8 text-center">
                <span className="text-5xl block mb-4">✅</span>
                <p className="text-lg font-bold text-gray-900 mb-2">预约成功！</p>
                <p className="text-sm text-gray-500">服务机构将在24小时内与您联系确认时间。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <p className="text-sm text-blue-600 font-bold bg-blue-50 rounded-xl p-3">服务：{bookingService}（模块：{moduleId}）</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">预约人</label>
                  <select className="w-full px-3 py-2 border rounded-lg text-sm" value={form.booker} onChange={(e) => setForm((p) => ({ ...p, booker: e.target.value }))} required>
                    <option value="">请选择</option>
                    <option value="老人本人">老人本人</option>
                    <option value="子女">子女代预约</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">老人姓名</label>
                  <input className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="请输入" value={form.elderlyName} onChange={(e) => setForm((p) => ({ ...p, elderlyName: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                  <input className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="请输入" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">期望服务时间</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm" value={form.serviceTime} onChange={(e) => setForm((p) => ({ ...p, serviceTime: e.target.value }))} required />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.useBankDiscount} onChange={(e) => setForm((p) => ({ ...p, useBankDiscount: e.target.checked }))} />
                  使用厦门银行客户优惠
                </label>
                <button type="submit" className="w-full btn btn-primary">确认预约</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ServiceModulesSection() {
  const [activeModule, setActiveModule] = useState(serviceModules[0].id);

  const current = serviceModules.find((m) => m.id === activeModule) || serviceModules[0];

  return (
    <section id="service-modules" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">八大服务板块</h2>
        <p className="section-subtitle">
          以厦门银行客户为中心，整合医疗服务、养老服务、社区服务和居家服务资源
        </p>

        {/* Module tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {serviceModules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeModule === m.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <span>{m.icon}</span>
              <span className="hidden sm:inline">{m.title}</span>
            </button>
          ))}
        </div>

        {/* Active module detail */}
        <div className="card border-2 border-blue-100 shadow-card-hover">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{current.icon}</span>
              <div>
                <h3 className="text-heading font-bold text-gray-900">{current.title}</h3>
                <p className="text-sm text-blue-600 font-medium">{current.subtitle}</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 mt-4">
              <p className="text-sm text-blue-800"><strong>定位：</strong>{current.positioning}</p>
              <p className="text-xs text-blue-600 mt-1"><strong>合作对象：</strong>{current.partners}</p>
            </div>
          </div>

          <ServiceCard services={current.services} moduleId={current.id} />
        </div>

        {/* Bottom note for module 8 */}
        {activeModule === 'family-monitor' && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 text-center">
            ⚠️ 子女仅可查看经老人授权的服务记录与费用流水，不直接操作个人养老金账户资金。
          </div>
        )}
      </div>
    </section>
  );
}
