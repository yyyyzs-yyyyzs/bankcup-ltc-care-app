export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-primary-50/60 via-cream to-warm-50/40 pt-16">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-care-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-warm-200/15 rounded-full blur-2xl" />

      <div className="section-container w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm text-primary-700 font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                2026银行杯 · 养老金融创新方案
              </div>
              <h1 className="text-display md:text-[2.75rem] lg:text-[3.25rem] font-bold text-gray-900 leading-tight text-balance">
                长护险预评估与收入分层
                <br />
                养老服务匹配{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">App</span>
              </h1>
              <p className="text-subheading text-gray-600 text-balance leading-relaxed">
                让老人和子女更清楚地知道：是否可能申请长护险？如果暂未达到长护险门槛，又该选择哪些可负担的养老服务？
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="tag tag-blue text-base" role="status">长护险预评估</span>
              <span className="tag tag-orange text-base" role="status">收入分层匹配</span>
              <span className="tag tag-green text-base" role="status">养老服务推荐</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('assessment')}
                className="btn btn-primary btn-lg min-h-[56px] min-w-[160px]"
                aria-label="开始长护险预评估"
              >
                开始预评估
              </button>
              <button
                onClick={() => scrollTo('recommendation')}
                className="btn btn-outline btn-lg min-h-[56px] min-w-[160px]"
                aria-label="查看养老服务方案"
              >
                查看服务方案
              </button>
            </div>

            <div className="gradient-blue card !p-6 !rounded-2xl !shadow-card-hover">
              <p className="text-white/90 text-body text-center leading-relaxed">
                大陆长护险制度基础 + 台湾评估匹配经验 + 收入分层服务推荐
                <br />
                <span className="text-xl md:text-2xl font-bold mt-2 block">= 可落地的养老金融服务 App</span>
              </p>
            </div>
          </div>

          {/* Illustration area */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-primary-100/40 animate-pulse" style={{ animationDuration: '5s' }} />
                <div className="absolute w-64 h-64 rounded-full bg-care-100/30 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                <div className="absolute w-48 h-48 rounded-full bg-warm-100/40 animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
              </div>
              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="card !rounded-full !p-8 !shadow-soft text-center">
                  <span className="text-6xl">👴👵</span>
                  <p className="text-sm text-gray-500 mt-2 font-medium">安心养老</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-6 left-6 card !p-3 !rounded-xl !shadow-soft text-sm animate-in fade-in">
                <span className="text-2xl">🏥</span>
                <p className="text-xs text-gray-500">医疗保障</p>
              </div>
              <div className="absolute top-10 right-6 card !p-3 !rounded-xl !shadow-soft text-sm animate-in fade-in">
                <span className="text-2xl">💰</span>
                <p className="text-xs text-gray-500">费用测算</p>
              </div>
              <div className="absolute bottom-10 left-8 card !p-3 !rounded-xl !shadow-soft text-sm animate-in fade-in">
                <span className="text-2xl">🤝</span>
                <p className="text-xs text-gray-500">服务匹配</p>
              </div>
              <div className="absolute bottom-6 right-6 card !p-3 !rounded-xl !shadow-soft text-sm animate-in fade-in">
                <span className="text-2xl">🏡</span>
                <p className="text-xs text-gray-500">居家养老</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span className="text-xs">向下滚动探索更多</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
