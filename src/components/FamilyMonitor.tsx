import { useState, useEffect } from 'react';

/* ---------- types ---------- */
interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  isEmergencyContact: boolean;
}

interface Notification {
  id: string;
  time: string;
  type: 'service_booked' | 'service_completed' | 'alert' | 'reminder' | 'report';
  title: string;
  message: string;
  read: boolean;
  relatedService?: string;
}

interface ServiceRecord {
  id: string;
  type: string;
  icon: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  bookedBy: string; // 'elderly' or child's name
  detail: string;
  report?: string;
}

/* ---------- mock data ---------- */
const mockMembers: FamilyMember[] = [
  { id: 'm1', name: '张大明', relation: '儿子', phone: '138****6789', email: 'zhangdm@example.com', isEmergencyContact: true },
  { id: 'm2', name: '张小红', relation: '女儿', phone: '139****7890', email: 'zhangxh@example.com', isEmergencyContact: false },
];

const mockNotifications: Notification[] = [
  {
    id: 'n1', time: '6月4日 11:30', type: 'service_completed',
    title: '陪餐服务已完成', message: '午餐陪餐服务已结束。李阿姨今日食欲良好，进食量正常，情绪愉快。服务人员：王姐。',
    read: false, relatedService: 'meal',
  },
  {
    id: 'n2', time: '6月4日 09:00', type: 'service_booked',
    title: '陪诊服务已确认', message: '6月6日上午华山医院心内科陪诊已确认，陪诊师张医生将于当天8:00上门接老人。',
    read: false, relatedService: 'escort',
  },
  {
    id: 'n3', time: '6月3日 18:00', type: 'report',
    title: '每周照护报告已生成', message: '本周（5.28-6.3）照护服务汇总：陪餐5次、陪诊1次、助洁2次。老人整体状态稳定。点击查看详情。',
    read: true, relatedService: 'summary',
  },
  {
    id: 'n4', time: '6月3日 14:20', type: 'alert',
    title: '老人未按时用餐提醒', message: '系统检测到李阿姨今日午餐时间未确认用餐，已电话联系确认安全。请关注老人情况。',
    read: true, relatedService: 'meal',
  },
];

const mockServiceRecords: ServiceRecord[] = [
  { id: 's1', type: '上门陪餐', icon: '🍽️', date: '6月4日', time: '11:30-12:30', status: 'completed', bookedBy: '老人', detail: '基础陪餐服务 | 午餐', report: '进食正常，情绪良好' },
  { id: 's2', type: '陪诊服务', icon: '🏥', date: '6月6日', time: '08:00-12:00', status: 'confirmed', bookedBy: '张大明（儿子）', detail: '华山医院 | 心内科 | 基础陪诊' },
  { id: 's3', type: '上门陪餐', icon: '🍽️', date: '6月5日', time: '11:00-12:30', status: 'confirmed', bookedBy: '张小红（女儿）', detail: '营养配餐服务 | 午餐 | 低盐饮食' },
  { id: 's4', type: '助洁服务', icon: '🧹', date: '6月3日', time: '09:00-11:00', status: 'completed', bookedBy: '老人', detail: '居室清洁+洗衣', report: '完成清洁，老人满意' },
];

/* ---------- component ---------- */
export default function FamilyMonitor() {
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('family_members');
    return saved ? JSON.parse(saved) : mockMembers;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('family_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  const [serviceRecords] = useState<ServiceRecord[]>(mockServiceRecords);

  const [activeTab, setActiveTab] = useState<'notifications' | 'members' | 'records' | 'book'>('notifications');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showBookService, setShowBookService] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', relation: '子女', phone: '', email: '' });

  // Persist
  useEffect(() => { localStorage.setItem('family_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('family_notifications', JSON.stringify(notifications)); }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addMember = () => {
    if (!newMember.name || !newMember.phone) return;
    const member: FamilyMember = {
      id: 'm' + Date.now(),
      name: newMember.name,
      relation: newMember.relation,
      phone: newMember.phone,
      email: newMember.email,
      isEmergencyContact: members.length === 0,
    };
    setMembers([...members, member]);
    setNewMember({ name: '', relation: '子女', phone: '', email: '' });
    setShowAddMember(false);

    // Auto-notify
    const notif: Notification = {
      id: 'n' + Date.now(),
      time: new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      type: 'reminder',
      title: '家庭成员已添加',
      message: `${member.name}（${member.relation}）已加入家庭监管名单。${member.isEmergencyContact ? '已设为紧急联系人。' : ''}当老人有新的服务预约或完成时，系统将向该成员发送通知。`,
      read: false,
    };
    setNotifications([notif, ...notifications]);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleBookService = (serviceType: string, icon: string) => {
    const record: ServiceRecord = {
      id: 's' + Date.now(),
      type: serviceType,
      icon,
      date: new Date().toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
      time: '待确认',
      status: 'pending',
      bookedBy: '子女端代预约',
      detail: `${serviceType} | 通过家庭监管端预约`,
    };
    // In real app, would push to backend
    const notif: Notification = {
      id: 'n' + Date.now(),
      time: new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      type: 'service_booked',
      title: '子女已为老人预约服务',
      message: `子女端为老人预约了「${serviceType}」服务，等待平台确认。服务信息将通过短信同步发送给老人和所有关联家庭成员。`,
      read: false,
      relatedService: serviceType === '上门陪餐' ? 'meal' : 'escort',
    };
    setNotifications([notif, ...notifications]);
    setShowBookService(false);
  };

  const statusBadge = (status: ServiceRecord['status']) => {
    const map = {
      pending: 'bg-gray-100 text-gray-600',
      confirmed: 'bg-primary-100 text-primary-700',
      in_progress: 'bg-warm-100 text-warm-700',
      completed: 'bg-care-100 text-care-700',
      cancelled: 'bg-red-100 text-red-600',
    };
    const labels = {
      pending: '待确认', confirmed: '已确认', in_progress: '进行中', completed: '已完成', cancelled: '已取消',
    };
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status]}`}>{labels[status]}</span>;
  };

  const notifIcon = (type: Notification['type']) => {
    const map = { service_booked: '📋', service_completed: '✅', alert: '⚠️', reminder: '🔔', report: '📊' };
    return map[type];
  };

  return (
    <section id="family-monitor" className="bg-gradient-to-b from-blue-gray-50 to-white">
      <div className="section-container">
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">👨‍👩‍👧</span>
          <h2 className="section-title">家庭监管中心</h2>
          <p className="section-subtitle">
            添加子女为家庭成员，实时同步服务动态。子女可接收消息提醒、查看服务记录、代老人预约服务。
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {([
              { key: 'notifications', label: '消息通知', icon: '🔔', badge: unreadCount },
              { key: 'members', label: '家庭成员', icon: '👥' },
              { key: 'records', label: '服务记录', icon: '📋' },
              { key: 'book', label: '代预约服务', icon: '📅' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 relative ${
                  activeTab === tab.key
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* === NOTIFICATIONS TAB === */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-card-title font-bold text-gray-900">
                  📬 {unreadCount > 0 ? `${unreadCount} 条未读消息` : '全部已读'}
                </h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    全部标为已读
                  </button>
                )}
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`card border-l-4 transition-all ${
                    n.read
                      ? 'border-gray-200 opacity-70'
                      : n.type === 'alert'
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-primary-400 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{notifIcon(n.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">{n.title}</h4>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{n.message}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />}
                  </div>
                </div>
              ))}
              <div className="card bg-primary-50 border border-primary-200 text-center">
                <p className="text-sm text-primary-700">
                  <span className="font-bold">📱 短信通知：</span>
                  当老人预约或完成陪餐、陪诊等服务时，系统将自动向所有关联家庭成员发送短信提醒。
                  紧急联系人还会额外收到电话通知。
                </p>
              </div>
            </div>
          )}

          {/* === MEMBERS TAB === */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-card-title font-bold text-gray-900">👥 家庭成员列表</h3>
                <button onClick={() => setShowAddMember(true)} className="btn btn-primary text-sm !py-2 !px-4">
                  + 添加成员
                </button>
              </div>

              {members.map((m) => (
                <div key={m.id} className="card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold">
                      {m.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {m.name}
                        <span className="text-sm text-gray-400 font-normal ml-2">{m.relation}</span>
                      </h4>
                      <p className="text-sm text-gray-500">📱 {m.phone}  {m.email && `📧 ${m.email}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {m.isEmergencyContact && (
                      <span className="tag tag-orange text-xs">紧急联系人</span>
                    )}
                    <button onClick={() => removeMember(m.id)} className="text-red-400 hover:text-red-600 text-sm">
                      移除
                    </button>
                  </div>
                </div>
              ))}

              {showAddMember && (
                <div className="card border-2 border-primary-300 animate-in fade-in slide-in-from-top-2">
                  <h4 className="font-bold text-gray-900 mb-4">添加家庭成员</h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">姓名 *</label>
                      <input value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} placeholder="请输入姓名" className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">关系</label>
                      <select value={newMember.relation} onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none">
                        <option>子女</option><option>配偶</option><option>亲属</option><option>朋友/邻居</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">手机号 *</label>
                      <input value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} placeholder="用于接收短信通知" className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">邮箱（选填）</label>
                      <input value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} placeholder="用于接收邮件报告" className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-primary-400 outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={addMember} className="btn btn-primary text-sm">确认添加</button>
                    <button onClick={() => setShowAddMember(false)} className="btn btn-outline text-sm">取消</button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    * 添加后将自动关联该成员的短信通知权限。数据仅保存在本地浏览器。
                  </p>
                </div>
              )}
            </div>
          )}

          {/* === SERVICE RECORDS TAB === */}
          {activeTab === 'records' && (
            <div className="space-y-3">
              <h3 className="text-card-title font-bold text-gray-900 mb-3">📋 服务记录</h3>
              <div className="flex gap-2 mb-4">
                {['全部', '进行中', '已完成'].map((f) => (
                  <button key={f} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600">
                    {f}
                  </button>
                ))}
              </div>
              {serviceRecords.map((r) => (
                <div key={r.id} className="card flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{r.type}</h4>
                        {statusBadge(r.status)}
                      </div>
                      <p className="text-sm text-gray-500">{r.detail}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span>📅 {r.date} {r.time}</span>
                        <span>👤 预约人：{r.bookedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.report && (
                      <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                        📄 查看报告
                      </button>
                    )}
                    {r.status === 'completed' && !r.report && (
                      <span className="text-xs text-gray-400">等待服务报告</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* === BOOK SERVICE TAB (子女端代预约) === */}
          {activeTab === 'book' && (
            <div>
              <h3 className="text-card-title font-bold text-gray-900 mb-2">📅 为老人预约服务</h3>
              <p className="text-sm text-gray-500 mb-6">
                子女可通过此面板直接为老人预约陪餐、陪诊等服务。预约成功后，老人和所有家庭成员都会收到通知。
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { type: '上门陪餐', icon: '🍽️', desc: '陪老人用餐，记录饮食情况', price: '30元起', color: 'border-warm-400 bg-warm-50' },
                  { type: '陪诊服务', icon: '🏥', desc: '全程陪同就医，记录医嘱', price: '150元起', color: 'border-primary-400 bg-primary-50' },
                  { type: '助洁服务', icon: '🧹', desc: '居室清洁、洗衣、个人卫生', price: '80元起', color: 'border-care-400 bg-care-50' },
                  { type: '健康检查', icon: '🩺', desc: '上门基础体检、健康评估', price: '200元起', color: 'border-primary-500 bg-primary-100' },
                ].map((svc) => (
                  <button
                    key={svc.type}
                    onClick={() => handleBookService(svc.type, svc.icon)}
                    className={`card border-l-4 ${svc.color} text-left hover:shadow-card-hover transition-all`}
                  >
                    <span className="text-3xl block mb-2">{svc.icon}</span>
                    <h4 className="font-bold text-gray-900 mb-1">{svc.type}</h4>
                    <p className="text-xs text-gray-500 mb-2">{svc.desc}</p>
                    <span className="text-sm font-bold text-primary-600">{svc.price}</span>
                  </button>
                ))}
              </div>

              {showBookService && (
                <div className="mt-6 card border-2 border-primary-300 animate-in fade-in slide-in-from-top-2">
                  <h4 className="font-bold text-gray-900 mb-4">填写预约详情</h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
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
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 block mb-1">特殊需求备注</label>
                      <textarea rows={2} placeholder="如：老人近期膝盖疼痛，请多照顾..." className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400" />
                    </div>
                  </div>
                  <button onClick={() => handleBookService('上门陪餐', '🍽️')} className="btn btn-primary text-sm">
                    确认预约（模拟演示）
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Data safety notice */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            * 以上数据（家庭成员、通知记录）仅保存在浏览器本地（localStorage），不会上传至任何服务器。
            实际产品中短信通知需对接运营商接口。
          </p>
        </div>
      </div>
    </section>
  );
}
