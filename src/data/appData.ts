// App data for the mobile application

export interface ElderlyProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  assessmentLevel: string;
  assessmentScore: number;
  assessmentDate: string;
  mainRisks: string[];
  city: string;
  address: string;
  phone: string;
  relation: string; // 与子女关系
}

export interface BookedService {
  id: string;
  elderlyId: string;
  elderlyName: string;
  serviceName: string;
  provider: string;
  moduleName: string;
  date: string;
  time: string;
  location: string;
  originalPrice: number;
  discountPrice: number;
  status: '已预约' | '进行中' | '已完成' | '已取消';
  bookedBy: string; // '老人本人' or '子女代预约'
  notes?: string;
}

export interface BoundChild {
  id: string;
  name: string;
  relation: string;
  phone: string;
  avatar: string;
  bindDate: string;
  permissions: string[];
}

export const currentElderly: ElderlyProfile = {
  id: 'e1',
  name: '陈阿姨',
  age: 76,
  gender: '女',
  avatar: '👵',
  assessmentLevel: 'B — 中度照护需求',
  assessmentScore: 7,
  assessmentDate: '2026-05-15',
  mainRisks: ['洗澡困难', '上下楼不便', '跌倒风险较高', '轻度高血压'],
  city: '厦门市思明区',
  address: '思明区XX路XX号301室',
  phone: '138****5678',
  relation: '母亲',
};

export const boundChildren: BoundChild[] = [
  {
    id: 'c1',
    name: '陈小明',
    relation: '儿子',
    phone: '139****1234',
    avatar: '👨',
    bindDate: '2026-05-16',
    permissions: ['查看服务记录', '查看费用账单', '接收异常提醒', '协助预约服务'],
  },
  {
    id: 'c2',
    name: '陈小红',
    relation: '女儿',
    phone: '136****5678',
    avatar: '👩',
    bindDate: '2026-05-16',
    permissions: ['查看服务记录', '接收异常提醒'],
  },
];

export const myBookings: BookedService[] = [
  {
    id: 'b1',
    elderlyId: 'e1',
    elderlyName: '陈阿姨',
    serviceName: '上门助浴',
    provider: '厦门安心护理中心',
    moduleName: '居家生活照护',
    date: '2026-06-05',
    time: '09:00-10:30',
    location: '思明区XX路XX号301室（家中）',
    originalPrice: 150,
    discountPrice: 120,
    status: '已完成',
    bookedBy: '老人本人',
    notes: '水温适中，服务态度好',
  },
  {
    id: 'b2',
    elderlyId: 'e1',
    elderlyName: '陈阿姨',
    serviceName: '陪诊服务',
    provider: '银龄陪诊服务中心',
    moduleName: '陪诊助医与交通接送',
    date: '2026-06-08',
    time: '14:00-17:00',
    location: '厦门大学附属第一医院 心内科',
    originalPrice: 220,
    discountPrice: 180,
    status: '已完成',
    bookedBy: '子女代预约',
    notes: '复诊取药，一切顺利',
  },
  {
    id: 'b3',
    elderlyId: 'e1',
    elderlyName: '陈阿姨',
    serviceName: '居家清洁',
    provider: '思明社区服务中心',
    moduleName: '居家生活照护',
    date: '2026-06-12',
    time: '10:00-12:00',
    location: '思明区XX路XX号301室（家中）',
    originalPrice: 120,
    discountPrice: 99,
    status: '已预约',
    bookedBy: '老人本人',
  },
  {
    id: 'b4',
    elderlyId: 'e1',
    elderlyName: '陈阿姨',
    serviceName: '上门康复',
    provider: '鹭岛康复服务站',
    moduleName: '医护康复服务',
    date: '2026-06-15',
    time: '15:00-16:00',
    location: '思明区XX路XX号301室（家中）',
    originalPrice: 300,
    discountPrice: 240,
    status: '已预约',
    bookedBy: '子女代预约',
  },
];

// Services organized for mobile display
export interface ServiceModuleMobile {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

export const serviceModulesMobile: ServiceModuleMobile[] = [
  { id: 'assessment', icon: '🩺', title: '身体评估与照护建议', subtitle: '银行+医护联合上门评估', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'home-care', icon: '🏠', title: '居家生活照护', subtitle: '助餐·助浴·助洁·起居', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { id: 'medical-rehab', icon: '🏥', title: '医护康复服务', subtitle: '护理·康复·慢病管理', color: 'text-violet-600', bgColor: 'bg-violet-50' },
  { id: 'medical-escort', icon: '🚗', title: '陪诊助医与交通接送', subtitle: '陪诊·取药·就医交通', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { id: 'daycare', icon: '☀️', title: '社区日间照料', subtitle: '日托·活动·助餐', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { id: 'institution', icon: '🏡', title: '养老机构与短期托养', subtitle: '机构入住·短期托养', color: 'text-rose-600', bgColor: 'bg-rose-50' },
  { id: 'equipment', icon: '🔧', title: '辅具租赁与适老化改造', subtitle: '辅具·改造·安全设备', color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { id: 'family-monitor', icon: '👨‍👩‍👧', title: '家庭照护监管', subtitle: '授权·流水·子女监管', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
];

// Service locations for booking
export const serviceLocations: Record<string, string[]> = {
  'home-care': ['老人家中（上门服务）'],
  'medical-rehab': ['老人家中（上门服务）', '鹭岛康复服务站（湖里区XX路）', '思明社区健康中心（思明区XX路）'],
  'medical-escort': ['厦门大学附属第一医院', '厦门中山医院', '厦门市中医院', '厦门市心血管病医院'],
  'daycare': ['思明社区日照中心（思明区XX路）', '湖里街道养老服务中心'],
  'institution': ['海沧康养公寓（海沧区XX路）', '厦门XX护理院（集美区）', '厦门XX养老院（思明区）'],
  'equipment': ['老人家中（上门评估/安装）', '湖里适老化改造服务站'],
  'assessment': ['老人家中（上门评估）'],
  'family-monitor': ['线上服务'],
};

export const timeSlots = ['08:00-09:00', '09:00-10:30', '10:30-12:00', '14:00-15:30', '15:30-17:00', '17:00-18:30'];
