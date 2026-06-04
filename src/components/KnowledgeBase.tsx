import { useState, useMemo } from 'react';
import { knowledgeItems, categoryLabels } from '../data/knowledgeBase';
import type { KnowledgeItem } from '../data/knowledgeBase';

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return knowledgeItems.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !search ||
        item.question.includes(search) ||
        item.answer.includes(search) ||
        item.tags.some((t) => t.includes(search));
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  const categories = ['all', ...Object.keys(categoryLabels)];

  return (
    <section id="knowledge-base" className="bg-white">
      <div className="section-container">
        <h2 className="section-title">养老知识库</h2>
        <p className="section-subtitle">
          基于政策文件和国际经验整理，帮助您快速了解养老相关知识
        </p>

        {/* Search + Filter */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索问题，如：长护险、税优、日本介护..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 text-body focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? '📚 全部' : categoryLabels[cat as KnowledgeItem['category']]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="card text-center py-12">
              <span className="text-5xl block mb-4">📭</span>
              <p className="text-gray-500 text-body-lg">未找到匹配的知识条目，试试其他关键词</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="card border border-gray-100 hover:border-primary-200 transition-all cursor-pointer"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-50 text-primary-600">
                        {item.category}
                      </span>
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-400">{tag}</span>
                      ))}
                    </div>
                    <h4 className="text-body-lg font-bold text-gray-900">
                      <span className="mr-2">{expandedId === item.id ? '🔽' : '▶️'}</span>
                      {item.question}
                    </h4>
                    {expandedId === item.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                        <p className="text-body text-gray-700 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          * 以上信息整理自公开政策文件、国际组织报告和学术文献，仅供参考。具体政策以最新官方发布为准。
        </p>
      </div>
    </section>
  );
}
