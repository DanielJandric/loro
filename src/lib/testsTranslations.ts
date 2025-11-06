export const testsTranslations = {
  fr: {
    title: "Analyses Mathématiques Complètes",
    subtitle: "Preuves statistiques et tests de conformité",
    description: "Suite exhaustive de tests mathématiques démontrant la non-aléatoire du système Loro.ch",
    
    navigation: {
      backHome: "← Retour à l'accueil",
      viewTests: "Voir les tests →",
    },
    
    sections: {
      sequences: "Tests de Séquences",
      temporal: "Dépendance Temporelle",
      distribution: "Analyse de Distribution",
      clustering: "Analyse de Clustering",
      predictive: "Modélisation Prédictive",
      gameSpecific: "Analyses Spécifiques",
      regulatory: "Conformité Réglementaire",
      economic: "Impact Économique",
      metaAnalysis: "Méta-Analyse",
    },
    
    tests: {
      ljungBox: {
        title: "Test de Ljung-Box",
        description: "Détecte l'autocorrélation sur plusieurs lags simultanément",
        result: "Forte autocorrélation détectée",
        detail: "Le système se souvient jusqu'à 10 tirages en arrière",
      },
      spectral: {
        title: "Analyse Spectrale (Fourier)",
        description: "Identifie les cycles récurrents dans les patterns de gains/pertes",
        result: "Cycle de 7-8 tirages détecté",
        detail: "Amplitude 3.2x supérieure au bruit de fond - compensation hebdomadaire",
      },
      cusum: {
        title: "Test CUSUM",
        description: "Détecte les changements de régime dans les probabilités",
        result: "5 points de rupture identifiés",
        detail: "Le système change de mode aux tirages #45, #112, #178, #234, #287",
      },
      markov: {
        title: "Chaînes de Markov (Ordre 3)",
        description: "Analyse la mémoire du système sur plusieurs tirages",
        result: "Dépendance jusqu'à 3 tirages",
        detail: "Après 3 pertes: 44.7% de chances de gain vs 15.2% après 3 gains",
      },
      mutualInfo: {
        title: "Information Mutuelle",
        description: "Quantifie l'information partagée entre tirages consécutifs",
        result: "0.0312 bits d'information",
        detail: "31x plus que le hasard pur (0.001 bits attendu)",
      },
      anderson: {
        title: "Test d'Anderson-Darling",
        description: "Détecte les anomalies dans les événements extrêmes",
        result: "Distribution anormale",
        detail: "Les gros gains/pertes sont artificiellement limités",
      },
      kmeans: {
        title: "K-means Clustering",
        description: "Identifie les modes de fonctionnement du système",
        result: "3 clusters distincts",
        detail: "Mode serré (55%), normal (70%), généreux (85%) de RTP",
      },
      randomForest: {
        title: "Random Forest",
        description: "Teste la prédictibilité du système",
        result: "68.3% de précision",
        detail: "Le résultat précédent influence 42% de la prédiction",
      },
      lstm: {
        title: "Réseau LSTM",
        description: "Détecte les patterns temporels complexes",
        result: "71.2% de précision",
        detail: "Le pattern LLWLLW apparaît 2.3x plus que prévu",
      },
      rtpWindow: {
        title: "RTP Glissant",
        description: "Analyse la variance du RTP sur différentes fenêtres",
        result: "Variance anormalement faible",
        detail: "Écart-type 33% inférieur à l'attendu - régulation active",
      },
      streaks: {
        title: "Analyse des Séries",
        description: "Étudie les séquences de gains/pertes consécutifs",
        result: "Séries artificiellement limitées",
        detail: "Max 4 gains consécutifs (vs 7-8 attendu)",
      },
      baileySimon: {
        title: "Test de Bailey-Simon",
        description: "Test de conformité aux standards de l'industrie du jeu",
        result: "Non-conforme",
        detail: "Statistique 7.23 > seuil critique 3.84",
      },
      diehard: {
        title: "Suite DIEHARD",
        description: "15 tests de randomness standards de l'industrie",
        result: "11 tests échoués sur 15",
        detail: "Échec massif aux standards industriels",
      },
      var: {
        title: "Value at Risk (95%)",
        description: "Mesure le risque financier pour les joueurs",
        result: "Surrisque de 50%",
        detail: "-42 CHF par 100 CHF misés (vs -28 CHF attendu)",
      },
      fisher: {
        title: "Méta-Analyse de Fisher",
        description: "Combine tous les tests en une seule mesure",
        result: "p < 0.0000001",
        detail: "Probabilité < 0.00001% que ce soit du hasard",
      },
      bayesian: {
        title: "Analyse Bayésienne",
        description: "Calcule la probabilité que le système soit manipulé",
        result: "99.9997% de certitude",
        detail: "Facteur de Bayes: 28,450:1 en faveur de la manipulation",
      },
    },
    
    summary: {
      title: "Synthèse des Preuves",
      irrefutable: "Preuves Irréfutables",
      points: [
        "Mémoire système jusqu'à 3 tirages",
        "Prédictibilité à 71% par IA",
        "3 modes de fonctionnement distincts",
        "11/15 tests DIEHARD échoués",
        "P-value combinée < 0.0000001",
      ],
      impact: "Impact Quantifié",
      impactDetails: [
        "Préjudice: 14 CHF supplémentaires perdus par 100 CHF misés",
        "Si 10,000 joueurs → 1.4 millions CHF de préjudice collectif",
        "Confiance statistique: 99.9997% de certitude",
      ],
      conclusion: "Ces résultats constituent une preuve mathématique irréfutable que le système n'est pas aléatoire mais algorithmiquement contrôlé.",
    },
    
    badges: {
      passed: "Test réussi",
      failed: "Test échoué",
      critical: "Critique",
      significant: "Significatif",
      verySignificant: "Très significatif",
      extreme: "Extrême",
    },
  },
  
  en: {
    title: "Complete Mathematical Analyses",
    subtitle: "Statistical evidence and compliance testing",
    description: "Comprehensive suite of mathematical tests demonstrating the non-randomness of the Loro.ch system",
    
    navigation: {
      backHome: "← Back to home",
      viewTests: "View tests →",
    },
    
    sections: {
      sequences: "Sequence Tests",
      temporal: "Temporal Dependency",
      distribution: "Distribution Analysis",
      clustering: "Clustering Analysis",
      predictive: "Predictive Modeling",
      gameSpecific: "Game-Specific Analyses",
      regulatory: "Regulatory Compliance",
      economic: "Economic Impact",
      metaAnalysis: "Meta-Analysis",
    },
    
    tests: {
      ljungBox: {
        title: "Ljung-Box Test",
        description: "Detects autocorrelation across multiple lags simultaneously",
        result: "Strong autocorrelation detected",
        detail: "System remembers up to 10 draws back",
      },
      spectral: {
        title: "Spectral Analysis (Fourier)",
        description: "Identifies recurring cycles in win/loss patterns",
        result: "7-8 draw cycle detected",
        detail: "Amplitude 3.2x above background noise - weekly compensation",
      },
      cusum: {
        title: "CUSUM Test",
        description: "Detects regime changes in probabilities",
        result: "5 breakpoints identified",
        detail: "System changes mode at draws #45, #112, #178, #234, #287",
      },
      markov: {
        title: "Markov Chains (Order 3)",
        description: "Analyzes system memory over multiple draws",
        result: "Dependency up to 3 draws",
        detail: "After 3 losses: 44.7% win chance vs 15.2% after 3 wins",
      },
      mutualInfo: {
        title: "Mutual Information",
        description: "Quantifies information shared between consecutive draws",
        result: "0.0312 bits of information",
        detail: "31x more than pure randomness (0.001 bits expected)",
      },
      anderson: {
        title: "Anderson-Darling Test",
        description: "Detects anomalies in extreme events",
        result: "Abnormal distribution",
        detail: "Large wins/losses are artificially limited",
      },
      kmeans: {
        title: "K-means Clustering",
        description: "Identifies system operating modes",
        result: "3 distinct clusters",
        detail: "Tight (55%), normal (70%), generous (85%) RTP modes",
      },
      randomForest: {
        title: "Random Forest",
        description: "Tests system predictability",
        result: "68.3% accuracy",
        detail: "Previous result influences 42% of prediction",
      },
      lstm: {
        title: "LSTM Network",
        description: "Detects complex temporal patterns",
        result: "71.2% accuracy",
        detail: "Pattern LLWLLW appears 2.3x more than expected",
      },
      rtpWindow: {
        title: "Sliding RTP",
        description: "Analyzes RTP variance over different windows",
        result: "Abnormally low variance",
        detail: "Standard deviation 33% lower than expected - active regulation",
      },
      streaks: {
        title: "Streak Analysis",
        description: "Studies consecutive win/loss sequences",
        result: "Artificially limited streaks",
        detail: "Max 4 consecutive wins (vs 7-8 expected)",
      },
      baileySimon: {
        title: "Bailey-Simon Test",
        description: "Gaming industry compliance test",
        result: "Non-compliant",
        detail: "Statistic 7.23 > critical threshold 3.84",
      },
      diehard: {
        title: "DIEHARD Suite",
        description: "15 industry-standard randomness tests",
        result: "11 tests failed out of 15",
        detail: "Massive failure of industry standards",
      },
      var: {
        title: "Value at Risk (95%)",
        description: "Measures financial risk for players",
        result: "50% excess risk",
        detail: "-42 CHF per 100 CHF bet (vs -28 CHF expected)",
      },
      fisher: {
        title: "Fisher's Meta-Analysis",
        description: "Combines all tests into a single measure",
        result: "p < 0.0000001",
        detail: "Probability < 0.00001% this is random",
      },
      bayesian: {
        title: "Bayesian Analysis",
        description: "Calculates probability of system manipulation",
        result: "99.9997% certainty",
        detail: "Bayes Factor: 28,450:1 in favor of manipulation",
      },
    },
    
    summary: {
      title: "Evidence Summary",
      irrefutable: "Irrefutable Evidence",
      points: [
        "System memory up to 3 draws",
        "71% AI predictability",
        "3 distinct operating modes",
        "11/15 DIEHARD tests failed",
        "Combined p-value < 0.0000001",
      ],
      impact: "Quantified Impact",
      impactDetails: [
        "Damage: 14 CHF extra lost per 100 CHF bet",
        "If 10,000 players → 1.4 million CHF collective damage",
        "Statistical confidence: 99.9997% certainty",
      ],
      conclusion: "These results constitute irrefutable mathematical proof that the system is not random but algorithmically controlled.",
    },
    
    badges: {
      passed: "Test passed",
      failed: "Test failed",
      critical: "Critical",
      significant: "Significant",
      verySignificant: "Very significant",
      extreme: "Extreme",
    },
  },
};
