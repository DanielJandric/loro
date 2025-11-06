'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 border border-white/20"
      aria-label="Change language"
    >
      <span className={`${language === 'fr' ? 'opacity-100' : 'opacity-50'}`}>
        FR
      </span>
      <span className="text-white/50">|</span>
      <span className={`${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>
        EN
      </span>
    </button>
  );
}
