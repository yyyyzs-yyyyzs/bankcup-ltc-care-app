import { useState, useEffect, useRef } from 'react';
import { navItems } from '../data/mockData';

const navGroups = [
  { label: '方案展示', items: ['hero','pain-points','mainland','taiwan','taiwan-abc','core-logic','app-modules'] },
  { label: '评估服务', items: ['assessment','recommendation','services','meal-companion','medical-escort','respite-care','family-monitor'] },
  { label: '工具评估', items: ['adls-assessment','provider-directory','virtual-advisor'] },
  { label: '金融产品', items: ['pension-calculator','bank-products'] },
  { label: '知识参考', items: ['international','knowledge-base'] },
  { label: '总结', items: ['innovation','financial','summary'] },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop - 120;
        if (window.scrollY >= top) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setOpenGroup(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isGroupActive = (group: typeof navGroups[number]) =>
    group.items.some((id) => activeSection === id);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100'
          : 'bg-white/85 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-primary-700 font-bold text-lg hover:text-primary-900 transition-colors flex-shrink-0"
          >
            <span className="text-2xl">🏠</span>
            <span className="hidden sm:inline">养老智配</span>
          </button>

          {/* Desktop nav: grouped dropdown */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navGroups.map((group) => (
              <div key={group.label} className="relative">
                <button
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isGroupActive(group)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {group.label}
                  <span className={`text-xs transition-transform duration-200 ${openGroup === group.label ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {openGroup === group.label && (
                  <div className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px] z-50 animate-in fade-in slide-in-from-top-2">
                    {group.items.map((id) => {
                      const item = navItems.find((n) => n.id === id);
                      if (!item) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => scrollTo(id)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                            activeSection === id
                              ? 'text-primary-700 font-bold bg-primary-50'
                              : 'text-gray-600'
                          }`}
                        >
                          {activeSection === id && <span className="mr-1">●</span>}
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 max-h-[70vh] overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.label} className="mt-2">
                <p className="text-xs font-bold text-gray-400 px-2 py-1 uppercase tracking-wide">{group.label}</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {group.items.map((id) => {
                    const item = navItems.find((n) => n.id === id);
                    if (!item) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`px-2 py-2.5 rounded-lg text-xs font-medium text-left transition-colors min-h-[44px] ${
                          activeSection === id
                            ? 'bg-primary-50 text-primary-700 font-bold'
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
