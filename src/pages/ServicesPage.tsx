import { useState } from 'react';
import { serviceModulesMobile, serviceLocations, timeSlots } from '../data/appData';
import { serviceModules } from '../data/platformData';

type ViewMode = 'list' | 'detail';

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    elderlyName: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  });
  const [bookingDone, setBookingDone] = useState(false);

  const selectedModule = serviceModules.find((m) => m.id === selectedModuleId);
  const selectedModuleMeta = serviceModulesMobile.find((m) => m.id === selectedModuleId);

  const handleModuleClick = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setViewMode('detail');
    setBookingService(null);
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedModuleId(null);
    setBookingService(null);
  };

  const handleBook = (serviceName: string) => {
    setBookingService(serviceName);
    setBookingForm({ elderlyName: '', date: '', time: '', location: '', notes: '' });
    setBookingDone(false);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
    setTimeout(() => {
      setBookingService(null);
      setBookingDone(false);
    }, 2000);
  };

  const locations = selectedModuleId ? (serviceLocations[selectedModuleId] || ['请电话咨询']) : [];

  // List view
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900">养老服务</h1>
          <p className="text-xs text-gray-400">选择服务板块，查看详情与预约</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {serviceModulesMobile.map((mod) => (
              <button
                key={mod.id}
                onClick={() => handleModuleClick(mod.id)}
                className={`${mod.bgColor} rounded-2xl p-4 text-left border border-gray-100 hover:shadow-md transition-all active:scale-95`}
              >
                <span className="text-3xl block mb-2">{mod.icon}</span>
                <h3 className={`text-sm font-bold ${mod.color} mb-1`}>{mod.title}</h3>
                <p className="text-xs text-gray-500">{mod.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Detail view
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 p-1 -ml-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{selectedModuleMeta?.title}</h1>
            <p className="text-xs text-gray-400">{selectedModuleMeta?.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Service list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {bookingService ? (
          /* Booking form */
          <div className="card">
            {bookingDone ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">✅</span>
                <p className="text-lg font-bold text-gray-900 mb-2">预约成功！</p>
                <p className="text-sm text-gray-500">服务机构将尽快与您联系确认</p>
                <button onClick={() => setBookingService(null)} className="mt-4 text-blue-600 text-sm font-bold">返回</button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-gray-900 mb-4">预约：{bookingService}</h3>
                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">老人姓名</label>
                    <input className="w-full px-3 py-2.5 border rounded-xl text-sm" placeholder="请输入" value={bookingForm.elderlyName} onChange={(e) => setBookingForm((p) => ({ ...p, elderlyName: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">预约日期</label>
                    <input type="date" className="w-full px-3 py-2.5 border rounded-xl text-sm" value={bookingForm.date} onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">预约时间</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setBookingForm((p) => ({ ...p, time: t }))}
                          className={`px-2 py-2 text-xs rounded-lg border transition-all ${
                            bookingForm.time === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">服务地点</label>
                    <select className="w-full px-3 py-2.5 border rounded-xl text-sm bg-white" value={bookingForm.location} onChange={(e) => setBookingForm((p) => ({ ...p, location: e.target.value }))} required>
                      <option value="">请选择地点</option>
                      {locations.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                    <textarea className="w-full px-3 py-2.5 border rounded-xl text-sm resize-none" rows={2} placeholder="特殊需求说明（选填）" value={bookingForm.notes} onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">确认预约</button>
                  <button type="button" onClick={() => setBookingService(null)} className="w-full py-2 text-gray-400 text-sm">取消</button>
                </form>
              </>
            )}
          </div>
        ) : (
          /* Services in module */
          <div className="space-y-3">
            {selectedModule?.services.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-2">¥{s.marketPrice}</span>
                    <span className="text-sm font-bold text-blue-600">¥{s.bankPrice}</span>
                    <span className="text-xs text-amber-600 ml-1">厦门银行客户价</span>
                  </div>
                  <button
                    onClick={() => handleBook(s.name)}
                    className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors active:scale-95"
                  >
                    立即预约
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  合作机构：{s.partner}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
