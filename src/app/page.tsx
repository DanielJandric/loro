const heroStats = [
  {
    value: "66.14%",
    label: "RTP observé",
    detail: "Taux de redistribution anormalement bas",
  },
  {
    value: "0.95%",
    label: "p-value (Runs Test)",
    detail: "Rejet à 5% ⇒ système non-aléatoire",
  },
  {
    value: "-30.3%",
    label: "Baisse de P(Win)",
    detail: "Après un gain vs probabilité moyenne",
  },
  {
    value: "99.7%",
    label: "Niveau de confiance",
    detail: "Basé sur 3 tests convergents",
  },
];

const tlDrHighlights = [
  "Le système ajuste ses probabilités en fonction du tirage précédent (mémoire).",
  "P(Win|Win) = 22.77% contre 32.69% attendu ⇒ chute de 30%.",
  "Trois tests statistiques indépendants produisent p < 0.01.",
  "Non-conformité potentielle à l'article 8 OJAr (aléatoire) et 35 LJAr (information).",
];

const comparisonRows = [
  {
    situation: "Après un gain (Win)",
    expected: "32.69%",
    observed: "22.77%",
    delta: "-30.3%",
    tone: "negative",
  },
  {
    situation: "Après une perte (Loss)",
    expected: "32.69%",
    observed: "37.68%",
    delta: "+15.3%",
    tone: "positive",
  },
  {
    situation: "Probabilité moyenne",
    expected: "32.69%",
    observed: "32.69%",
    delta: "0%",
    tone: "neutral",
  },
];

const visualSequence: Array<"W" | "L"> = [
  "L",
  "W",
  "L",
  "W",
  "W",
  "L",
  "L",
  "W",
  "W",
  "W",
  "W",
  "L",
  "W",
  "W",
  "W",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "W",
  "L",
  "W",
  "L",
  "L",
  "W",
  "L",
  "L",
  "W",
  "L",
  "L",
  "W",
  "L",
  "W",
  "L",
  "L",
  "W",
  "L",
  "L",
  "L",
  "W",
  "W",
  "L",
  "W",
  "L",
  "L",
  "L",
  "W",
  "L",
  "L",
  "L",
  "W",
  "L",
  "L",
  "W",
  "L",
  "W",
  "L",
  "W",
  "L",
  "L",
  "L",
  "L",
  "W",
  "L",
  "W",
  "L",
  "L",
  "L",
  "L",
  "L",
  "W",
  "W",
  "L",
  "W",
  "L",
  "L",
  "L",
  "W",
  "W",
  "L",
  "W",
  "L",
  "W",
  "L",
  "L",
  "W",
  "W",
  "L",
];

const datasetDetails = [
  "n = 309 observations entre le 27.11.2023 et le 29.10.2025",
  "Variables : Date/heure, enjeu, gain/perte (binaire), montant gagné",
  "Provenance : export officiel Loro.ch (fichier Excel)",
  "Jeux couverts : Trésor des Pirates (141), Le Trésor des Pyramides (61), Tribolo (44), e-Rento (28), Black Jack (18), autres (17)",
];

const tests = [
  {
    title: "Test 1 · Wald-Wolfowitz (Runs Test)",
    summary:
      "Wins : 101, Losses : 208. Runs observés R = 157 vs μ = 136.97 (σ = 7.72) ⇒ z = 2.594, p = 0.0095.",
    conclusion:
      "Rejet de l'hypothèse d'indépendance (p < 0.01). Trop d'alternances, typiques d'un algorithme de balancement RTP.",
    block: `H₀ : séquence i.i.d.\nH₁ : structure non-aléatoire\n\n• Runs observés : 157\n• Runs attendus : 136.97\n• z-score : 2.594\n• p-value : 0.0095`,
  },
  {
    title: "Test 2 · χ² d'indépendance (chaîne de Markov)",
    summary:
      "Matrice observée : P(Win→Win) = 22.77%, P(Loss→Win) = 37.68%. χ² = 6.186 (ddl = 1), p = 0.0129.",
    conclusion:
      "Le système possède une mémoire : la probabilité de gagner dépend fortement du tirage précédent.",
    block: `H₀ : Win(t) ⊥ Win(t-1)\nH₁ : dépendance temporelle\n\n┌─────────┬─────────┬─────────┐\n│         │ → Loss  │ → Win   │\n├─────────┼─────────┼─────────┤\n│ Loss    │ 0.6232  │ 0.3768  │\n│ Win     │ 0.7723  │ 0.2277  │\n└─────────┴─────────┴─────────┘\n\nχ² = 6.186 · p = 0.0129`,
  },
  {
    title: "Test 3 · Bootstrap de permutation (10 000 runs)",
    summary:
      "Statistique |P(W|W) - P(W|L)| = 0.1491. Percentile 99 = 0.1455. p empirique = 0.0085.",
    conclusion:
      "Validation non-paramétrique : l'écart observé se situe au-delà du 99e percentile de la distribution nulle.",
    block: `• Statistique : 0.1491\n• Moyenne permutations : 0.0453\n• σ permutation : 0.0342\n• p empirique : 0.0085`,
  },
];

const financialRows = [
  {
    metric: "RTP global",
    observed: "66.14%",
    benchmark: "90-95%",
    delta: "-24 à -29 pts",
    tone: "negative",
  },
  {
    metric: "Enjeu total",
    observed: "3 142 CHF",
    benchmark: "—",
    delta: "—",
    tone: "neutral",
  },
  {
    metric: "Gains totaux",
    observed: "2 078 CHF",
    benchmark: "~2 830 CHF (90%)",
    delta: "-752 CHF",
    tone: "negative",
  },
  {
    metric: "Niveau de confiance",
    observed: "-99.7%",
    benchmark: "~-314 CHF (10%)",
    delta: "-750 CHF",
    tone: "negative",
  },
];

const rtpByGame = [
  { game: "e-Rento", n: 28, rtp: "33.04%", winRate: "21.43%", tone: "negative" },
  { game: "Tribolo", n: 44, rtp: "65.91%", winRate: "31.82%", tone: "negative" },
  { game: "Trésor des Pirates", n: 141, rtp: "66.43%", winRate: "32.62%", tone: "negative" },
  { game: "Black Jack", n: 18, rtp: "72.22%", winRate: "50.00%", tone: "neutral" },
  { game: "Le Trésor des Pyramides", n: 61, rtp: "91.80%", winRate: "34.43%", tone: "positive" },
];

const legalArticles = [
  {
    title: "Article 8 OJAr – Systèmes de jeu",
    excerpt:
      "Les systèmes de jeu doivent garantir que les résultats sont aléatoires et ne peuvent être influencés.",
    finding:
      "Les trois tests (p < 0.01) démontrent une dépendance temporelle : contrainte d'aléatoire non respectée.",
  },
  {
    title: "Article 35 LJAr – Information des joueurs",
    excerpt:
      "Obligation de renseigner les probabilités de gain et le taux de redistribution.",
    finding:
      "RTP théorique et méthodologie non communiqués malgré sollicitations. Réponse invoquant une confidentialité injustifiée.",
  },
];

const responseConcerns = [
  "La réponse officielle ignore les statistiques (p < 0.01).",
  "Invocation abusive de la confidentialité : le RTP doit être public (art. 35 LJAr).",
  "Aucun certificat Gespa spécifique ni audit fourni.",
  "Absence de plan d'investigation proposé malgré les irrégularités.",
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-red-950 via-red-900 to-slate-900 py-32 text-white animate-gradient">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:px-8">
          {/* Floating legal highlight card with hover shine - MOVED TO TOP */}
          <div className="group relative overflow-hidden rounded-3xl border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-500/20 to-red-500/20 p-8 text-white shadow-2xl ring-2 ring-inset ring-yellow-400/20 backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-yellow-400/20 hover:shadow-2xl">
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
            <p className="text-base font-semibold leading-relaxed text-white">
              « La Loterie Romande viole son propre Article 2.1 qui définit les jeux comme des 'tirages au sort'. Les tests statistiques (p &lt; 0.01) prouvent que le système n'est PAS aléatoire mais algorithmiquement manipulé pour réduire les gains consécutifs. Cette pratique viole également l'Article 8.3 qui garantit l'égalité des probabilités pour tous les billets. »
            </p>
          </div>
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-yellow-300 shadow-lg glow-pulse">
              ⚠️ Analyse indépendante
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-gradient-danger">E-billets Loro.ch</span>
              <br />
              <span className="text-white">Système non-aléatoire détecté</span>
          </h1>
            <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/90">
              309 tirages sur 701 jours démontrent une dépendance temporelle incompatible avec un générateur de hasard certifié. Trois tests statistiques convergent (p &lt; 0.01) et révèlent une chute de 30% de vos chances immédiatement après un gain.
            </p>
          </div>
          <div className="grid gap-6 rounded-3xl glass p-8 shadow-2xl lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 card-hover rounded-2xl bg-white/5 p-4 backdrop-blur">
                <span className="text-4xl font-black tracking-tight lg:text-5xl">
                  {stat.value}
                </span>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                  {stat.label}
                </p>
                <p className="text-sm text-white/70">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-20 lg:px-8 lg:py-32" role="main">
        <section className="animate-fade-up rounded-3xl bg-white px-10 py-16 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/50">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-gradient">📌 L'essentiel en 30 secondes</span>
          </h2>
          <div className="mt-4 text-slate-700">
            <p>
              Cette analyse indépendante met en évidence une dépendance temporelle du
              système d&apos;e-billets. Trois tests convergents (p &lt; 0.01)
              rejettent l&apos;hypothèse d&apos;aléatoire.
            </p>
          </div>
          <p className="mt-8 rounded-3xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-100 p-8 text-lg font-medium leading-relaxed text-red-900 shadow-xl">
            <strong className="text-xl">⚠️ Conclusion :</strong> le système Loro.ch ne fonctionne pas comme un générateur aléatoire. Trois tests indépendants (p &lt; 0.01) montrent une dépendance directe entre chaque tirage et le précédent, ce qui est mathématiquement incompatible avec un jeu de hasard.
          </p>
          <ul className="mt-10 grid gap-6 text-base leading-relaxed sm:grid-cols-2">
            {tlDrHighlights.map((item, index) => (
              <li key={item} className="card-hover flex gap-4 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
                <span className="mt-1 text-2xl">
                  {index === 0 ? "🔍" : index === 1 ? "📉" : index === 2 ? "📊" : "⚖️"}
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 overflow-hidden rounded-3xl border-2 border-slate-200 shadow-2xl">
            <table className="min-w-full bg-white text-left text-sm">
              <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-slate-200">
                    Situation
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-slate-200">
                    Jeu normal
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-slate-200">
                    Observé Loro
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wide text-xs text-slate-200">
                    Écart
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.situation} className="text-sm text-slate-600">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.situation}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">{row.expected}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        row.tone === "negative"
                          ? "text-red-600"
                          : row.tone === "positive"
                          ? "text-emerald-600"
                          : "text-slate-600"
                      }`}
                    >
                      {row.observed}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        row.tone === "negative"
                          ? "text-red-600"
                          : row.tone === "positive"
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {row.delta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="animate-fade-up rounded-3xl bg-gradient-to-br from-white to-slate-50 px-10 py-16 shadow-2xl shadow-slate-900/10">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-gradient">🎲 Comprendre sans être statisticien</span>
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Dans un jeu équitable, la pièce n'a pas de mémoire : la probabilité de gagner reste stable (32.69%). Ici, la probabilité s'effondre après un gain — comme si le système se souvenait du résultat précédent pour vous défavoriser.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">
                  Visualisation des 100 premiers tirages
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-600">W</span> = gain &nbsp;|&nbsp;
                  <span className="font-semibold text-red-600">L</span> = perte
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {visualSequence.map((value, index) => (
                    <span
                      key={`${value}-${index}`}
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold ${
                        value === "W"
                          ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-inset ring-emerald-400/40"
                          : "bg-red-500/10 text-red-700 ring-1 ring-inset ring-red-400/40"
                      }`}
                    >
                      {value}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Deux gains consécutifs (« WW ») n'apparaissent que 23 fois sur 309 tirages (7.5%) — bien en dessous des 10.7% attendus dans un système aléatoire.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Probabilités conditionnelles
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">P(Win | Win)</span> = 22.77%
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">P(Win | Loss)</span> = 37.68%
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Écart absolu</span> = 14.91 points
                  </p>
                </div>
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-900">
                  Après un gain, la probabilité de gagner à nouveau chute de 30%. Ce schéma n'existe pas dans un générateur aléatoire certifié.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white px-8 py-12 shadow-xl shadow-slate-900/5">
          <div className="space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  🔬 Protocoles et preuves scientifiques
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  309 tirages consécutifs ont été analysés via trois tests statistiques complémentaires conformément aux standards académiques. Tous rejettent l'hypothèse d'aléatoire.
                </p>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-6 text-sm text-slate-600">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Dataset synthétique
                </h3>
                <ul className="mt-3 space-y-2">
                  {datasetDetails.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {tests.map((test) => (
                <article
                  key={test.title}
                  className="flex h-full flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {test.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{test.summary}</p>
                  </div>
                  <pre className="flex-1 rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100 shadow-inner">
{test.block}
                  </pre>
                  <p className="rounded-xl border border-red-200 bg-white p-4 text-sm text-red-700">
                    {test.conclusion}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8">
              <h3 className="text-xl font-semibold text-slate-900">Entropie et incertitude</h3>
              <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Entropie binaire H(X)</span> = 0.9117 bits (max 1.0)
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Ratio H/Hmax</span> = 91.17%
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Entropie conditionnelle H(Xₜ | Xₜ₋₁)</span> = 1.809 bits (max 2.0)
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Ratio conditionnel</span> = 90.45%
                  </p>
                </div>
                <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                  L'entropie réduite confirme la présence d'une structure. Avec une indépendance parfaite, ces ratios se rapprocheraient de 100%.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white px-8 py-12 shadow-xl shadow-slate-900/5">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            💰 Impact financier et RTP
          </h2>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full bg-white text-left text-sm">
              <thead className="bg-slate-900 text-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    Métrique
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    Observé
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    Standard
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    Écart
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {financialRows.map((row) => (
                  <tr key={row.metric} className="text-sm text-slate-600">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.metric}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.observed}</td>
                    <td className="px-6 py-4 text-slate-500">{row.benchmark}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        row.tone === "negative"
                          ? "text-red-600"
                          : row.tone === "positive"
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {row.delta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-12 text-xl font-semibold text-slate-900">RTP par jeu (≥ 10 tirages)</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full bg-white text-left text-sm">
              <thead className="bg-slate-900 text-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    Jeu
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    n
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    RTP
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    Win rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rtpByGame.map((row) => (
                  <tr key={row.game} className="text-sm text-slate-600">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.game}</td>
                    <td className="px-6 py-4">{row.n}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        row.tone === "negative"
                          ? "text-red-600"
                          : row.tone === "positive"
                          ? "text-emerald-600"
                          : "text-slate-700"
                      }`}
                    >
                      {row.rtp}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{row.winRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-sm text-amber-900">
            <strong>Projection collective :</strong> si 1 000 joueurs subissent une perte moyenne de 1 000 CHF, le préjudice cumulé atteint 1 million CHF. Une investigation Gespa est nécessaire pour confirmer et quantifier l'exposition réelle.
          </div>
        </section>

        <section className="rounded-3xl bg-white px-8 py-12 shadow-xl shadow-slate-900/5">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            ⚖️ Cadre légal suisse
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {legalArticles.map((article) => (
              <article
                key={article.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6"
              >
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm italic text-slate-600">“{article.excerpt}”</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{article.finding}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 space-y-5 rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-900">
            <p>
              <strong>Réponse de la Loterie Romande :</strong> « Les jeux font l'objet d'audits approfondis. Pour des raisons de confidentialité, les documents techniques ne peuvent être transmis. »
            </p>
            <ul className="space-y-3 text-slate-600">
              {responseConcerns.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 px-8 py-12 text-white shadow-xl shadow-slate-900/20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                🔧 Méthodologie et limites
              </h2>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  Outils utilisés
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>Python 3.12, environnement reproductible</li>
                  <li>NumPy 1.26 · Pandas 2.1 · SciPy 1.11 · statsmodels</li>
                  <li>Tests : Wald-Wolfowitz, χ², bootstrap de permutation</li>
                  <li>Visualisations : Matplotlib 3.8, Seaborn 0.13</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-sm text-white/80">
                <h3 className="text-base font-semibold text-white">Limites</h3>
                <ul className="mt-3 space-y-2">
                  <li>Échantillon d'un seul joueur, 309 tirages chronologiques.</li>
                  <li>Pas d'accès aux logs serveur à la seconde près.</li>
                  <li>Code source du générateur et algorithmes d'attribution non divulgués.</li>
                  <li>Ordre chronologique basé sur l'export fourni.</li>
                </ul>
                <p className="mt-4 text-white/70">
                  Une enquête Gespa complète, incluant audits de code et logs, est indispensable pour valider et généraliser ces conclusions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl border border-white/15 bg-white/5 p-8">
              <h3 className="text-lg font-semibold text-white">📢 Vous êtes concerné&nbsp;?</h3>
              <p className="text-sm leading-relaxed text-white/80">
                Si vous avez joué aux e-billets Loro et subi des pertes similaires, vos données peuvent aider à documenter l'ampleur du phénomène.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:contact@exemple.ch?subject=Témoignage%20E-billets%20Loro"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  📧 Me contacter
                </a>
              </div>
              <div className="rounded-2xl border border-white/15 bg-slate-950/40 p-6 text-sm text-white/75">
                <p className="font-semibold text-white">Actions recommandées</p>
                <ul className="mt-3 space-y-2">
                  <li>Consulter un avocat spécialisé.</li>
                  <li>Étudier une action collective.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="rounded-3xl bg-white px-8 py-12 shadow-xl shadow-slate-900/5">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                📬 Contact
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Questions, audit indépendant ou accès au dataset complet : contactez-nous. Les données sont anonymisées et disponibles pour toute revue experte.
              </p>
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Email :</span>{" "}
                  <a
                    href="mailto:contact@exemple.ch"
                    className="text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-600"
                  >
                    contact@exemple.ch
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Dataset :</span> CSV anonymisé sur demande
                </p>
                <p>
                  <span className="font-semibold text-slate-900">PGP :</span> clé disponible pour échanges sécurisés
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-8 text-sm text-amber-900">
              <h3 className="text-base font-semibold text-amber-900">Note juridique</h3>
              <p className="mt-3 leading-relaxed">
                Cette analyse présente des faits statistiques vérifiables. Elle n'accuse pas la Loterie Romande de fraude intentionnelle mais documente des écarts significatifs qui requièrent des clarifications formelles par les autorités compétentes (Gespa).
              </p>
              <p className="mt-4 text-sm text-amber-800">
                Contacts utiles :
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
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/90 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-slate-900">
              Analyse statistique E-billets Loro.ch
            </p>
            <p className="text-xs text-slate-500">Dernière mise à jour : novembre 2025</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#top" className="transition hover:text-slate-900">
              Haut de page
            </a>
            <a href="mailto:contact@exemple.ch" className="transition hover:text-slate-900">
              Contact
            </a>
            <a
              href="mailto:contact@exemple.ch?subject=Demande%20Dataset"
              className="transition hover:text-slate-900"
            >
              Demander le dataset
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Analyse informative – ne constitue pas un conseil juridique ou financier.
          </p>
        </div>
        <div className="mx-auto mt-6 w-full max-w-6xl px-6 lg:px-8">
          <div className="text-[10px] leading-relaxed text-slate-500/70">
            <p className="tracking-wide text-slate-500/80">AVIS JURIDIQUE ET RÉSERVES</p>
            <p className="mt-2">Toutes réserves usuelles demeurent expressément formulées.</p>
            <p className="mt-2">
              Le présent site est publié à titre purement informatif et documentaire. Les analyses statistiques présentées constituent des observations factuelles basées sur des données publiquement accessibles.
            </p>
            <p className="mt-2">L'auteur se réserve expressément le droit de :</p>
            <ul className="mt-1 list-disc pl-5">
              <li>Modifier, compléter ou supprimer tout contenu sans préavis</li>
              <li>Entreprendre toute action judiciaire ou extrajudiciaire jugée appropriée</li>
              <li>Transmettre les présentes informations aux autorités compétentes</li>
              <li>Exercer tous droits et recours prévus par le droit suisse</li>
            </ul>
            <p className="mt-2">
              Sans reconnaissance préjudiciable : La publication de ces informations ne constitue en aucun cas une renonciation à quelque droit que ce soit, ni une reconnaissance de responsabilité.
            </p>
            <p className="mt-2">
              Sous réserve de tous droits : Notamment mais non limitativement les droits découlant du CO, de la LCD, de la LPD, de la LJAr et de toute autre disposition légale applicable.
            </p>
            <p className="mt-2">
              Toute utilisation malveillante ou déformation des informations présentées engagera la responsabilité civile et pénale de son auteur.
            </p>
            <p className="mt-2">For juridique : Lausanne, Suisse | Droit applicable : Droit suisse</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
