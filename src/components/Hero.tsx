import { coreMessages } from '../data/platformData';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-16">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.08)_0%,transparent_70%)]" />

      <div className="section-container w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-sm text-blue-200 font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                2026厦门银行杯 · 养老金融创新方案
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight">
                厦门银行
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">银龄服务平台</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-lg">
                以银行账户为入口，连接身体评估、养老服务、优惠权益与家庭监管。
              </p>
              <p className="text-sm text-blue-200/60 leading-relaxed max-w-md">
                银行不直接提供医疗护理服务，而是联合医护、康复、养老机构，为客户提供评估、推荐、预约、优惠和服务监管。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-500/15 border border-blue-400/20 rounded-full text-sm text-blue-200 backdrop-blur-sm">🏦 厦门银行</span>
              <span className="px-4 py-2 bg-amber-500/10 border border-amber-400/20 rounded-full text-sm text-amber-200 backdrop-blur-sm">🩺 医护评估</span>
              <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-sm text-emerald-200 backdrop-blur-sm">🏠 养老服务</span>
              <span className="px-4 py-2 bg-violet-500/10 border border-violet-400/20 rounded-full text-sm text-violet-200 backdrop-blur-sm">👨‍👩‍👧 家庭监管</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('assessment-flow')} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 active:scale-[0.98] text-lg min-h-[56px]">
                预约上门评估
              </button>
              <button onClick={() => scrollTo('bank-tiers')} className="px-8 py-4 border-2 border-blue-300/30 text-blue-100 hover:bg-blue-500/10 font-bold rounded-2xl transition-all duration-300 text-lg min-h-[56px]">
                查看服务权益
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <p className="text-amber-300/90 text-lg font-bold mb-2">{coreMessages.tagline}</p>
              <p className="text-blue-100/60 text-sm leading-relaxed">{coreMessages.compliance4}</p>
            </div>
          </div>

          {/* Right side visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-blue-500/10 animate-pulse" style={{ animationDuration: '5s' }} />
                <div className="absolute w-56 h-56 rounded-full bg-amber-500/5 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-10 text-center shadow-2xl">
                  <span className="text-7xl">🏦</span>
                  <p className="text-white/70 text-sm mt-3 font-medium">厦门银行</p>
                  <p className="text-amber-400/80 text-xs mt-1">银龄服务</p>
                </div>
              </div>
              <div className="absolute top-8 left-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg animate-in fade-in">
                <span className="text-3xl">🩺</span>
                <p className="text-white/60 text-xs mt-1">上门评估</p>
              </div>
              <div className="absolute top-12 right-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg animate-in fade-in">
                <span className="text-3xl">💎</span>
                <p className="text-white/60 text-xs mt-1">专属优惠</p>
              </div>
              <div className="absolute bottom-12 left-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg animate-in fade-in">
                <span className="text-3xl">👨‍👩‍👧</span>
                <p className="text-white/60 text-xs mt-1">家庭监管</p>
              </div>
              <div className="absolute bottom-8 right-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg animate-in fade-in">
                <span className="text-3xl">📊</span>
                <p className="text-white/60 text-xs mt-1">服务流水</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-blue-200/40 animate-bounce">
          <span className="text-xs">向下滚动探索</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
