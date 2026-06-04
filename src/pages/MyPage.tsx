import { useState } from 'react';
import { currentElderly, myBookings, boundChildren } from '../data/appData';
import { serviceModules } from '../data/platformData';

type TabType = 'assessment' | 'bookings' | 'recommendations' | 'profile';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('assessment');

  // Get recommendations based on assessment
  const getRecommendations = () => {
    if (currentElderly.assessmentScore >= 10) {
      return serviceModules.find((m) => m.id === 'home-care')?.services.slice(0, 3) || [];
    } else if (currentElderly.assessmentScore >= 4) {
      return [
        ...(serviceModules.find((m) => m.id === 'home-care')?.services.slice(0, 2) || []),
        ...(serviceModules.find((m) => m.id === 'daycare')?.services.slice(0, 1) || []),
      ];
    }
    return [
      ...(serviceModules.find((m) => m.id === 'daycare')?.services.slice(0, 2) || []),
      ...(serviceModules.find((m) => m.id === 'assessment')?.services.slice(0, 1) || []),
    ];
  };

  const recommendations = getRecommendations();
  const upcomingBookings = myBookings.filter((b) => b.status === '已预约');
  const completedBookings = myBookings.filter((b) => b.status === '已完成');

  const tabs = [
    { key: 'assessment' as TabType, icon: '📊', label: '评估' },
    { key: 'bookings' as TabType, icon: '📋', label: '预约' },
    { key: 'recommendations' as TabType, icon: '💡', label: '推荐' },
    { key: 'profile' as TabType, icon: '👤', label: '资料' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">我的</h1>
        <p className="text-xs text-gray-400">评估分数 · 推荐服务 · 预约记录</p>
      </div>

      {/* Profile summary */}
      <div className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
            {currentElderly.avatar}
          </div>
          <div>
            <h2 className="font-bold text-gray-900">{currentElderly.name}</h2>
            <p className="text-xs text-gray-500">{currentElderly.age}岁 · {currentElderly.gender} · {currentElderly.city}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold text-blue-600">{currentElderly.assessmentScore}<span className="text-sm text-gray-400">分</span></div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              currentElderly.assessmentScore >= 10 ? 'bg-red-100 text-red-700' :
              currentElderly.assessmentScore >= 4 ? 'bg-amber-100 text-amber-700' :
              'bg-emerald-100 text-emerald-700'
            }`}>
              {currentElderly.assessmentLevel.split('—')[0].trim()}
            </span>
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          {currentElderly.mainRisks.map((r) => (
            <span key={r} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">{r}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mx-4 mt-4 bg-white rounded-xl p-1 border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.key ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="block text-base mb-0.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Assessment tab */}
        {activeTab === 'assessment' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">评估详情</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-blue-700">{currentElderly.assessmentScore}</p>
                  <p className="text-xs text-blue-500">评估得分</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-amber-700">{currentElderly.assessmentLevel}</p>
                  <p className="text-xs text-amber-500">照护等级</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-emerald-700">{currentElderly.assessmentDate}</p>
                  <p className="text-xs text-emerald-500">评估日期</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-bold text-violet-700">{currentElderly.mainRisks.length}项</p>
                  <p className="text-xs text-violet-500">风险因素</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">风险详情</h3>
              <div className="space-y-2">
                {currentElderly.mainRisks.map((risk) => (
                  <div key={risk} className="flex items-center gap-2 text-sm text-gray-700 py-2 border-b border-gray-50 last:border-0">
                    <span className="text-red-400">⚠️</span> {risk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {upcomingBookings.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" /> 待服务（{upcomingBookings.length}）
                </h3>
                <div className="space-y-2">
                  {upcomingBookings.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </div>
            )}

            {completedBookings.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-emerald-600 mb-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" /> 已完成（{completedBookings.length}）
                </h3>
                <div className="space-y-2">
                  {completedBookings.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </div>
            )}

            {upcomingBookings.length === 0 && completedBookings.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <span className="text-4xl block mb-3">📋</span>
                <p>暂无预约记录</p>
              </div>
            )}
          </div>
        )}

        {/* Recommendations tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-2">根据您的评估结果</h3>
              <p className="text-sm text-blue-100">
                以下是平台为您推荐的养老服务，可前往"服务"页面预约
              </p>
            </div>
            <div className="space-y-3">
              {recommendations.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div>
                      <span className="text-xs text-gray-400 line-through">{s.marketPrice}</span>
                      <span className="text-sm font-bold text-blue-600 ml-2">{s.bankPrice}</span>
                    </div>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">推荐</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">个人信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">姓名</span>
                  <span className="font-medium">{currentElderly.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">年龄</span>
                  <span className="font-medium">{currentElderly.age}岁</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">性别</span>
                  <span className="font-medium">{currentElderly.gender}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">电话</span>
                  <span className="font-medium">{currentElderly.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">城市</span>
                  <span className="font-medium">{currentElderly.city}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">地址</span>
                  <span className="font-medium text-right max-w-[200px]">{currentElderly.address}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">已绑定子女</span>
                  <span className="font-medium">{boundChildren.map((c) => c.name).join('、')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">银行客户权益</h3>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">💎</p>
                <p className="font-bold text-blue-700">进阶客户</p>
                <p className="text-xs text-blue-500 mt-1">持续缴存个人养老金</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-blue-600">
                  <span className="bg-white/70 rounded-lg px-2 py-1">陪诊85折</span>
                  <span className="bg-white/70 rounded-lg px-2 py-1">体检8折</span>
                  <span className="bg-white/70 rounded-lg px-2 py-1">辅具押金减免</span>
                  <span className="bg-white/70 rounded-lg px-2 py-1">日托9折</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking }: { booking: import('../data/appData').BookedService }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm">{booking.serviceName}</h3>
            {booking.bookedBy === '子女代预约' && (
              <span className="px-1.5 py-0.5 bg-violet-100 text-violet-600 rounded-md text-xs font-bold">子女代约</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{booking.provider}</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
          booking.status === '已完成' ? 'bg-emerald-100 text-emerald-700' :
          booking.status === '已预约' ? 'bg-blue-100 text-blue-700' :
          booking.status === '进行中' ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {booking.status}
        </span>
      </div>
      <div className="flex flex-col gap-1 text-xs text-gray-500 mb-2">
        <span>📅 {booking.date} {booking.time}</span>
        <span>📍 {booking.location}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400 line-through text-xs">¥{booking.originalPrice}</span>
          <span className="font-bold text-blue-600">¥{booking.discountPrice}</span>
        </div>
        {booking.notes && <span className="text-xs text-gray-300 italic">{booking.notes}</span>}
      </div>
    </div>
  );
}
