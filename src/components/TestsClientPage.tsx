'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { testsTranslations } from '@/lib/testsTranslations';
import { TestCard } from './TestCard';
import Link from 'next/link';

export function TestsClientPage() {
  const { language } = useLanguage();
  const t = testsTranslations[language];

  const testSections = [
    {
      title: t.sections.sequences,
      tests: [
        {
          ...t.tests.ljungBox,
          iconType: 'ljungbox' as const,
          pValue: '0.0044',
          statistic: 'Q=18.73',
          status: 'critical' as const,
        },
        {
          ...t.tests.spectral,
          iconType: 'spectral' as const,
          statistic: '3.2x amplitude',
          status: 'critical' as const,
        },
        {
          ...t.tests.cusum,
          iconType: 'cusum' as const,
          statistic: '5 breakpoints',
          status: 'failed' as const,
        },
      ],
    },
    {
      title: t.sections.temporal,
      tests: [
        {
          ...t.tests.markov,
          iconType: 'markov' as const,
          statistic: '44.7% vs 15.2%',
          status: 'critical' as const,
        },
        {
          ...t.tests.mutualInfo,
          iconType: 'mutualinfo' as const,
          statistic: '0.0312 bits',
          status: 'critical' as const,
        },
      ],
    },
    {
      title: t.sections.distribution,
      tests: [
        {
          ...t.tests.anderson,
          iconType: 'anderson' as const,
          pValue: '0.0002',
          statistic: 'AD=4.82',
          status: 'critical' as const,
        },
      ],
    },
    {
      title: t.sections.clustering,
      tests: [
        {
          ...t.tests.kmeans,
          iconType: 'kmeans' as const,
          statistic: '3 clusters',
          status: 'failed' as const,
        },
      ],
    },
    {
      title: t.sections.predictive,
      tests: [
        {
          ...t.tests.randomForest,
          iconType: 'randomforest' as const,
          statistic: '68.3%',
          status: 'critical' as const,
        },
        {
          ...t.tests.lstm,
          iconType: 'lstm' as const,
          statistic: '71.2%',
          status: 'critical' as const,
        },
      ],
    },
    {
      title: t.sections.gameSpecific,
      tests: [
        {
          ...t.tests.rtpWindow,
          iconType: 'rtp' as const,
          statistic: '-33% variance',
          status: 'failed' as const,
        },
        {
          ...t.tests.streaks,
          iconType: 'streaks' as const,
          statistic: '4 vs 7-8',
          status: 'failed' as const,
        },
      ],
    },
    {
      title: t.sections.regulatory,
      tests: [
        {
          ...t.tests.baileySimon,
          iconType: 'bailey' as const,
          pValue: '0.0071',
          statistic: 'BS=7.23',
          status: 'critical' as const,
        },
        {
          ...t.tests.diehard,
          iconType: 'diehard' as const,
          statistic: '11/15 failed',
          status: 'critical' as const,
        },
      ],
    },
    {
      title: t.sections.economic,
      tests: [
        {
          ...t.tests.var,
          iconType: 'var' as const,
          statistic: '+50% risk',
          status: 'critical' as const,
        },
      ],
    },
    {
      title: t.sections.metaAnalysis,
      tests: [
        {
          ...t.tests.fisher,
          iconType: 'fisher' as const,
          pValue: '<0.0000001',
          statistic: 'χ²=89.4',
          status: 'critical' as const,
        },
        {
          ...t.tests.bayesian,
          iconType: 'bayesian' as const,
          statistic: '28,450:1',
          status: 'critical' as const,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 py-20">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-slate-900/20" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/20"
          >
            {t.navigation.backHome}
          </Link>

          <div className="mt-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            <p className="max-w-3xl text-xl text-white/80">
              {t.subtitle}
            </p>
            <p className="max-w-2xl text-base text-white/60">
              {t.description}
            </p>
          </div>

          {/* Key stats */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <div className="rounded-xl bg-red-500/20 p-4 text-center backdrop-blur">
              <p className="text-3xl font-bold text-red-400">16/16</p>
              <p className="mt-1 text-xs text-red-300/80">{language === 'fr' ? 'Tests échoués' : 'Tests failed'}</p>
            </div>
            <div className="rounded-xl bg-purple-500/20 p-4 text-center backdrop-blur">
              <p className="text-3xl font-bold text-purple-400">99.9997%</p>
              <p className="mt-1 text-xs text-purple-300/80">{language === 'fr' ? 'Certitude' : 'Certainty'}</p>
            </div>
            <div className="rounded-xl bg-amber-500/20 p-4 text-center backdrop-blur">
              <p className="text-3xl font-bold text-amber-400">71.2%</p>
              <p className="mt-1 text-xs text-amber-300/80">{language === 'fr' ? 'Prédictibilité' : 'Predictability'}</p>
            </div>
            <div className="rounded-xl bg-cyan-500/20 p-4 text-center backdrop-blur">
              <p className="text-3xl font-bold text-cyan-400">10^-7</p>
              <p className="mt-1 text-xs text-cyan-300/80">p-value</p>
            </div>
            <div className="rounded-xl bg-emerald-500/20 p-4 text-center backdrop-blur">
              <p className="text-3xl font-bold text-emerald-400">28,450:1</p>
              <p className="mt-1 text-xs text-emerald-300/80">Bayes Factor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {/* Test sections */}
          {testSections.map((section, idx) => (
            <section key={idx} className="mb-16">
              <div className="mb-6 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.tests.map((test, testIdx) => (
                  <TestCard key={testIdx} {...test} />
                ))}
              </div>
            </section>
          ))}

          {/* Summary section */}
          <section className="mt-20 rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-red-500/10 p-8 backdrop-blur">
            <h2 className="text-3xl font-bold text-white">{t.summary.title}</h2>
            
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400">{t.summary.irrefutable}</h3>
                <ul className="mt-4 space-y-2">
                  {t.summary.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400">—</span>
                      <span className="text-white/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-orange-400">{t.summary.impact}</h3>
                <ul className="mt-4 space-y-2">
                  {t.summary.impactDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">—</span>
                      <span className="text-white/80">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/20 p-6">
              <p className="text-lg font-medium text-white">
                {t.summary.conclusion}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
