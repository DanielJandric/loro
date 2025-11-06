export const datasetDetails = [
  "Période : 17 janvier 2023 — 17 novembre 2024",
  "Nombre de tirages : 309 (n = 309)",
  "Jeux analysés : 18 variantes",
  "Méthode : scraping automatisé",
];

export const tests = [
  {
    title: "Test 1 · Wald-Wolfowitz (Runs Test)",
    summary:
      "Wins : 101, Losses : 208. Runs observés R = 157 vs μ = 136.97 (σ = 7.72) ⇒ z = 2.594, p = 0.0095.",
    conclusion:
      "Rejet de l'hypothèse d'indépendance (p < 0.01). Trop d'alternances, typiques d'un algorithme de balancement RTP.",
    block: `H₀ : séquence i.i.d.\nH₁ : structure non-aléatoire\n\n— Runs observés : 157\n— Runs attendus : 136.97\n— z-score : 2.594\n— p-value : 0.0095`,
  },
  {
    title: "Test 2 · χ² d'indépendance (chaîne de Markov)",
    summary:
      "Matrice observée : P(Win→Win) = 22.77%, P(Loss→Win) = 37.68%. χ² = 6.186 (ddl = 1), p = 0.0129.",
    conclusion:
      "Dépendance temporelle confirmée (p < 0.05). Le système « mémorise » le tirage précédent.",
    block: `Matrice de transition observée :\n    Win → Win : 22.77%\n    Win → Loss : 77.23%\n    Loss → Win : 37.68%\n    Loss → Loss : 62.32%\n\nχ² = 6.186, p = 0.0129`,
  },
  {
    title: "Test 3 · Bootstrap de permutation (10 000 runs)",
    summary:
      "Statistique |P(W|W) - P(W|L)| = 0.1491. Percentile 99 = 0.1455. p empirique = 0.0085.",
    conclusion:
      "Validation non-paramétrique : l'écart observé se situe au-delà du 99e percentile de la distribution nulle.",
    block: `— Statistique : 0.1491\n— Moyenne permutations : 0.0453\n— σ permutation : 0.0342\n— p empirique : 0.0085`,
  },
];

export const financialRows = [
  {
    metric: "Montant total misé",
    observed: "3 142 CHF",
    benchmark: "—",
    delta: "—",
    tone: "neutral",
  },
  {
    metric: "Montant total gagné",
    observed: "2 078 CHF",
    benchmark: "—",
    delta: "—",
    tone: "neutral",
  },
  {
    metric: "Perte nette",
    observed: "-1 064 CHF",
    benchmark: "—",
    delta: "—",
    tone: "negative",
  },
  {
    metric: "RTP global",
    observed: "66.14%",
    benchmark: "90-95%",
    delta: "-26.86 pts",
    tone: "negative",
  },
  {
    metric: "Win rate moyen",
    observed: "32.69%",
    benchmark: "~33%",
    delta: "Conforme",
    tone: "neutral",
  },
];

export const rtpByGame = [
  {
    game: "Bingo",
    n: 33,
    rtp: "81.06%",
    winRate: "45.45%",
    tone: "positive",
  },
  {
    game: "Cash",
    n: 18,
    rtp: "79.44%",
    winRate: "44.44%",
    tone: "positive",
  },
  {
    game: "Magic",
    n: 28,
    rtp: "73.93%",
    winRate: "42.86%",
    tone: "neutral",
  },
  {
    game: "Subito",
    n: 21,
    rtp: "71.43%",
    winRate: "23.81%",
    tone: "neutral",
  },
  {
    game: "Saphir",
    n: 15,
    rtp: "68.00%",
    winRate: "33.33%",
    tone: "neutral",
  },
  {
    game: "Crésus",
    n: 34,
    rtp: "65.00%",
    winRate: "29.41%",
    tone: "negative",
  },
  {
    game: "Banco",
    n: 23,
    rtp: "63.48%",
    winRate: "30.43%",
    tone: "negative",
  },
  {
    game: "Rêve",
    n: 11,
    rtp: "59.09%",
    winRate: "36.36%",
    tone: "negative",
  },
];

export const legalArticles = [
  {
    title: "Art. 8 OJAr - Aléatoire",
    excerpt:
      "Les jeux de grande envergure [...] doivent être conçus de manière à garantir une exploitation sûre et transparente.",
    finding:
      "Trois tests statistiques (p < 0.01) démontrent que le système n'est pas aléatoire. Violation potentielle.",
  },
  {
    title: "Art. 35 LJAr - Information",
    excerpt: "L'exploitant informe de manière appropriée sur les risques du jeu.",
    finding:
      "Aucune mention de l'algorithme de dépendance temporelle. RTP non publié. Information incomplète.",
  },
  {
    title: "Art. 15 OJAr - Transparence",
    excerpt:
      "Les règles du jeu, les chances de gain et de perte [...] doivent être facilement accessibles.",
    finding:
      "Le RTP de 66.14% n'est pas communiqué. Les vraies probabilités conditionnelles sont cachées.",
  },
  {
    title: "Art. 2 LJAr - Définition",
    excerpt:
      "Sont réputés jeux de hasard les jeux dont le gain dépend totalement ou essentiellement du hasard.",
    finding:
      "La dépendance au tirage précédent contredit la définition légale du « hasard ».",
  },
];

export const responseConcerns = [
  "Invocation abusive de la confidentialité : le RTP doit être public (art. 35 LJAr).",
  "Aucun certificat Gespa spécifique ni audit fourni.",
  "Absence de plan d'investigation proposé malgré les irrégularités.",
];

