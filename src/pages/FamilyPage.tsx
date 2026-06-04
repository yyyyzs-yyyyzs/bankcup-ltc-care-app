import { useState } from 'react';
import { boundChildren, currentElderly, myBookings } from '../data/appData';
import type { BookedService } from '../data/appData';

export default function FamilyPage() {
  const [expandedChild, setExpandedChild] = useState<string | null>(null);
  const [selectedElderlyForChild, setSelectedElderlyForChild] = useState<string | null>(null);

  const childBookings = myBookings.filter(
    (b) => selectedElderlyForChild && b.bookedBy === '子女代预约'
  );
  const allChildBookings = myBookings;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">家庭监管</h1>
        <p className="text-xs text-gray-400">绑定子女信息，授权服务查看</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Elderly card */}
        <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{currentElderly.avatar}</span>
            <div>
              <h2 className="font-bold text-gray-900">{currentElderly.name}</h2>
              <p className="text-xs text-gray-500">{currentElderly.age}岁 · {currentElderly.relation} · {currentElderly.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
              {currentElderly.assessmentLevel.split('—')[0].trim()}
            </span>
            <span className="text-gray-400">评估分 {currentElderly.assessmentScore} · {currentElderly.assessmentDate}</span>
          </div>
        </div>

        {/* Bound children */}
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-1">
            已绑定的子女（{boundChildren.length}人）
          </h3>
          <div className="space-y-3">
            {boundChildren.map((child) => (
              <div key={child.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedChild(expandedChild === child.id ? null : child.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{child.avatar}</span>
                    <div>
                      <p className="font-bold text-gray-900">{child.name}</p>
                      <p className="text-xs text-gray-500">{child.relation} · {child.phone}</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedChild === child.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedChild === child.id && (
                  <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-lg font-bold text-gray-900">{child.bindDate}</p>
                        <p className="text-xs text-gray-400">绑定日期</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-lg font-bold text-emerald-600">{child.permissions.length}</p>
                        <p className="text-xs text-gray-400">授权项</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">授权权限</p>
                      <div className="flex flex-wrap gap-1.5">
                        {child.permissions.map((p) => (
                          <span key={p} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 p-2 bg-amber-50 rounded-xl text-xs text-amber-700">
                      ⚠️ 子女不可直接操作个人养老金账户资金
                    </div>

                    {/* View bookings for this elderly as child */}
                    <button
                      onClick={() => setSelectedElderlyForChild(selectedElderlyForChild === currentElderly.id ? null : currentElderly.id)}
                      className="mt-3 w-full py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      {selectedElderlyForChild === currentElderly.id ? '收起预约记录' : '查看子女替老人预约的记录'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Child-perspective bookings */}
        {selectedElderlyForChild && (
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-1">
              近期预约订单（含子女代预约）
            </h3>
            <div className="space-y-3">
              {allChildBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
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

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span>📅 {booking.date} {booking.time}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span>📍 {booking.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400 line-through">¥{booking.originalPrice}</span>
                      <span className="font-bold text-blue-600">¥{booking.discountPrice}</span>
                    </div>
                    <span className="text-xs text-gray-400">{booking.bookedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance reminder */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-sm font-bold text-amber-800 mb-2">🔒 家庭监管说明</p>
          <ul className="space-y-1 text-xs text-amber-700">
            <li>✓ 子女可查看经老人授权的服务记录与费用账单</li>
            <li>✓ 子女可接收异常提醒</li>
            <li>✓ 子女可协助预约服务</li>
            <li>✗ 子女不直接操作个人养老金账户资金</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
