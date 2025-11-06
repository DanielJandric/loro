export const translations = {
  fr: {
    // Header
    header: {
      independentAnalysis: "Analyse indépendante",
      title: "E-billets Loro.ch",
      subtitle: "Système non-aléatoire détecté",
      description: "309 tirages sur 701 jours démontrent une dépendance temporelle incompatible avec un générateur de hasard certifié. Trois tests statistiques convergent (p < 0.01) et révèlent une chute de 30% de vos chances immédiatement après un gain.",
      legalWarning: "« La Loterie Romande viole son propre Article 2.1 qui définit les jeux comme des 'tirages au sort'. Les tests statistiques (p < 0.01) prouvent que le système n'est PAS aléatoire mais algorithmiquement manipulé pour réduire les gains consécutifs. Cette pratique viole également l'Article 8.3 qui garantit l'égalité des probabilités pour tous les billets. »"
    },
    
    // KPIs
    kpis: {
      rtpObserved: "RTP observé",
      rtpDetail: "Taux de redistribution anormalement bas",
      pValue: "p-value (Runs Test)",
      pValueDetail: "Rejet à 5% ⇒ système non-aléatoire",
      winProbDrop: "Baisse de P(Win)",
      winProbDropDetail: "Après un gain vs probabilité moyenne",
      confidence: "Niveau de confiance",
      confidenceDetail: "Basé sur 3 tests convergents"
    },
    
    // Sections
    sections: {
      essentials: "L'essentiel en 30 secondes",
      essentialsIntro: "Cette analyse indépendante met en évidence une dépendance temporelle du système d'e-billets. Trois tests convergents (p < 0.01) rejettent l'hypothèse d'aléatoire.",
      conclusion: "Conclusion :",
      conclusionText: "le système Loro.ch ne fonctionne pas comme un générateur aléatoire. Trois tests indépendants (p < 0.01) montrent une dépendance directe entre chaque tirage et le précédent, ce qui est mathématiquement incompatible avec un jeu de hasard.",
      
      understanding: "Comprendre sans être statisticien",
      understandingText: "Dans un jeu équitable, la pièce n'a pas de mémoire : la probabilité de gagner reste stable (32.69%). Ici, la probabilité s'effondre après un gain — comme si le système se souvenait du résultat précédent pour vous défavoriser.",
      
      protocols: "Protocoles et preuves scientifiques",
      protocolsText: "309 tirages consécutifs ont été analysés via trois tests statistiques complémentaires conformément aux standards académiques. Tous rejettent l'hypothèse d'aléatoire.",
      
      financial: "Impact financier et RTP",
      legalFramework: "Cadre légal suisse",
      methodology: "Méthodologie et limites",
      contact: "Contact"
    },
    
    // Table headers
    tables: {
      situation: "Situation",
      normalGame: "Jeu normal",
      observedLoro: "Observé Loro",
      deviation: "Écart",
      metric: "Métrique",
      observed: "Observé",
      standard: "Standard",
      game: "Jeu",
      rtp: "RTP",
      winRate: "Win rate"
    },
    
    // Footer
    footer: {
      title: "Analyse statistique E-billets Loro.ch",
      lastUpdate: "Dernière mise à jour : novembre 2025",
      backToTop: "Haut de page",
      contact: "Contact",
      requestDataset: "Demander le dataset",
      independentAnalysis: "Analyse indépendante"
    }
  },
  
  en: {
    // Header
    header: {
      independentAnalysis: "Independent Analysis",
      title: "Loro.ch E-tickets",
      subtitle: "Non-random System Detected",
      description: "309 draws over 701 days demonstrate temporal dependency incompatible with a certified random generator. Three statistical tests converge (p < 0.01) and reveal a 30% drop in your chances immediately after a win.",
      legalWarning: "« Loterie Romande violates its own Article 2.1 which defines games as 'random draws'. Statistical tests (p < 0.01) prove the system is NOT random but algorithmically manipulated to reduce consecutive wins. This practice also violates Article 8.3 which guarantees equal probabilities for all tickets. »"
    },
    
    // KPIs
    kpis: {
      rtpObserved: "Observed RTP",
      rtpDetail: "Abnormally low redistribution rate",
      pValue: "p-value (Runs Test)",
      pValueDetail: "Rejected at 5% ⇒ non-random system",
      winProbDrop: "P(Win) Drop",
      winProbDropDetail: "After a win vs average probability",
      confidence: "Confidence Level",
      confidenceDetail: "Based on 3 converging tests"
    },
    
    // Sections
    sections: {
      essentials: "Key Findings in 30 Seconds",
      essentialsIntro: "This independent analysis highlights temporal dependency in the e-ticket system. Three converging tests (p < 0.01) reject the randomness hypothesis.",
      conclusion: "Conclusion:",
      conclusionText: "the Loro.ch system does not function as a random generator. Three independent tests (p < 0.01) show direct dependency between each draw and the previous one, which is mathematically incompatible with a game of chance.",
      
      understanding: "Understanding Without Being a Statistician",
      understandingText: "In a fair game, the coin has no memory: the probability of winning remains stable (32.69%). Here, the probability collapses after a win — as if the system remembered the previous result to disadvantage you.",
      
      protocols: "Protocols and Scientific Evidence",
      protocolsText: "309 consecutive draws were analyzed via three complementary statistical tests according to academic standards. All reject the randomness hypothesis.",
      
      financial: "Financial Impact and RTP",
      legalFramework: "Swiss Legal Framework",
      methodology: "Methodology and Limitations",
      contact: "Contact"
    },
    
    // Table headers
    tables: {
      situation: "Situation",
      normalGame: "Normal Game",
      observedLoro: "Observed Loro",
      deviation: "Deviation",
      metric: "Metric",
      observed: "Observed",
      standard: "Standard",
      game: "Game",
      rtp: "RTP",
      winRate: "Win rate"
    },
    
    // Footer
    footer: {
      title: "Loro.ch E-tickets Statistical Analysis",
      lastUpdate: "Last updated: November 2025",
      backToTop: "Back to top",
      contact: "Contact",
      requestDataset: "Request dataset",
      independentAnalysis: "Independent analysis"
    }
  }
};

export type Language = 'fr' | 'en';
export type TranslationKey = typeof translations.fr;

