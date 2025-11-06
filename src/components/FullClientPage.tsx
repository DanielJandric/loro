'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { fullTranslations } from '@/lib/fullTranslations';
import { 
  tlDrHighlights, 
  tests, 
  legalArticles, 
  responseConcerns,
  methodologyData,
  sequenceVisualization 
} from '@/lib/bilingualData';

export function FullClientPage() {
  const { language, t } = useLanguage();
  const trans = fullTranslations[language];
  
  const heroStats = [
    {
      value: "66.14%",
      label: trans.kpis.rtpObserved,
      detail: trans.kpis.rtpDetail,
    },
    {
      value: "0.95%",
      label: trans.kpis.pValue,
      detail: trans.kpis.pValueDetail,
    },
    {
      value: "-30.3%",
      label: trans.kpis.winProbDrop,
      detail: trans.kpis.winProbDropDetail,
    },
    {
      value: "99.7%",
      label: trans.kpis.confidence,
      detail: trans.kpis.confidenceDetail,
    },
  ];

  const comparisonRows = [
    {
      situation: trans.tables.afterWin,
      expected: "32.69%",
      observed: "22.77%",
      delta: "-30.3%",
      tone: "negative",
    },
    {
      situation: trans.tables.afterLoss,
      expected: "32.69%",
      observed: "37.68%",
      delta: "+15.3%",
      tone: "positive",
    },
    {
      situation: trans.tables.globalAverage,
      expected: "32.69%",
      observed: "32.69%",
      delta: "0%",
      tone: "neutral",
    },
  ];

  const datasetDetails = [
    trans.data.period,
    trans.data.drawCount,
    trans.data.gamesAnalyzed,
    trans.data.method,
  ];

  const financialRows = [
    {
      metric: trans.tables.totalBet,
      observed: "3 142 CHF",
      benchmark: "—",
      delta: "—",
      tone: "neutral",
    },
    {
      metric: trans.tables.totalWon,
      observed: "2 078 CHF",
      benchmark: "—",
      delta: "—",
      tone: "neutral",
    },
    {
      metric: trans.tables.netLoss,
      observed: "-1 064 CHF",
      benchmark: "—",
      delta: "—",
      tone: "negative",
    },
    {
      metric: trans.tables.globalRTP,
      observed: "66.14%",
      benchmark: "90-95%",
      delta: "-26.86 pts",
      tone: "negative",
    },
    {
      metric: trans.tables.averageWinRate,
      observed: "32.69%",
      benchmark: "~33%",
      delta: trans.tables.compliant,
      tone: "neutral",
    },
  ];

  const rtpByGame = [
    { 
      game: language === 'fr' ? "Le Trésor des pyramides" : "Pyramid Treasure", 
      n: 61, 
      bet: "427 CHF", 
      won: "392 CHF", 
      rtp: "91.80%", 
      winRate: "34.43%", 
      tone: "positive" 
    },
    { 
      game: language === 'fr' ? "Black Jack" : "Black Jack", 
      n: 18, 
      bet: "72 CHF", 
      won: "52 CHF", 
      rtp: "72.22%", 
      winRate: "50.00%", 
      tone: "neutral" 
    },
    { 
      game: language === 'fr' ? "Trésor des Pirates" : "Pirate Treasure", 
      n: 141, 
      bet: "2115 CHF", 
      won: "1405 CHF", 
      rtp: "66.43%", 
      winRate: "32.62%", 
      tone: "neutral" 
    },
    { 
      game: "Tribolo", 
      n: 44, 
      bet: "88 CHF", 
      won: "58 CHF", 
      rtp: "65.91%", 
      winRate: "31.82%", 
      tone: "negative" 
    },
    { 
      game: "Carton", 
      n: 7, 
      bet: "140 CHF", 
      won: "60 CHF", 
      rtp: "42.86%", 
      winRate: "42.86%", 
      tone: "negative" 
    },
    { 
      game: "e-Rento", 
      n: 28, 
      bet: "224 CHF", 
      won: "74 CHF", 
      rtp: "33.04%", 
      winRate: "21.43%", 
      tone: "negative" 
    },
    { 
      game: language === 'fr' ? "Autres" : "Others", 
      n: 10, 
      bet: "76 CHF", 
      won: "37 CHF", 
      rtp: "—", 
      winRate: "—", 
      tone: "neutral" 
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-red-950 via-red-900 to-slate-900 py-32 text-white animate-gradient">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:px-8">
          <div className="group relative overflow-hidden rounded-3xl border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-500/20 to-red-500/20 p-8 text-white shadow-2xl ring-2 ring-inset ring-yellow-400/20 backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-yellow-400/20 hover:shadow-2xl">
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
            <p className="text-base font-semibold leading-relaxed text-white">
              {trans.header.legalWarning}
            </p>
          </div>
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-yellow-300 shadow-lg glow-pulse">
              {trans.header.independentAnalysis}
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-gradient-danger">{trans.header.title}</span>
              <br />
              <span className="text-white">{trans.header.subtitle}</span>
            </h1>
            <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/90">
              {trans.header.description}
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
        {/* Section 1: Essentials */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                {trans.sections.essentials}
              </span>
            </h2>
            <div className="mt-4 text-white/90">
              <p>{trans.sections.essentialsIntro}</p>
            </div>
            <p className="mt-8 rounded-3xl border-2 border-yellow-400/30 bg-gradient-to-br from-red-600/20 to-yellow-600/20 p-8 text-lg font-medium leading-relaxed text-white backdrop-blur-sm shadow-xl ring-2 ring-inset ring-yellow-400/10">
              <strong className="text-xl">{trans.sections.conclusion}</strong> {trans.sections.conclusionText}
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
                        {trans.tables.situation}
                      </th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {trans.tables.normalGame}
                      </th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {trans.tables.observedLoro}
                      </th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-white/80">
                        {trans.tables.deviation}
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

        {/* Section 2: Understanding */}
        <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {trans.sections.understanding}
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-white/90">
                  {trans.sections.understandingText}
                </p>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-sm">
                  <p className="font-semibold text-white">
                    {trans.sections.visualizationTitle}
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    <span className="font-semibold text-emerald-400">W</span> = {language === 'fr' ? 'gain' : 'win'} &nbsp;|&nbsp;
                    <span className="font-semibold text-red-400">L</span> = {language === 'fr' ? 'perte' : 'loss'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1 font-mono text-xs">
                    {sequenceVisualization.split('').map((value, index) => (
                      <span
                        key={`${value}-${index}`}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold ${
                          value === "W"
                            ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-inset ring-emerald-400/40"
                            : "bg-red-500/20 text-red-400 ring-1 ring-inset ring-red-400/40"
                        }`}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/80">
                    {trans.sections.visualizationNote}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                    {trans.sections.conditionalProbabilities}
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    <p>
                      <span className="font-semibold text-white">P(Win | Win)</span> = 22.77%
                    </p>
                    <p>
                      <span className="font-semibold text-white">P(Win | Loss)</span> = 37.68%
                    </p>
                    <p>
                      <span className="font-semibold text-white">{language === 'fr' ? 'Écart absolu' : 'Absolute gap'}</span> = 14.91 {language === 'fr' ? 'points' : 'points'}
                    </p>
                  </div>
                  <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/20 p-4 text-sm text-white backdrop-blur-sm">
                    {trans.sections.conditionalNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Scientific Evidence */}
        <section className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="space-y-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {trans.sections.protocols}
                    </span>
                  </h2>
                  <p className="text-base leading-relaxed text-white/90">
                    {trans.sections.protocolsText}
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-6 text-sm text-white/80 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {trans.sections.syntheticDataset}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {datasetDetails.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {tests[language].map((test) => (
                  <article
                    key={test.title}
                    className="flex h-full flex-col gap-5 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {test.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/80">{test.summary}</p>
                    </div>
                    <pre className="flex-1 rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100 shadow-inner">
{test.block}
                    </pre>
                    <p className="rounded-xl border border-red-400/30 bg-red-500/20 p-4 text-sm text-white backdrop-blur-sm">
                      {test.conclusion}
                    </p>
                  </article>
                ))}
              </div>

              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white">{trans.sections.entropyTitle}</h3>
                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-2 text-sm text-white/80">
                    <p>
                      <span className="font-semibold text-white">{trans.data.binaryEntropy}</span> = 0.9117 {trans.data.bits} ({trans.data.max} 1.0)
                    </p>
                    <p>
                      <span className="font-semibold text-white">{trans.data.entropyRatio}</span> = 91.17%
                    </p>
                    <p>
                      <span className="font-semibold text-white">{trans.data.conditionalEntropy}</span> = 1.809 {trans.data.bits} ({trans.data.max} 2.0)
                    </p>
                    <p>
                      <span className="font-semibold text-white">{trans.data.conditionalRatio}</span> = 90.45%
                    </p>
                  </div>
                  <p className="rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-sm">
                    {trans.sections.entropyNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Financial Impact */}
        <section className="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {trans.sections.financial}
              </span>
            </h2>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/20">
              <table className="min-w-full bg-slate-900/50 text-left text-sm backdrop-blur-sm">
                <thead className="bg-gradient-to-r from-orange-900 to-red-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.metric}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.observed}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.standard}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.deviation}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {financialRows.map((row) => (
                    <tr key={row.metric} className="text-sm text-white/80 transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white">{row.metric}</td>
                      <td className="px-6 py-4 font-semibold text-white">{row.observed}</td>
                      <td className="px-6 py-4 text-white/60">{row.benchmark}</td>
                      <td
                        className={`px-6 py-4 font-semibold ${
                          row.tone === "negative"
                            ? "text-red-400"
                            : row.tone === "positive"
                            ? "text-emerald-400"
                            : "text-white/60"
                        }`}
                      >
                        {row.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-12 text-xl font-semibold text-white">{trans.sections.rtpByGame}</h3>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/20">
              <table className="min-w-full bg-slate-900/50 text-left text-sm backdrop-blur-sm">
                <thead className="bg-gradient-to-r from-pink-900 to-purple-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.game}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {language === 'fr' ? 'Billets' : 'Tickets'}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {language === 'fr' ? 'Enjeu' : 'Stake'}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {language === 'fr' ? 'Gains' : 'Winnings'}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.rtp}
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {trans.tables.winRate}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rtpByGame.map((row) => (
                    <tr key={row.game} className="text-sm text-white/80 transition-colors hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white">{row.game}</td>
                      <td className="px-6 py-4 text-center">{row.n}</td>
                      <td className="px-6 py-4 text-right">{row.bet}</td>
                      <td className="px-6 py-4 text-right">{row.won}</td>
                      <td
                        className={`px-6 py-4 text-center font-semibold ${
                          row.tone === "negative"
                            ? "text-red-400"
                            : row.tone === "positive"
                            ? "text-emerald-400"
                            : "text-white/60"
                        }`}
                      >
                        {row.rtp}
                      </td>
                      <td className="px-6 py-4 text-center">{row.winRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-500/20 p-6 text-sm text-white backdrop-blur-sm">
              <strong>{language === 'fr' ? 'Projection collective :' : 'Collective projection:'}</strong> {trans.sections.collectiveProjection}
            </div>
          </div>
        </section>

        {/* Section 5: Legal Framework */}
        <section className="bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {trans.sections.legalFramework}
              </span>
            </h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {legalArticles[language].map((article) => (
                <article
                  key={article.title}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm italic text-white/70">"{article.excerpt}"</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">{article.finding}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 space-y-5 rounded-2xl border border-red-400/30 bg-red-500/20 p-6 text-sm text-white backdrop-blur-sm">
              <p>
                <strong>{trans.sections.loroResponse}</strong> {trans.sections.loroResponseText}
              </p>
              <ul className="space-y-3 text-white/80">
                {responseConcerns[language].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-red-500">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Methodology */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {trans.sections.methodology}
                </h2>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                    {trans.sections.toolsUsed}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {methodologyData[language].tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                    {trans.sections.limitations}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {methodologyData[language].limitations.map((limit) => (
                      <li key={limit}>{limit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                    {trans.sections.nextSteps}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {methodologyData[language].nextSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 backdrop-blur">
                  <p className="font-semibold text-white">{trans.sections.recommendedActions}</p>
                  <ul className="mt-3 space-y-2">
                    {methodologyData[language].actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Contact */}
        <section id="contact" className="bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-900 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {trans.sections.contact}
                </h2>
                <p className="text-base leading-relaxed text-white/90">
                  {trans.sections.contactText}
                </p>
                <div className="space-y-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 backdrop-blur-sm">
                  <p>
                    <span className="font-semibold text-white">{trans.footer.email}</span>{" "}
                    <a
                      href="mailto:contact@exemple.ch"
                      className="text-white underline decoration-white/30 underline-offset-4 transition hover:text-white/70"
                    >
                      contact@exemple.ch
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-white">{trans.footer.dataset}</span> {trans.footer.csvAnonymized}
                  </p>
                  <p>
                    <span className="font-semibold text-white">{trans.footer.pgp}</span> {trans.footer.pgpKey}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-amber-400/30 bg-amber-500/20 p-8 text-sm text-white backdrop-blur-sm">
                <h3 className="text-base font-semibold text-white">{trans.sections.legalNote}</h3>
                <p className="mt-3 leading-relaxed">
                  {trans.sections.legalNoteText}
                </p>
                <p className="mt-4 text-sm text-white/80">
                  {trans.sections.usefulContacts}
                  <br />
                  <a className="underline" href="https://www.gespa.ch" target="_blank" rel="noreferrer">
                    Gespa
                  </a>
                  &nbsp;|&nbsp;
                  <a className="underline" href="https://www.comlot.ch" target="_blank" rel="noreferrer">
                    COMLOT
                  </a>
                  &nbsp;|&nbsp;
                  <a className="underline" href="https://www.frc.ch" target="_blank" rel="noreferrer">
                    FRC
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-white">
              {trans.footer.title}
            </p>
            <p className="text-xs text-slate-400">{trans.footer.lastUpdate}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#top" className="transition hover:text-white">
              {trans.footer.backToTop}
            </a>
            <a href="mailto:contact@exemple.ch" className="transition hover:text-white">
              {trans.footer.contact}
            </a>
            <a
              href="mailto:contact@exemple.ch?subject=Demande%20Dataset"
              className="transition hover:text-white"
            >
              {trans.footer.requestDataset}
            </a>
          </div>
          <p className="text-xs text-slate-500">
            {trans.legalDisclaimer.title}: {trans.legalDisclaimer.text}
          </p>
        </div>
      </footer>
    </div>
  );
}
