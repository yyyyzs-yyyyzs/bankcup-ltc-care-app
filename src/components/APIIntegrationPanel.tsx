import { useState } from 'react';

const apiModules = [
  {
    title: '用户端 API',
    icon: '👤',
    endpoints: [
      { method: 'POST', path: '/api/profile', desc: '同步用户基本信息与照护偏好' },
      { method: 'GET', path: '/api/services', desc: '获取服务目录与详情' },
      { method: 'POST', path: '/api/recommend', desc: '提交预评估结果，获取服务推荐' },
      { method: 'POST', path: '/api/booking', desc: '提交服务预约请求' },
      { method: 'GET', path: '/api/bookings/{id}', desc: '查询预约状态与进度' },
    ],
    color: 'border-primary-400 bg-primary-50',
  },
  {
    title: '机构端 API',
    icon: '🏥',
    endpoints: [
      { method: 'GET', path: '/api/provider/bookings', desc: '查询分配给本机构的预约' },
      { method: 'PUT', path: '/api/provider/bookings/{id}', desc: '更新预约状态（确认/进行中/完成）' },
      { method: 'GET', path: '/api/provider/profile', desc: '查询本机构注册信息' },
    ],
    color: 'border-care-400 bg-care-50',
  },
  {
    title: '管理端 API',
    icon: '⚙️',
    endpoints: [
      { method: 'GET', path: '/api/admin/providers', desc: '管理机构入驻信息' },
      { method: 'GET', path: '/api/admin/analytics', desc: '服务匹配与预约统计' },
      { method: 'POST', path: '/api/admin/audit', desc: '审核服务提供方资质' },
    ],
    color: 'border-warm-400 bg-warm-50',
  },
];

export default function APIIntegrationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="api-panel" className="bg-blue-gray-50">
      <div className="section-container">
        <div className="card border border-gray-200">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔌</span>
              <div>
                <h3 className="text-card-title font-bold text-gray-800">接口预留面板（开发者参考）</h3>
                <p className="text-sm text-gray-500">当前为 Demo 阶段，前端使用 Mock 数据。此面板展示未来对接真实后端时的 API 设计方案。</p>
              </div>
            </div>
            <span className={`text-2xl text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {isOpen && (
            <div className="mt-5 space-y-4 pt-4 border-t border-gray-100">
              {apiModules.map((mod) => (
                <div key={mod.title} className={`rounded-xl border-2 ${mod.color} p-4`}>
                  <h4 className="font-bold text-gray-800 mb-3">
                    {mod.icon} {mod.title}
                  </h4>
                  <div className="space-y-2">
                    {mod.endpoints.map((ep, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/80 rounded-lg px-3 py-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          ep.method === 'GET' ? 'bg-care-100 text-care-700' :
                          ep.method === 'POST' ? 'bg-primary-100 text-primary-700' :
                          'bg-warm-100 text-warm-700'
                        }`}>
                          {ep.method}
                        </span>
                        <code className="text-sm text-gray-700">{ep.path}</code>
                        <span className="text-sm text-gray-500 flex-1">{ep.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-gray-800 text-gray-100 rounded-xl p-4 font-mono text-sm">
                <p className="text-green-400">// 当前演示阶段所有接口均返回 Mock 数据</p>
                <p className="text-gray-400 mt-1">// 正式上线前需替换为真实 API endpoint</p>
                <p className="text-gray-400 mt-1">// 建议使用 RESTful 风格，JSON 格式传输</p>
                <p className="text-gray-400 mt-1">// 认证方案：JWT token + HTTPS</p>
                <p className="text-gray-400 mt-1">// 数据库推荐：PostgreSQL (主库) + Redis (缓存)</p>
                <p className="text-gray-400 mt-1">// 地图服务：高德地图 Web API (需 API Key)</p>
                <p className="text-yellow-400 mt-1">// 当前为比赛演示原型，API 仅作为设计方案预留</p>
              </div>

              <p className="text-xs text-gray-400 italic">
                本页面为比赛演示原型的技术架构展示。所有 API 端点为设计方案，当前未实现真实后端。
                如需对接真实服务提供方和医保系统，需取得相应资质和授权。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
