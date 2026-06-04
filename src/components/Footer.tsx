export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="section-container !py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-3">养老智配</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              长护险预评估与收入分层养老服务匹配平台。
              <br />
              帮助老人和子女看见风险、理解政策、算清预算、匹配服务。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">快速导航</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'pain-points', label: '痛点分析' },
                { id: 'core-logic', label: '核心逻辑' },
                { id: 'assessment', label: '预评估体验' },
                { id: 'recommendation', label: '服务推荐' },
                { id: 'innovation', label: '创新价值' },
                { id: 'summary', label: '路演总结' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">重要声明</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              本平台的预评估结果仅为参考，不代替政府部门或医保经办机构的正式长护险评定。具体政策请以当地医保部门发布为准。
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>长护险预评估与收入分层养老服务匹配 App · 比赛展示项目</p>
          <p className="mt-1">本项目为创新方案展示，不构成任何形式的服务承诺或政策解读。</p>
        </div>
      </div>
    </footer>
  );
}
