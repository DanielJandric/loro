'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { VerifiedTests } from '@/components/VerifiedTests';
import Link from 'next/link';

export default function TestsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/20"
          >
            {language === 'fr' ? '← Retour à l\'accueil' : '← Back to home'}
          </Link>

          <div className="mt-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {language === 'fr' ? 'Analyses Mathématiques Vérifiées' : 'Verified Mathematical Analyses'}
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/80">
              {language === 'fr' 
                ? 'Résultats calculés directement sur 309 tirages réels. Aucune estimation.'
                : 'Results calculated directly from 309 real draws. No estimates.'}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <VerifiedTests language={language} />
      </main>

      <footer className="mt-20 border-t border-white/10 bg-slate-900/50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-white/40">
            {language === 'fr'
              ? 'Toutes les analyses sont effectuées sur les données réelles du fichier data.csv (309 tirages)'
              : 'All analyses are performed on real data from data.csv file (309 draws)'}
          </p>
        </div>
      </footer>
    </div>
  );
}