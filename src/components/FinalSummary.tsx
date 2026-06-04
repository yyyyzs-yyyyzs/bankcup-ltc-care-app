export default function FinalSummary() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="summary" className="bg-gradient-to-b from-primary-800 to-primary-950 text-white">
      <div className="section-container">
        <h2 className="text-heading md:text-display font-bold text-center mb-6">最终定位</h2>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-card-hover">
            <div className="text-2xl md:text-3xl font-bold space-y-4">
              <p className="bg-white/10 rounded-2xl py-4 px-6">长护险预评估</p>
              <p className="text-3xl md:text-4xl text-warm-300">+</p>
              <p className="bg-white/10 rounded-2xl py-4 px-6">长护险外补充照护服务匹配</p>
              <p className="text-3xl md:text-4xl text-warm-300">+</p>
              <p className="bg-white/10 rounded-2xl py-4 px-6">收入分层推荐</p>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-2xl md:text-3xl font-bold text-warm-300">= 可落地的养老服务 App 方案</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed text-balance">
              "我们希望让老人和子女在真正失能之前，就能看见风险、理解政策、算清预算、匹配服务。"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <button onClick={() => scrollTo('assessment')} className="btn btn-warm btn-lg text-lg">
              开始体验预评估
            </button>
            <button
              onClick={() => scrollTo('recommendation')}
              className="btn border-2 border-white/30 text-white hover:bg-white/10 btn-lg text-lg"
            >
              查看服务推荐方案
            </button>
          </div>

          <p className="text-center text-white/40 text-sm mt-8">
            本项目为比赛展示方案，不构成任何形式的服务承诺或政策解读。
            <br />
            预评估结果仅供参考，不代替政府部门或医保经办机构的正式长护险评定。
          </p>
        </div>
      </div>
    </section>
  );
}
