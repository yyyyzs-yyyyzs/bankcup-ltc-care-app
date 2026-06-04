import { useState, useEffect } from 'react';

/* ==================== Types ==================== */
interface HealthData {
  heartRate: number;
  bloodPressure: string;
  bloodSugar: number;
  sleepHours: number;
  steps: number;
  weight: number;
  temperature: number;
  lastUpdated: string;
}

interface HealthAlert {
  id: string;
  time: string;
  level: 'normal' | 'warning' | 'danger';
  metric: string;
  value: string;
  message: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  lastTaken: string | null;
  nextDue: string;
  notes: string;
}

interface ServiceBooking {
  id: string;
  type: string;
  icon: string;
  date: string;
  time: string;
  status: string;
  provider: string;
}

interface Notification {
  id: string;
  time: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
}

/* ==================== Mock Data ==================== */
const mockHealthData: HealthData = {
  heartRate: 78,
  bloodPressure: '128/82',
  bloodSugar: 5.8,
  sleepHours: 7.2,
  steps: 3250,
  weight: 65.5,
  temperature: 36.5,
  lastUpdated: '6月4日 14:30',
};

const mockHealthAlerts: HealthAlert[] = [
  { id: 'h1', time: '14:30', level: 'normal', metric: '心率', value: '78 bpm', message: '心率正常，波动在正常范围内' },
  { id: 'h2', time: '14:00', level: 'warning', metric: '血压', value: '128/82 mmHg', message: '收缩压略偏高，建议减少高盐饮食，持续观察' },
  { id: 'h3', time: '08:00', level: 'normal', metric: '空腹血糖', value: '5.8 mmol/L', message: '空腹血糖正常（正常范围 3.9-6.1）' },
  { id: 'h4', time: '07:00', level: 'warning', metric: '睡眠', value: '7.2 小时', message: '昨日睡眠偏短，深睡眠不足。建议减少晚间屏幕时间' },
  { id: 'h5', time: '昨日', level: 'danger', metric: '血氧', value: '93%', message: '血氧略低（正常≥95%），持续监测，如低于92%请及时就医' },
];

const mockMedications: Medication[] = [
  { id: 'med1', name: '硝苯地平（降压药）', dosage: '30mg', frequency: '每日1次', timeOfDay: ['08:00'], lastTaken: '6月4日 08:05', nextDue: '6月5日 08:00', notes: '早餐后服用，避免空腹' },
  { id: 'med2', name: '阿司匹林', dosage: '100mg', frequency: '每日1次', timeOfDay: ['08:00'], lastTaken: '6月4日 08:05', nextDue: '6月5日 08:00', notes: '饭后服用，注意胃肠道反应' },
  { id: 'med3', name: '二甲双胍（降糖药）', dosage: '500mg', frequency: '每日2次', timeOfDay: ['08:00', '18:00'], lastTaken: '6月4日 08:05', nextDue: '6月4日 18:00', notes: '随餐服用' },
  { id: 'med4', name: '钙尔奇D', dosage: '600mg', frequency: '每日1次', timeOfDay: ['12:00'], lastTaken: '6月3日 12:10', nextDue: '6月4日 12:00', notes: '午餐后服用' },
];

const mockBookings: ServiceBooking[] = [
  { id: 'b1', type: '上门陪餐', icon: '🍽️', date: '6月4日', time: '11:30-12:30', status: '已完成', provider: '安康居家养老服务中心' },
  { id: 'b2', type: '陪诊服务', icon: '🏥', date: '6月6日', time: '08:00-12:00', status: '已确认', provider: '爱心陪诊服务平台' },
  { id: 'b3', type: '助洁服务', icon: '🧹', date: '6月7日', time: '09:00-11:00', status: '待确认', provider: '安康居家养老服务中心' },
];

const mockNotifications: Notification[] = [
  { id: 'n1', time: '14:35', type: 'health', title: '血压略高提醒', message: '今日血压128/82，收缩压偏高。建议减少盐分摄入，明天同一时间复测。', read: false },
  { id: 'n2', time: '11:30', type: 'service', title: '陪餐服务已完成', message: '今日午餐陪餐已结束，老人进食正常。服务人员：王姐。详细陪餐记录已生成。', read: false },
  { id: 'n3', time: '08:05', type: 'medication', title: '早间用药已确认', message: '老人已于08:05完成早间用药（硝苯地平+阿司匹林+二甲双胍），智能药盒已记录。', read: true },
  { id: 'n4', time: '昨日', type: 'health', title: '每日健康报告已生成', message: '昨日健康数据汇总：心率76bpm、血压124/80、血糖5.6、睡眠8.1h、步数4520。整体状态良好。', read: true },
  { id: 'n5', time: '6月2日', type: 'alert', title: '老人未按时用餐', message: '系统检测到老人昨日午餐未按时确认，经电话确认安全。已加强关注。', read: true },
];

/* ==================== Components ==================== */

function HealthDashboard({ data, alerts }: { data: HealthData; alerts: HealthAlert[] }) {
  const metrics = [
    { label: '心率', value: `${data.heartRate}`, unit: 'bpm', icon: '❤️', color: data.heartRate < 90 ? 'text-care-600' : 'text-warm-600' },
    { label: '血压', value: data.bloodPressure, unit: 'mmHg', icon: '🩸', color: 'text-primary-600' },
    { label: '血糖', value: `${data.bloodSugar}`, unit: 'mmol/L', icon: '📊', color: data.bloodSugar < 6.1 ? 'text-care-600' : 'text-warm-600' },
    { label: '睡眠', value: `${data.sleepHours}`, unit: '小时', icon: '😴', color: data.sleepHours >= 7 ? 'text-care-600' : 'text-warm-600' },
    { label: '步数', value: `${data.steps}`, unit: '步', icon: '🚶', color: 'text-primary-600' },
    { label: '体温', value: `${data.temperature}`, unit: '°C', icon: '🌡️', color: data.temperature < 37.3 ? 'text-care-600' : 'text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-card-title font-bold text-gray-900">📊 健康概览</h3>
        <span className="text-xs text-gray-400">更新时间：{data.lastUpdated}</span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="card !p-4 text-center border border-gray-100">
            <span className="text-2xl block mb-1">{m.icon}</span>
            <p className={`text-2xl font-black ${m.color}`}>{m.value}</p>
            <p className="text-xs text-gray-400">{m.unit}</p>
            <p className="text-sm font-medium text-gray-600 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Health alerts */}
      <div className="card !p-4">
        <h4 className="font-bold text-gray-900 mb-3 text-sm">⚠️ 健康预警</h4>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                alert.level === 'danger' ? 'bg-red-50 border border-red-200' :
                alert.level === 'warning' ? 'bg-warm-50 border border-warm-200' :
                'bg-gray-50 border border-gray-100'
              }`}
            >
              <span className={`text-lg ${
                alert.level === 'danger' ? 'text-red-500' : alert.level === 'warning' ? 'text-warm-500' : 'text-care-500'
              }`}>
                {alert.level === 'danger' ? '🔴' : alert.level === 'warning' ? '🟡' : '🟢'}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{alert.metric}</span>
                  <span className="text-gray-500">{alert.value}</span>
                  <span className="text-xs text-gray-400 ml-auto">{alert.time}</span>
                </div>
                <p className="text-gray-600 mt-0.5">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock note */}
      <div className="bg-primary-50 rounded-xl p-3 text-xs text-primary-600">
        💡 以上健康数据为模拟演示。实际产品中可对接智能手环、血压计、血糖仪等IoT设备自动上传数据，子女端实时同步。
      </div>
    </div>
  );
}

function MedicationTracker({ medications }: { medications: Medication[] }) {
  const [meds, setMeds] = useState(medications);

  const confirmTaken = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, lastTaken: '刚刚', nextDue: getNextDue(m) } : m))
    );
  };

  const getNextDue = (m: Medication) => {
    const now = new Date();
    const times = m.timeOfDay.map((t) => {
      const [h, min] = t.split(':').map(Number);
      const d = new Date(now);
      d.setHours(h, min, 0, 0);
      if (d <= now) d.setDate(d.getDate() + 1);
      return d;
    });
    const next = times.sort((a, b) => a.getTime() - b.getTime())[0];
    return `${next.getMonth() + 1}月${next.getDate()}日 ${next.getHours().toString().padStart(2, '0')}:${next.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-card-title font-bold text-gray-900">💊 用药管理</h3>

      <div className="grid gap-4">
        {meds.map((med) => {
          const isPastDue = med.timeOfDay.some((t) => {
            const [h, m] = t.split(':').map(Number);
            const now = new Date();
            const due = new Date();
            due.setHours(h, m, 0, 0);
            return due < now && med.lastTaken && !med.lastTaken.includes('刚刚');
          });

          return (
            <div
              key={med.id}
              className={`card !p-4 border-2 ${isPastDue ? 'border-red-300 bg-red-50/30' : 'border-gray-100'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{med.name}</h4>
                    {isPastDue && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium animate-pulse">
                        待服用
                      </span>
                    )}
                    {med.lastTaken === '刚刚' && (
                      <span className="text-xs bg-care-100 text-care-600 px-2 py-0.5 rounded-full font-medium">
                        已服用 ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{med.dosage} · {med.frequency}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    服用时间：{med.timeOfDay.join('、')} | 下次：{med.nextDue}
                  </p>
                  {med.notes && <p className="text-xs text-gray-400 mt-0.5">📝 {med.notes}</p>}
                </div>
                <button
                  onClick={() => confirmTaken(med.id)}
                  className="px-3 py-2 bg-primary-500 text-white text-xs rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  确认已服
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn btn-outline w-full text-sm">
        + 添加用药提醒
      </button>
    </div>
  );
}

function ServiceBookingPanel() {
  const [showForm, setShowForm] = useState(false);
  const [bookedMsg, setBookedMsg] = useState('');

  const services = [
    { type: '上门陪餐', icon: '🍽️', desc: '陪老人用餐，记录饮食情况', price: '30元起', color: 'border-warm-400 bg-warm-50' },
    { type: '陪诊服务', icon: '🏥', desc: '全程陪同就医，记录医嘱', price: '150元起', color: 'border-primary-400 bg-primary-50' },
    { type: '助洁助浴', icon: '🛁', desc: '居室清洁、个人卫生协助', price: '80元起', color: 'border-care-400 bg-care-50' },
    { type: '上门护理', icon: '💉', desc: '专业护士上门医疗护理', price: '200元起', color: 'border-primary-500 bg-primary-100' },
    { type: '康复训练', icon: '🦵', desc: '物理/作业治疗康复训练', price: '180元起', color: 'border-care-500 bg-care-100' },
    { type: '喘息服务', icon: '😌', desc: '替代家属照护，让您休息', price: '120元起', color: 'border-warm-500 bg-warm-100' },
    { type: '适老化改造', icon: '🔧', desc: '居家安全改造、辅具安装', price: '500元起', color: 'border-primary-600 bg-primary-50' },
    { type: '健康检查', icon: '🩺', desc: '上门基础体检、健康评估', price: '200元起', color: 'border-care-600 bg-care-50' },
  ];

  const handleBook = (type: string) => {
    setBookedMsg(`已为老人预约「${type}」服务！服务信息将同步发送至老人端。平台确认后会通过短信通知您和老人。`);
    setTimeout(() => setBookedMsg(''), 5000);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-card-title font-bold text-gray-900">📅 为老人预约服务</h3>

      {bookedMsg && (
        <div className="card !p-4 bg-care-50 border border-care-300 text-sm text-care-700 animate-in fade-in">
          ✅ {bookedMsg}
        </div>
      )}

      {/* Upcoming bookings */}
      <div className="card !p-4">
        <h4 className="font-bold text-gray-900 mb-3 text-sm">📋 已预约服务</h4>
        <div className="space-y-2">
          {mockBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between p-3 bg-blue-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <span className="font-bold text-gray-800 text-sm">{b.type}</span>
                  <p className="text-xs text-gray-500">{b.date} {b.time} · {b.provider}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                b.status === '已完成' ? 'bg-care-100 text-care-600' :
                b.status === '已确认' ? 'bg-primary-100 text-primary-600' :
                'bg-gray-100 text-gray-500'
              }`}>{b.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {services.map((svc) => (
          <button
            key={svc.type}
            onClick={() => { setShowForm(true); }}
            className={`card !p-4 border-l-4 ${svc.color} text-left hover:shadow-card-hover transition-all`}
          >
            <span className="text-2xl block mb-2">{svc.icon}</span>
            <h4 className="font-bold text-gray-900 text-sm mb-1">{svc.type}</h4>
            <p className="text-xs text-gray-400 mb-1">{svc.desc}</p>
            <span className="text-xs font-bold text-primary-600">{svc.price}</span>
          </button>
        ))}
      </div>

      {showForm && (
        <div className="card border-2 border-primary-300 animate-in fade-in slide-in-from-top-2">
          <h4 className="font-bold text-gray-900 mb-4">填写预约信息</h4>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">服务类型</label>
              <select className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400">
                {services.map((s) => <option key={s.type}>{s.type}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">期望日期</label>
              <input type="date" className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">时间段</label>
              <select className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400">
                <option>上午</option><option>下午</option><option>全天</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">服务地址</label>
              <input type="text" placeholder="老人居住地址" className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">特殊需求</label>
              <textarea rows={2} placeholder="如：老人近期膝盖不适，请多加照顾。饮食需低盐..." className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleBook('上门陪餐')} className="btn btn-primary text-sm">确认预约</button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm">取消</button>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsPanel({ notifications }: { notifications: Notification[] }) {
  const [notifs, setNotifs] = useState(notifications);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-card-title font-bold text-gray-900">🔔 消息通知</h3>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <span className="text-sm text-primary-600 font-medium">{unread}条未读</span>
          )}
          {unread > 0 && (
            <button onClick={markAllRead} className="text-sm text-gray-400 hover:text-gray-600">全部已读</button>
          )}
        </div>
      </div>

      {notifs.map((n) => (
        <div
          key={n.id}
          onClick={() => markRead(n.id)}
          className={`card !p-4 cursor-pointer border-l-4 transition-all ${
            n.read ? 'border-gray-200 opacity-70' :
            n.type === 'alert' ? 'border-red-400 bg-red-50/20' :
            n.type === 'health' ? 'border-warm-400 bg-warm-50/20' :
            'border-primary-400'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">
              {n.type === 'health' ? '🏥' : n.type === 'service' ? '📋' : n.type === 'medication' ? '💊' : '⚠️'}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-gray-900 text-sm">{n.title}</h4>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <p className="text-sm text-gray-600">{n.message}</p>
            </div>
            {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />}
          </div>
        </div>
      ))}

      <div className="card bg-primary-50 border border-primary-200 text-center !p-4">
        <p className="text-sm text-primary-700">
          📱 <strong>短信+推送通知：</strong>当老人健康数据异常、服务状态变更、用药遗漏时，系统将自动向所有关联子女发送短信和App推送通知。
        </p>
      </div>
    </div>
  );
}

/* ==================== Main Portal ==================== */
interface ChildrenPortalProps {
  onSwitchToElderly: () => void;
}

export default function ChildrenPortal({ onSwitchToElderly }: ChildrenPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'booking' | 'notifications' | 'medications'>('dashboard');
  const [elderlyName] = useState('李阿姨');
  const [elderlyRelation] = useState('母亲');

  const tabs = [
    { key: 'dashboard' as const, label: '健康监护', icon: '📊' },
    { key: 'medications' as const, label: '用药管理', icon: '💊' },
    { key: 'booking' as const, label: '服务预约', icon: '📅' },
    { key: 'notifications' as const, label: '消息通知', icon: '🔔' },
  ];

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-50 via-white to-primary-50/30">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onSwitchToElderly}
                className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1 font-medium"
              >
                ← 切换到老人端
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <span className="text-sm text-gray-400">子女端 · 监护</span>
                <span className="font-bold text-gray-900 ml-2">{elderlyName}</span>
                <span className="text-xs text-gray-400 ml-1">({elderlyRelation})</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-care-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">设备在线</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-heading md:text-display font-bold mb-2">
                👨‍👩‍👧 {elderlyName}的健康监护中心
              </h1>
              <p className="text-white/70 text-body">
                实时健康数据 · 智能预警 · 一键预约 · 全程守护
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn bg-white/20 text-white border border-white/30 hover:bg-white/30 text-sm !px-4 !py-2">
                📞 一键呼叫老人
              </button>
              <button className="btn bg-red-500/80 text-white hover:bg-red-500 text-sm !px-4 !py-2">
                🆘 紧急求助
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-[53px] z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3.5 font-bold text-sm border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.key === 'notifications' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'dashboard' && <HealthDashboard data={mockHealthData} alerts={mockHealthAlerts} />}
        {activeTab === 'medications' && <MedicationTracker medications={mockMedications} />}
        {activeTab === 'booking' && <ServiceBookingPanel />}
        {activeTab === 'notifications' && <NotificationsPanel notifications={mockNotifications} />}
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-xs text-gray-400">
          * 子女端所有数据为模拟演示。实际产品需对接IoT设备、医疗机构HIS系统和短信网关。
          数据仅保存在本地浏览器，不对外传输。
        </p>
      </div>
    </div>
  );
}
