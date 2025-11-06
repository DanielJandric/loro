'use client';

import { useLanguage } from '@/contexts/LanguageContext';

// Import all the data arrays from the original page
const tlDrHighlights = {
  fr: [
    "Le système ajuste ses probabilités en fonction du tirage précédent (mémoire).",
    "P(Win|Win) = 22.77% contre 32.69% attendu ⇒ chute de 30%.",
    "Trois tests statistiques indépendants produisent p < 0.01.",
    "Non-conformité potentielle à l'article 8 OJAr (aléatoire) et 35 LJAr (information).",
  ],
  en: [
    "The system adjusts its probabilities based on the previous draw (memory).",
    "P(Win|Win) = 22.77% vs 32.69% expected ⇒ 30% drop.",
    "Three independent statistical tests produce p < 0.01.",
    "Potential non-compliance with Article 8 OJAr (randomness) and 35 LJAr (information).",
  ]
};

export function ClientPage() {
  const { language, t } = useLanguage();
  
  const heroStats = [
    {
      value: "66.14%",
      label: t.kpis.rtpObserved,
      detail: t.kpis.rtpDetail,
    },
    {
      value: "0.95%",
      label: t.kpis.pValue,
      detail: t.kpis.pValueDetail,
    },
    {
      value: "-30.3%",
      label: t.kpis.winProbDrop,
      detail: t.kpis.winProbDropDetail,
    },
    {
      value: "99.7%",
      label: t.kpis.confidence,
      detail: t.kpis.confidenceDetail,
    },
  ];

  const comparisonRows = [
    {
      situation: language === 'fr' ? "Après un gain (Win)" : "After a win",
      expected: "32.69%",
      observed: "22.77%",
      delta: "-30.3%",
      tone: "negative",
    },
    {
      situation: language === 'fr' ? "Après une perte (Loss)" : "After a loss",
      expected: "32.69%",
      observed: "37.68%",
      delta: "+15.3%",
      tone: "positive",
    },
    {
      situation: language === 'fr' ? "Moyenne globale" : "Global average",
      expected: "32.69%",
      observed: "32.69%",
      delta: "0%",
      tone: "neutral",
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-red-950 via-red-900 to-slate-900 py-32 text-white animate-gradient">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:px-8">
          {/* Floating legal highlight card with hover shine - MOVED TO TOP */}
          <div className="group relative overflow-hidden rounded-3xl border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-500/20 to-red-500/20 p-8 text-white shadow-2xl ring-2 ring-inset ring-yellow-400/20 backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-yellow-400/20 hover:shadow-2xl">
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
            <p className="text-base font-semibold leading-relaxed text-white">
              {t.header.legalWarning}
            </p>
          </div>
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-yellow-300 shadow-lg glow-pulse">
              {t.header.independentAnalysis}
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-gradient-danger">{t.header.title}</span>
              <br />
              <span className="text-white">{t.header.subtitle}</span>
            </h1>
            <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/90">
              {t.header.description}
            </p>
          </div>
          <div className="grid gap-6 rounded-3xl glass p-8 shadow-2xl lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 card-hover rounded-2xl bg-white/5 p-4 backdrop-blur">
                <span className="text-4xl font-black tracking-tight lg:text-5xl">
                  {stat.value}
                </span>
                <p className="text-sm font-medium uppercase tracking-wide text-white/80">
                  {stat.label}
                </p>
                <p className="text-sm text-white/70">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main id="main" className="relative" role="main">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                {t.sections.essentials}
              </span>
            </h2>
            <div className="mt-4 text-white/90">
              <p>{t.sections.essentialsIntro}</p>
            </div>
            <p className="mt-8 rounded-3xl border-2 border-yellow-400/30 bg-gradient-to-br from-red-600/20 to-yellow-600/20 p-8 text-lg font-medium leading-relaxed text-white backdrop-blur-sm shadow-xl ring-2 ring-inset ring-yellow-400/10">
              <strong className="text-xl">{t.sections.conclusion}</strong> {t.sections.conclusionText}
            </p>
            <ul className="mt-10 grid gap-6 text-base leading-relaxed sm:grid-cols-2">
              {tlDrHighlights[language].map((item) => (
                <li key={item} className="card-hover rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-sm transition-all hover:bg-white/20">
                  <span className="font-medium text-white/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <div className="overflow-x-auto rounded-3xl border border-white/20 shadow-2xl">
                <table className="min-w-full bg-slate-900/50 text-left text-sm backdrop-blur-sm">
                  <thead className="bg-gradient-to-r from-red-900 to-red-800 text-white">
                    <tr>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {t.tables.situation}
                      </th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {t.tables.normalGame}
                      </th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {t.tables.observedLoro}
                      </th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {t.tables.deviation}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {comparisonRows.map((row) => (
                      <tr key={row.situation} className="text-sm text-white/80 transition-colors hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">{row.situation}</td>
                        <td className="px-6 py-4 font-semibold text-emerald-400">{row.expected}</td>
                        <td
                          className={`px-6 py-4 font-semibold ${
                            row.tone === "negative"
                              ? "text-red-400"
                              : row.tone === "positive"
                              ? "text-emerald-400"
                              : "text-white/60"
                          }`}
                        >
                          {row.observed}
                        </td>
                        <td
                          className={`px-6 py-4 font-semibold ${
                            row.tone === "negative"
                              ? "text-red-400"
                              : row.tone === "positive"
                              ? "text-emerald-400"
                              : "text-white/50"
                          }`}
                        >
                          {row.delta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        {/* Add more sections here following the same pattern */}
      </main>

      <footer className="bg-slate-900 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-white">
              {t.footer.title}
            </p>
            <p className="text-xs text-slate-400">{t.footer.lastUpdate}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#top" className="transition hover:text-white">
              {t.footer.backToTop}
            </a>
            <a href="mailto:contact@exemple.ch" className="transition hover:text-white">
              {t.footer.contact}
            </a>
            <a
              href="mailto:contact@exemple.ch?subject=Demande%20Dataset"
              className="transition hover:text-white"
            >
              {t.footer.requestDataset}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
