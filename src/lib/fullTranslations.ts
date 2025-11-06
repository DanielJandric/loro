export const fullTranslations = {
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
      visualizationTitle: "Visualisation des 100 premiers tirages",
      visualizationNote: "Deux gains consécutifs (« WW ») n'apparaissent que 23 fois sur 309 tirages (7.5%) — bien en dessous des 10.7% attendus dans un système aléatoire.",
      conditionalProbabilities: "Probabilités conditionnelles",
      conditionalNote: "Après un gain, la probabilité de gagner à nouveau chute de 30%. Ce schéma n'existe pas dans un générateur aléatoire certifié.",
      
      protocols: "Protocoles et preuves scientifiques",
      protocolsText: "309 tirages consécutifs ont été analysés via trois tests statistiques complémentaires conformément aux standards académiques. Tous rejettent l'hypothèse d'aléatoire.",
      syntheticDataset: "Dataset synthétique",
      entropyTitle: "Entropie et incertitude",
      entropyNote: "L'entropie réduite confirme la présence d'une structure. Avec une indépendance parfaite, ces ratios se rapprocheraient de 100%.",
      
      financial: "Impact financier et RTP",
      rtpByGame: "RTP par jeu (≥ 10 tirages)",
      collectiveProjection: "Projection collective : si 1 000 joueurs subissent une perte moyenne de 1 000 CHF, le préjudice cumulé atteint 1 million CHF. Une investigation Gespa est nécessaire pour confirmer et quantifier l'exposition réelle.",
      
      legalFramework: "Cadre légal suisse",
      loroResponse: "Réponse de la Loterie Romande :",
      loroResponseText: "« Les jeux font l'objet d'audits approfondis. Pour des raisons de confidentialité, les documents techniques ne peuvent être transmis. »",
      
      methodology: "Méthodologie et limites",
      toolsUsed: "Outils utilisés",
      limitations: "Limites",
      nextSteps: "Prochaines étapes",
      recommendedActions: "Actions recommandées",
      
      contact: "Contact",
      contactText: "Questions, audit indépendant ou accès au dataset complet : contactez-nous. Les données sont anonymisées et disponibles pour toute revue experte.",
      legalNote: "Note juridique",
      legalNoteText: "Cette analyse présente des faits statistiques vérifiables. Elle n'accuse pas la Loterie Romande de fraude intentionnelle mais documente des écarts significatifs qui requièrent des clarifications formelles par les autorités compétentes (Gespa).",
      usefulContacts: "Contacts utiles :"
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
      winRate: "Win rate",
      afterWin: "Après un gain (Win)",
      afterLoss: "Après une perte (Loss)",
      globalAverage: "Moyenne globale",
      totalBet: "Montant total misé",
      totalWon: "Montant total gagné",
      netLoss: "Perte nette",
      globalRTP: "RTP global",
      averageWinRate: "Win rate moyen",
      compliant: "Conforme"
    },
    
    // Data
    data: {
      period: "Période : 17 janvier 2023 — 17 novembre 2024",
      drawCount: "Nombre de tirages : 309 (n = 309)",
      gamesAnalyzed: "Jeux analysés : 18 variantes",
      method: "Méthode : scraping automatisé",
      binaryEntropy: "Entropie binaire H(X)",
      entropyRatio: "Ratio H/Hmax",
      conditionalEntropy: "Entropie conditionnelle H(Xₜ | Xₜ₋₁)",
      conditionalRatio: "Ratio conditionnel",
      bits: "bits",
      max: "max"
    },
    
    // Footer
    footer: {
      title: "Analyse statistique E-billets Loro.ch",
      lastUpdate: "Dernière mise à jour : novembre 2025",
      backToTop: "Haut de page",
      contact: "Contact",
      requestDataset: "Demander le dataset",
      independentAnalysis: "Analyse indépendante",
      email: "Email :",
      dataset: "Dataset :",
      csvAnonymized: "CSV anonymisé sur demande",
      pgp: "PGP :",
      pgpKey: "clé disponible pour échanges sécurisés"
    },
    
    // Legal disclaimer (bottom)
    legalDisclaimer: {
      title: "AVIS JURIDIQUE ET RÉSERVES",
      text: "Toutes réserves usuelles demeurent expressément formulées. Le présent site est publié à titre purement informatif et documentaire. Les analyses statistiques présentées constituent des observations factuelles basées sur des données publiquement accessibles. L'auteur se réserve expressément le droit de : Modifier, compléter ou supprimer tout contenu sans préavis Entreprendre toute action judiciaire ou extrajudiciaire jugée appropriée Transmettre les présentes informations aux autorités compétentes Exercer tous droits et recours prévus par le droit suisse Sans reconnaissance préjudiciable : La publication de ces informations ne constitue en aucun cas une renonciation à quelque droit que ce soit, ni une reconnaissance de responsabilité. Sous réserve de tous droits : Notamment mais non limitativement les droits découlant du CO, de la LCD, de la LPD, de la LJAr et de toute autre disposition légale applicable. Toute utilisation malveillante ou déformation des informations présentées engagera la responsabilité civile et pénale de son auteur. For juridique : Lausanne, Suisse | Droit applicable : Droit suisse"
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
      visualizationTitle: "Visualization of first 100 draws",
      visualizationNote: "Two consecutive wins (\"WW\") appear only 23 times in 309 draws (7.5%) — well below the 10.7% expected in a random system.",
      conditionalProbabilities: "Conditional Probabilities",
      conditionalNote: "After a win, the probability of winning again drops by 30%. This pattern doesn't exist in a certified random generator.",
      
      protocols: "Protocols and Scientific Evidence",
      protocolsText: "309 consecutive draws were analyzed via three complementary statistical tests according to academic standards. All reject the randomness hypothesis.",
      syntheticDataset: "Synthetic Dataset",
      entropyTitle: "Entropy and Uncertainty",
      entropyNote: "Reduced entropy confirms the presence of structure. With perfect independence, these ratios would approach 100%.",
      
      financial: "Financial Impact and RTP",
      rtpByGame: "RTP by Game (≥ 10 draws)",
      collectiveProjection: "Collective projection: if 1,000 players suffer an average loss of 1,000 CHF, the cumulative damage reaches 1 million CHF. A Gespa investigation is needed to confirm and quantify the actual exposure.",
      
      legalFramework: "Swiss Legal Framework",
      loroResponse: "Loterie Romande's Response:",
      loroResponseText: "\"The games undergo thorough audits. For confidentiality reasons, technical documents cannot be transmitted.\"",
      
      methodology: "Methodology and Limitations",
      toolsUsed: "Tools Used",
      limitations: "Limitations",
      nextSteps: "Next Steps",
      recommendedActions: "Recommended Actions",
      
      contact: "Contact",
      contactText: "Questions, independent audit or access to the complete dataset: contact us. The data is anonymized and available for any expert review.",
      legalNote: "Legal Note",
      legalNoteText: "This analysis presents verifiable statistical facts. It does not accuse Loterie Romande of intentional fraud but documents significant deviations that require formal clarifications by the competent authorities (Gespa).",
      usefulContacts: "Useful contacts:"
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
      winRate: "Win rate",
      afterWin: "After a win",
      afterLoss: "After a loss",
      globalAverage: "Global average",
      totalBet: "Total amount bet",
      totalWon: "Total amount won",
      netLoss: "Net loss",
      globalRTP: "Global RTP",
      averageWinRate: "Average win rate",
      compliant: "Compliant"
    },
    
    // Data
    data: {
      period: "Period: January 17, 2023 — November 17, 2024",
      drawCount: "Number of draws: 309 (n = 309)",
      gamesAnalyzed: "Games analyzed: 18 variants",
      method: "Method: automated scraping",
      binaryEntropy: "Binary entropy H(X)",
      entropyRatio: "H/Hmax ratio",
      conditionalEntropy: "Conditional entropy H(Xₜ | Xₜ₋₁)",
      conditionalRatio: "Conditional ratio",
      bits: "bits",
      max: "max"
    },
    
    // Footer
    footer: {
      title: "Loro.ch E-tickets Statistical Analysis",
      lastUpdate: "Last updated: November 2025",
      backToTop: "Back to top",
      contact: "Contact",
      requestDataset: "Request dataset",
      independentAnalysis: "Independent analysis",
      email: "Email:",
      dataset: "Dataset:",
      csvAnonymized: "Anonymized CSV on request",
      pgp: "PGP:",
      pgpKey: "key available for secure exchanges"
    },
    
    // Legal disclaimer (bottom)
    legalDisclaimer: {
      title: "LEGAL NOTICE AND RESERVATIONS",
      text: "All usual reservations remain expressly formulated. This site is published for purely informational and documentary purposes. The statistical analyses presented constitute factual observations based on publicly accessible data. The author expressly reserves the right to: Modify, supplement or delete any content without notice; Undertake any legal or extrajudicial action deemed appropriate; Transmit this information to the competent authorities; Exercise all rights and remedies provided by Swiss law. Without prejudicial acknowledgment: The publication of this information does not constitute a waiver of any rights whatsoever, nor an acknowledgment of liability. Subject to all rights: Including but not limited to rights arising from the CO, LCD, LPD, LJAr and any other applicable legal provision. Any malicious use or distortion of the information presented will incur the civil and criminal liability of its author. Legal forum: Lausanne, Switzerland | Applicable law: Swiss law"
    }
  }
};

