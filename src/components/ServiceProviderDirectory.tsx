import { useState, useMemo } from 'react';

interface Provider {
  id: string;
  name: string;
  type: string;
  icon: string;
  rating: number;
  reviewCount: number;
  distance: number;
  address: string;
  phone: string;
  services: string[];
  supportsLTC: boolean;
  supportsSubsidy: boolean;
  priceRange: string;
  highlights: string[];
  availability: string;
}

const mockProviders: Provider[] = [
  {
    id: 'p1', name: '安康居家养老服务中心', type: '居家服务', icon: '🏠',
    rating: 4.8, reviewCount: 326, distance: 1.2, address: '静安区南京西路1288号',
    phone: '021-6288XXXX', services: ['上门陪餐', '助洁助浴', '陪诊服务', '上门护理'],
    supportsLTC: true, supportsSubsidy: true, priceRange: '30-200元/次',
    highlights: ['长护险定点机构', '10年服务经验', '500+服务人员'], availability: '周一至周日 6:00-22:00',
  },
  {
    id: 'p2', name: '颐养天年日间照料中心', type: '社区日托', icon: '🏘️',
    rating: 4.6, reviewCount: 189, distance: 2.5, address: '徐汇区漕溪北路396号',
    phone: '021-6487XXXX', services: ['日间照料', '社区助餐', '康复训练', '社交活动'],
    supportsLTC: true, supportsSubsidy: true, priceRange: '50-120元/天',
    highlights: ['政府购买服务定点', '营养师配餐', '每日健康操'], availability: '周一至周五 7:30-18:00',
  },
  {
    id: 'p3', name: '爱心陪诊服务平台', type: '陪诊服务', icon: '🏥',
    rating: 4.9, reviewCount: 512, distance: 0.8, address: '黄浦区人民路998号',
    phone: '021-6328XXXX', services: ['陪诊服务', '代取报告', '药品配送', '远程陪诊'],
    supportsLTC: false, supportsSubsidy: false, priceRange: '50-800元/次',
    highlights: ['覆盖全市三甲医院', '陪诊师持证上岗', '就诊报告电子化'], availability: '周一至周日 6:00-20:00',
  },
  {
    id: 'p4', name: '银龄护理站', type: '专业护理', icon: '🩺',
    rating: 4.7, reviewCount: 278, distance: 3.1, address: '浦东新区张杨路1688号',
    phone: '021-5878XXXX', services: ['上门护理', '康复训练', '认知照护', '慢病管理'],
    supportsLTC: true, supportsSubsidy: true, priceRange: '100-500元/次',
    highlights: ['护士持证率100%', '长护险协议机构', '24小时应急响应'], availability: '24小时',
  },
  {
    id: 'p5', name: '幸福食光老年助餐', type: '餐饮服务', icon: '🍽️',
    rating: 4.5, reviewCount: 203, distance: 1.8, address: '长宁区虹桥路999号',
    phone: '021-6234XXXX', services: ['上门陪餐', '营养配餐', '社区助餐', '送餐上门'],
    supportsLTC: false, supportsSubsidy: true, priceRange: '20-150元/餐',
    highlights: ['营养师定制菜单', '特殊膳食支持', '可预约试吃'], availability: '周一至周日 7:00-19:00',
  },
  {
    id: 'p6', name: '康宁养老院（护理型）', type: '机构养老', icon: '🏡',
    rating: 4.4, reviewCount: 156, distance: 5.2, address: '闵行区沪闵路3000号',
    phone: '021-6412XXXX', services: ['护理型机构', '认知照护', '康复护理', '临终关怀'],
    supportsLTC: true, supportsSubsidy: true, priceRange: '4,000-12,000元/月',
    highlights: ['园林式环境', '医养结合', '家属可随时探望'], availability: '24小时入住',
  },
  {
    id: 'p7', name: '安心适老化改造服务', type: '居家改造', icon: '🔧',
    rating: 4.8, reviewCount: 89, distance: 2.0, address: '普陀区中山北路2185号',
    phone: '021-6278XXXX', services: ['适老化改造', '辅具租赁', '无障碍设计', '智能安防安装'],
    supportsLTC: false, supportsSubsidy: true, priceRange: '500-30,000元/项',
    highlights: ['免费上门评估', '政府补贴申领协助', '1年质保'], availability: '周一至周六 9:00-18:00',
  },
  {
    id: 'p8', name: '乐活社区养老驿站', type: '社区驿站', icon: '☕',
    rating: 4.3, reviewCount: 412, distance: 0.5, address: '虹口区四川北路1800号',
    phone: '021-5666XXXX', services: ['社区助餐', '健康咨询', '志愿陪伴', '兴趣小组'],
    supportsLTC: false, supportsSubsidy: true, priceRange: '免费-30元/次',
    highlights: ['政府公益项目', '志愿者团队', '邻里互助网络'], availability: '周一至周日 8:00-17:00',
  },
];

const serviceTypes = ['全部', '居家服务', '社区日托', '陪诊服务', '专业护理', '餐饮服务', '机构养老', '居家改造', '社区驿站'];
const sortOptions = [
  { key: 'distance', label: '距离最近' },
  { key: 'rating', label: '评分最高' },
  { key: 'reviews', label: '评价最多' },
];

export default function ServiceProviderDirectory() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [ltcFilter, setLtcFilter] = useState(false);
  const [subsidyFilter, setSubsidyFilter] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const filtered = useMemo(() => {
    return mockProviders
      .filter((p) => {
        if (typeFilter !== '全部' && p.type !== typeFilter) return false;
        if (ltcFilter && !p.supportsLTC) return false;
        if (subsidyFilter && !p.supportsSubsidy) return false;
        if (search && !p.name.includes(search) && !p.services.some((s) => s.includes(search)) && !p.address.includes(search)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') return a.distance - b.distance;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [search, typeFilter, ltcFilter, subsidyFilter, sortBy]);

  return (
    <section id="provider-directory" className="bg-blue-gray-50">
      <div className="section-container">
        <h2 className="section-title">服务提供方目录</h2>
        <p className="section-subtitle">
          对照评估结果，查找身边可用的养老服务提供方 — 支持长护险、补贴、评分等多维筛选
        </p>

        <div className="max-w-6xl mx-auto">
          {/* Search + Filters */}
          <div className="card mb-6 !p-4 md:!p-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索机构名称、服务类型、地址..."
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400 bg-white"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 mr-1">类型：</span>
              {serviceTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    typeFilter === t ? 'bg-primary-500 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
              <span className="mx-2 text-gray-300">|</span>
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" checked={ltcFilter} onChange={(e) => setLtcFilter(e.target.checked)} className="accent-primary-500" />
                支持长护险
              </label>
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" checked={subsidyFilter} onChange={(e) => setSubsidyFilter(e.target.checked)} className="accent-primary-500" />
                支持补贴
              </label>
              <span className="text-xs text-gray-400 ml-auto">{filtered.length} 个结果</span>
            </div>
          </div>

          {/* Provider List */}
          <div className="grid lg:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p)}
                className="card cursor-pointer border border-gray-100 hover:border-primary-300 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{p.name}</h4>
                      <span className="text-xs text-gray-500">{p.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-warm-500">★</span>
                      <span className="font-bold text-gray-800">{p.rating}</span>
                      <span className="text-gray-400 text-xs">({p.reviewCount})</span>
                    </div>
                    <span className="text-xs text-gray-400">{p.distance}km</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-2">📍 {p.address}</p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.services.slice(0, 4).map((s) => (
                    <span key={s} className="text-xs bg-blue-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                  {p.services.length > 4 && (
                    <span className="text-xs text-gray-400">+{p.services.length - 4}项</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {p.supportsLTC && <span className="tag tag-blue text-xs !py-0.5 !px-2">长护险</span>}
                  {p.supportsSubsidy && <span className="tag tag-green text-xs !py-0.5 !px-2">补贴支持</span>}
                  <span className="text-xs text-gray-400 ml-auto">{p.priceRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail modal */}
        {selectedProvider && (
          <div className="mt-8 max-w-3xl mx-auto card border-2 border-primary-200 shadow-card-hover animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedProvider.icon}</span>
                <div>
                  <h3 className="text-heading font-bold text-gray-900">{selectedProvider.name}</h3>
                  <p className="text-sm text-gray-500">{selectedProvider.type} · {selectedProvider.address}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProvider(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-gray-50 rounded-xl">
                <p className="text-2xl font-black text-primary-600">★ {selectedProvider.rating}</p>
                <p className="text-xs text-gray-400">{selectedProvider.reviewCount}条评价</p>
              </div>
              <div className="text-center p-3 bg-blue-gray-50 rounded-xl">
                <p className="text-2xl font-black text-warm-600">{selectedProvider.distance}km</p>
                <p className="text-xs text-gray-400">距离</p>
              </div>
              <div className="text-center p-3 bg-blue-gray-50 rounded-xl">
                <p className="text-lg font-black text-care-600">{selectedProvider.priceRange}</p>
                <p className="text-xs text-gray-400">价格区间</p>
              </div>
              <div className="text-center p-3 bg-blue-gray-50 rounded-xl">
                <p className="text-sm font-black text-gray-600">{selectedProvider.availability}</p>
                <p className="text-xs text-gray-400">服务时间</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-bold text-gray-900 mb-2 text-sm">🏷️ 服务项目</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProvider.services.map((s) => (
                    <span key={s} className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 mb-2 text-sm">🌟 亮点</h5>
                <ul className="space-y-1">
                  {selectedProvider.highlights.map((h) => (
                    <li key={h} className="text-sm text-gray-700 flex items-center gap-1.5">
                      <span className="text-warm-500">✦</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 p-3 bg-blue-gray-50 rounded-xl mb-4">
              <span className="text-sm text-gray-600">📞 {selectedProvider.phone}</span>
              {selectedProvider.supportsLTC && <span className="tag tag-blue text-xs">长护险定点</span>}
              {selectedProvider.supportsSubsidy && <span className="tag tag-green text-xs">可申领补贴</span>}
            </div>

            <div className="flex gap-3">
              <button className="btn btn-primary">📅 预约服务</button>
              <button className="btn btn-outline text-sm">📞 电话咨询</button>
              <button onClick={() => setSelectedProvider(null)} className="btn text-sm text-gray-400 hover:text-gray-600">关闭</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
