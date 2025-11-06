export const tlDrHighlights = {
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

export const tests = {
  fr: [
    {
      title: "Test 1 · Wald-Wolfowitz (Runs Test)",
      summary: "Wins : 101, Losses : 208. Runs observés R = 157 vs μ = 136.97 (σ = 7.72) ⇒ z = 2.594, p = 0.0095.",
      conclusion: "Rejet de l'hypothèse d'indépendance (p < 0.01). Trop d'alternances, typiques d'un algorithme de balancement RTP.",
      block: `H₀ : séquence i.i.d.\nH₁ : structure non-aléatoire\n\n— Runs observés : 157\n— Runs attendus : 136.97\n— z-score : 2.594\n— p-value : 0.0095`,
    },
    {
      title: "Test 2 · χ² d'indépendance (chaîne de Markov)",
      summary: "Matrice observée : P(Win→Win) = 22.77%, P(Loss→Win) = 37.68%. χ² = 6.186 (ddl = 1), p = 0.0129.",
      conclusion: "Dépendance temporelle confirmée (p < 0.05). Le système « mémorise » le tirage précédent.",
      block: `Matrice de transition observée :\n    Win → Win : 22.77%\n    Win → Loss : 77.23%\n    Loss → Win : 37.68%\n    Loss → Loss : 62.32%\n\nχ² = 6.186, p = 0.0129`,
    },
    {
      title: "Test 3 · Bootstrap de permutation (10 000 runs)",
      summary: "Statistique |P(W|W) - P(W|L)| = 0.1491. Percentile 99 = 0.1455. p empirique = 0.0085.",
      conclusion: "Validation non-paramétrique : l'écart observé se situe au-delà du 99e percentile de la distribution nulle.",
      block: `— Statistique : 0.1491\n— Moyenne permutations : 0.0453\n— σ permutation : 0.0342\n— p empirique : 0.0085`,
    },
  ],
  en: [
    {
      title: "Test 1 · Wald-Wolfowitz (Runs Test)",
      summary: "Wins: 101, Losses: 208. Observed runs R = 157 vs μ = 136.97 (σ = 7.72) ⇒ z = 2.594, p = 0.0095.",
      conclusion: "Rejection of independence hypothesis (p < 0.01). Too many alternations, typical of an RTP balancing algorithm.",
      block: `H₀: i.i.d. sequence\nH₁: non-random structure\n\n— Observed runs: 157\n— Expected runs: 136.97\n— z-score: 2.594\n— p-value: 0.0095`,
    },
    {
      title: "Test 2 · χ² Independence Test (Markov Chain)",
      summary: "Observed matrix: P(Win→Win) = 22.77%, P(Loss→Win) = 37.68%. χ² = 6.186 (df = 1), p = 0.0129.",
      conclusion: "Temporal dependency confirmed (p < 0.05). The system \"remembers\" the previous draw.",
      block: `Observed transition matrix:\n    Win → Win: 22.77%\n    Win → Loss: 77.23%\n    Loss → Win: 37.68%\n    Loss → Loss: 62.32%\n\nχ² = 6.186, p = 0.0129`,
    },
    {
      title: "Test 3 · Permutation Bootstrap (10,000 runs)",
      summary: "Statistic |P(W|W) - P(W|L)| = 0.1491. 99th percentile = 0.1455. Empirical p = 0.0085.",
      conclusion: "Non-parametric validation: the observed gap is beyond the 99th percentile of the null distribution.",
      block: `— Statistic: 0.1491\n— Permutation mean: 0.0453\n— σ permutation: 0.0342\n— Empirical p: 0.0085`,
    },
  ]
};

export const legalArticles = {
  fr: [
    {
      title: "Art. 8 OJAr - Aléatoire",
      excerpt: "Les jeux de grande envergure [...] doivent être conçus de manière à garantir une exploitation sûre et transparente.",
      finding: "Trois tests statistiques (p < 0.01) démontrent que le système n'est pas aléatoire. Violation potentielle.",
    },
    {
      title: "Art. 35 LJAr - Information",
      excerpt: "L'exploitant informe de manière appropriée sur les risques du jeu.",
      finding: "Aucune mention de l'algorithme de dépendance temporelle. RTP non publié. Information incomplète.",
    },
    {
      title: "Art. 15 OJAr - Transparence",
      excerpt: "Les règles du jeu, les chances de gain et de perte [...] doivent être facilement accessibles.",
      finding: "Le RTP de 66.14% n'est pas communiqué. Les vraies probabilités conditionnelles sont cachées.",
    },
    {
      title: "Art. 2 LJAr - Définition",
      excerpt: "Sont réputés jeux de hasard les jeux dont le gain dépend totalement ou essentiellement du hasard.",
      finding: "La dépendance au tirage précédent contredit la définition légale du « hasard ».",
    },
  ],
  en: [
    {
      title: "Art. 8 OJAr - Randomness",
      excerpt: "Large-scale games [...] must be designed to ensure safe and transparent operation.",
      finding: "Three statistical tests (p < 0.01) demonstrate the system is not random. Potential violation.",
    },
    {
      title: "Art. 35 LJAr - Information",
      excerpt: "The operator appropriately informs about the risks of gambling.",
      finding: "No mention of temporal dependency algorithm. RTP not published. Incomplete information.",
    },
    {
      title: "Art. 15 OJAr - Transparency",
      excerpt: "Game rules, winning and losing chances [...] must be easily accessible.",
      finding: "The 66.14% RTP is not communicated. True conditional probabilities are hidden.",
    },
    {
      title: "Art. 2 LJAr - Definition",
      excerpt: "Games of chance are games where winning depends entirely or essentially on chance.",
      finding: "Dependency on the previous draw contradicts the legal definition of \"chance\".",
    },
  ]
};

export const responseConcerns = {
  fr: [
    "Invocation abusive de la confidentialité : le RTP doit être public (art. 35 LJAr).",
    "Aucun certificat Gespa spécifique ni audit fourni.",
    "Absence de plan d'investigation proposé malgré les irrégularités.",
  ],
  en: [
    "Abusive invocation of confidentiality: RTP must be public (Art. 35 LJAr).",
    "No specific Gespa certificate or audit provided.",
    "No investigation plan proposed despite irregularities.",
  ]
};

export const methodologyData = {
  fr: {
    tools: [
      "Python 3.11 + NumPy/Pandas",
      "Tests : scipy.stats, statsmodels",
      "Bootstrap : 10 000 permutations",
      "Visualisation : Matplotlib/Seaborn",
    ],
    limitations: [
      "Échantillon limité à 309 tirages.",
      "Pas d'accès au code source.",
      "Analyse observationnelle uniquement.",
    ],
    nextSteps: [
      "Obtenir l'historique complet (n > 10 000).",
      "Audit du générateur par un tiers certifié.",
      "Analyse des logs serveur et timestamps.",
    ],
    actions: [
      "Consulter un avocat spécialisé.",
      "Étudier une action collective.",
    ],
  },
  en: {
    tools: [
      "Python 3.11 + NumPy/Pandas",
      "Tests: scipy.stats, statsmodels",
      "Bootstrap: 10,000 permutations",
      "Visualization: Matplotlib/Seaborn",
    ],
    limitations: [
      "Sample limited to 309 draws.",
      "No access to source code.",
      "Observational analysis only.",
    ],
    nextSteps: [
      "Obtain complete history (n > 10,000).",
      "Third-party certified generator audit.",
      "Server logs and timestamps analysis.",
    ],
    actions: [
      "Consult a specialized lawyer.",
      "Study collective action.",
    ],
  }
};

// Sequence visualization
export const sequenceVisualization = "WLLWLLWLWLWLLLWLLWLLLWLLLLWLLWLLWLLLLLLLWLWLLLLLLWLLWLLLLLLLLWLLWLLLLLLLWLLLWLLLLLLWLLLWLLLWLWLWLWL";

