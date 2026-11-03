export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-amber-300 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-yellow-400 blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-amber-700/50 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-amber-100 text-sm">新鲜烘焙 · 产地直发</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-amber-50 mb-4 leading-tight">
            每一杯，都是
            <br />
            <span className="text-amber-300">风味的旅行</span>
          </h2>
          <p className="text-amber-200/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            从埃塞俄比亚的高原到云南的山谷，我们精选全球优质产区的精品咖啡豆，
            以匠心烘焙，为您呈现每一颗咖啡豆最纯粹的风味表达。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-amber-200/70">
            <div className="flex items-center gap-1.5">
              <span>🌿</span> 精品产区直采
            </div>
            <div className="flex items-center gap-1.5">
              <span>🔥</span> 每周新鲜烘焙
            </div>
            <div className="flex items-center gap-1.5">
              <span>📦</span> 全国包邮
            </div>
            <div className="flex items-center gap-1.5">
              <span>⭐</span> 品质保证
            </div>
          </div>
        </div>
      </div>
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#fffbeb" fillOpacity="0.3"/>
        </svg>
      </div>
    </section>
  );
}
