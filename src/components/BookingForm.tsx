import { useState } from 'react';
import type { BookingData } from '../types/service';
import { loadProfile } from './ProfileBindingPanel';

interface Props {
  serviceType: string;
  serviceName: string;
  onClose: () => void;
}

export default function BookingForm({ serviceType, serviceName, onClose }: Props) {
  const profile = loadProfile();

  const [form, setForm] = useState<BookingData>({
    serviceType,
    providerId: '',
    providerName: '',
    desiredDate: '',
    desiredTime: '',
    serviceAddress: profile?.address || '',
    notes: '',
    needCallback: true,
    paymentPreference: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ bookingId: string; status: string; flow: string[] } | null>(null);

  const handleChange = (field: keyof BookingData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingId = `BK-${Date.now().toString(36).toUpperCase()}`;
    const result = {
      bookingId,
      status: '已记录（演示）',
      flow: [
        '① 提交服务需求 →',
        '② 平台匹配推荐机构 →',
        '③ 机构确认服务能力 →',
        '④ 双方沟通具体方案 →',
        '⑤ 签订服务协议 →',
        '⑥ 服务开始执行 →',
        '⑦ 服务评价与反馈',
      ],
    };
    setBookingResult(result);
    setSubmitted(true);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        预约参考 — {serviceName}
      </h3>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {profile ? (
            <div className="bg-care-50 border border-care-200 rounded-xl p-3 text-sm text-gray-700">
              <p>已绑定用户：<strong>{profile.name}</strong> · {profile.city} · {profile.phone}</p>
              <p className="text-xs text-gray-500 mt-1">信息仅用于本次演示，不会真实外传</p>
            </div>
          ) : (
            <div className="bg-warm-50 border border-warm-200 rounded-xl p-3 text-sm text-gray-700">
              <p>尚未绑定用户信息，建议先在"绑定用户信息"中填写基本信息，以简化预约流程。</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">服务类型</label>
            <input
              type="text"
              value={form.serviceType}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body bg-gray-50 text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">期望日期</label>
              <input
                type="date"
                value={form.desiredDate}
                onChange={(e) => handleChange('desiredDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">期望时间</label>
              <select
                value={form.desiredTime}
                onChange={(e) => handleChange('desiredTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 bg-white"
              >
                <option value="">请选择</option>
                <option value="morning">上午（8:00-12:00）</option>
                <option value="afternoon">下午（13:00-17:00）</option>
                <option value="evening">傍晚（17:00-20:00）</option>
                <option value="any">全天均可</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">服务地址</label>
            <input
              type="text"
              value={form.serviceAddress}
              onChange={(e) => handleChange('serviceAddress', e.target.value)}
              placeholder="请输入需要服务的地址"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">备注说明</label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="如有特殊需求请在此说明（如：老人听力不好，请按门铃）"
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">支付偏好</label>
            <select
              value={form.paymentPreference}
              onChange={(e) => handleChange('paymentPreference', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-body focus:outline-none focus:border-primary-400 bg-white"
            >
              <option value="">请选择</option>
              <option value="self">自费</option>
              <option value="ltc">长护险支付（如符合条件）</option>
              <option value="subsidy">政府补贴（如符合条件）</option>
              <option value="insurance">商业保险</option>
              <option value="child">子女代付</option>
              <option value="mixed">混合支付</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="needCallback"
              checked={form.needCallback}
              onChange={(e) => handleChange('needCallback', e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="needCallback" className="text-sm text-gray-700">
              需要电话回访确认
            </label>
          </div>

          <p className="text-xs text-gray-400 italic">
            本页面为比赛演示原型。提交预约仅为模拟流程，不会真实派单或联系任何机构。
            实际的养老服务预约需通过正规渠道（社区、医保经办机构、正规养老平台）进行。
          </p>

          <button type="submit" className="btn btn-primary w-full text-lg py-3">
            提交预约参考（模拟）
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="bg-care-50 border border-care-200 rounded-xl p-6 text-center">
            <p className="text-4xl mb-3">✅</p>
            <h4 className="text-heading font-bold text-gray-800 mb-2">预约已记录（演示）</h4>
            <p className="text-body text-gray-600">
              预约编号：<strong className="text-primary-600">{bookingResult?.bookingId}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-1">状态：{bookingResult?.status}</p>
          </div>

          {bookingResult && (
            <div className="bg-blue-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-3">📋 从推荐到落地的服务闭环流程</h4>
              <div className="flex flex-col gap-2">
                {bookingResult.flow.map((step, i) => (
                  <span key={i} className={`text-body ${i <= 0 ? 'text-primary-600 font-bold' : 'text-gray-500'}`}>
                    {step}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                以上为参考流程，实际服务落地需根据机构的具体流程和政策执行。本演示不涉及真实交易。
              </p>
            </div>
          )}

          <button onClick={onClose} className="btn btn-outline w-full">
            关闭
          </button>
        </div>
      )}
    </div>
  );
}
