// Analyse RÉELLE des données CSV - PAS D'HALLUCINATION
// Les données sont ordonnées du plus récent (ligne 1) au plus ancien (ligne 309)

interface Draw {
  game: string;
  date: string;
  time: string;
  stake: number;
  result: 'Win' | 'Loss';
  winAmount: number;
}

export function parseRealCSV(csvText: string): Draw[] {
  const lines = csvText.trim().split('\n');
  // Skip header line
  const dataLines = lines.slice(1);
  
  // IMPORTANT: Les données sont déjà ordonnées du plus récent au plus ancien
  // On les inverse pour avoir l'ordre chronologique (plus ancien au plus récent)
  const draws: Draw[] = [];
  
  for (const line of dataLines) {
    const parts = line.split(',');
    if (parts.length >= 7) {
      const result = parts[5] === 'Gain' ? 'Win' : 'Loss';
      draws.push({
        game: parts[1],
        date: parts[2],
        time: parts[3],
        stake: parseFloat(parts[4]) || 0,
        result,
        winAmount: parseFloat(parts[6]) || 0,
      });
    }
  }
  
  // CRITICAL: Reverse to get chronological order (oldest to newest)
  return draws.reverse();
}

export function calculateRealStatistics(draws: Draw[]) {
  const n = draws.length;
  const wins = draws.filter(d => d.result === 'Win').length;
  const losses = n - wins;
  
  // Calcul du RTP global
  const totalStake = draws.reduce((sum, d) => sum + d.stake, 0);
  const totalWon = draws.reduce((sum, d) => sum + d.winAmount, 0);
  const rtp = (totalWon / totalStake) * 100;
  
  // Probabilités conditionnelles
  let winAfterWin = 0;
  let winAfterLoss = 0;
  let countAfterWin = 0;
  let countAfterLoss = 0;
  
  for (let i = 1; i < n; i++) {
    if (draws[i-1].result === 'Win') {
      countAfterWin++;
      if (draws[i].result === 'Win') winAfterWin++;
    } else {
      countAfterLoss++;
      if (draws[i].result === 'Win') winAfterLoss++;
    }
  }
  
  const pWinAfterWin = winAfterWin / countAfterWin;
  const pWinAfterLoss = winAfterLoss / countAfterLoss;
  
  return {
    n,
    wins,
    losses,
    winRate: wins / n,
    rtp,
    totalStake,
    totalWon,
    netLoss: totalStake - totalWon,
    pWinAfterWin,
    pWinAfterLoss,
    countAfterWin,
    countAfterLoss,
  };
}

export function runsTest(draws: Draw[]) {
  // Wald-Wolfowitz Runs Test
  const n = draws.length;
  const sequence = draws.map(d => d.result === 'Win' ? 1 : 0);
  
  // Count runs
  let runs = 1;
  for (let i = 1; i < n; i++) {
    if (sequence[i] !== sequence[i-1]) runs++;
  }
  
  // Count wins and losses
  const n1 = sequence.filter(x => x === 1).length; // wins
  const n2 = n - n1; // losses
  
  // Expected runs and variance under null hypothesis
  const expectedRuns = (2 * n1 * n2) / n + 1;
  const variance = (2 * n1 * n2 * (2 * n1 * n2 - n)) / (n * n * (n - 1));
  const stdDev = Math.sqrt(variance);
  
  // Z-score
  const z = (runs - expectedRuns) / stdDev;
  
  // Two-tailed p-value (approximation)
  const pValue = 2 * (1 - normalCDF(Math.abs(z)));
  
  return {
    runs,
    expectedRuns,
    variance,
    stdDev,
    z,
    pValue,
    n1,
    n2,
    significant: pValue < 0.05,
    verySignificant: pValue < 0.01,
  };
}

export function chiSquareTest(draws: Draw[]) {
  // Chi-square test for independence
  const n = draws.length;
  
  // Create contingency table
  let winToWin = 0, winToLoss = 0;
  let lossToWin = 0, lossToLoss = 0;
  
  for (let i = 1; i < n; i++) {
    const prev = draws[i-1].result;
    const curr = draws[i].result;
    
    if (prev === 'Win' && curr === 'Win') winToWin++;
    else if (prev === 'Win' && curr === 'Loss') winToLoss++;
    else if (prev === 'Loss' && curr === 'Win') lossToWin++;
    else lossToLoss++;
  }
  
  const total = n - 1;
  const rowWin = winToWin + winToLoss;
  const rowLoss = lossToWin + lossToLoss;
  const colWin = winToWin + lossToWin;
  const colLoss = winToLoss + lossToLoss;
  
  // Expected frequencies
  const expectedWinToWin = (rowWin * colWin) / total;
  const expectedWinToLoss = (rowWin * colLoss) / total;
  const expectedLossToWin = (rowLoss * colWin) / total;
  const expectedLossToLoss = (rowLoss * colLoss) / total;
  
  // Chi-square statistic
  const chiSquare = 
    Math.pow(winToWin - expectedWinToWin, 2) / expectedWinToWin +
    Math.pow(winToLoss - expectedWinToLoss, 2) / expectedWinToLoss +
    Math.pow(lossToWin - expectedLossToWin, 2) / expectedLossToWin +
    Math.pow(lossToLoss - expectedLossToLoss, 2) / expectedLossToLoss;
  
  // Degrees of freedom = (rows - 1) * (cols - 1) = 1
  // p-value approximation for df=1
  const pValue = 1 - chiSquareCDF(chiSquare, 1);
  
  return {
    observed: { winToWin, winToLoss, lossToWin, lossToLoss },
    expected: { 
      winToWin: expectedWinToWin, 
      winToLoss: expectedWinToLoss, 
      lossToWin: expectedLossToWin, 
      lossToLoss: expectedLossToLoss 
    },
    chiSquare,
    pValue,
    significant: pValue < 0.05,
    verySignificant: pValue < 0.01,
  };
}

export function calculateStreaks(draws: Draw[]) {
  const n = draws.length;
  let currentStreak = 1;
  let maxWinStreak = 0;
  let maxLossStreak = 0;
  const winStreaks: number[] = [];
  const lossStreaks: number[] = [];
  
  for (let i = 1; i < n; i++) {
    if (draws[i].result === draws[i-1].result) {
      currentStreak++;
    } else {
      // Record the streak
      if (draws[i-1].result === 'Win') {
        winStreaks.push(currentStreak);
        maxWinStreak = Math.max(maxWinStreak, currentStreak);
      } else {
        lossStreaks.push(currentStreak);
        maxLossStreak = Math.max(maxLossStreak, currentStreak);
      }
      currentStreak = 1;
    }
  }
  
  // Don't forget the last streak
  if (draws[n-1].result === 'Win') {
    winStreaks.push(currentStreak);
    maxWinStreak = Math.max(maxWinStreak, currentStreak);
  } else {
    lossStreaks.push(currentStreak);
    maxLossStreak = Math.max(maxLossStreak, currentStreak);
  }
  
  // Count consecutive wins (WW patterns)
  let consecutiveWins = 0;
  for (let i = 1; i < n; i++) {
    if (draws[i-1].result === 'Win' && draws[i].result === 'Win') {
      consecutiveWins++;
    }
  }
  
  return {
    maxWinStreak,
    maxLossStreak,
    winStreaksCount: winStreaks.length,
    lossStreaksCount: lossStreaks.length,
    avgWinStreak: winStreaks.reduce((a, b) => a + b, 0) / winStreaks.length || 0,
    avgLossStreak: lossStreaks.reduce((a, b) => a + b, 0) / lossStreaks.length || 0,
    consecutiveWins,
    winStreaks,
    lossStreaks,
  };
}

export function analyzeByGame(draws: Draw[]) {
  const gameStats = new Map<string, any>();
  
  // Group by game
  const gameGroups = new Map<string, Draw[]>();
  for (const draw of draws) {
    if (!gameGroups.has(draw.game)) {
      gameGroups.set(draw.game, []);
    }
    gameGroups.get(draw.game)!.push(draw);
  }
  
  // Calculate stats for each game
  for (const [game, gameDraws] of gameGroups) {
    const wins = gameDraws.filter(d => d.result === 'Win').length;
    const totalStake = gameDraws.reduce((sum, d) => sum + d.stake, 0);
    const totalWon = gameDraws.reduce((sum, d) => sum + d.winAmount, 0);
    
    gameStats.set(game, {
      game,
      count: gameDraws.length,
      wins,
      losses: gameDraws.length - wins,
      winRate: wins / gameDraws.length,
      totalStake,
      totalWon,
      rtp: (totalWon / totalStake) * 100,
      netResult: totalWon - totalStake,
    });
  }
  
  return gameStats;
}

// Helper functions for statistical calculations
function normalCDF(z: number): number {
  // Approximation of the cumulative distribution function for standard normal
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - prob : prob;
}

function chiSquareCDF(x: number, df: number): number {
  // Approximation for chi-square CDF with df degrees of freedom
  // For df=1, we can use the relationship with normal distribution
  if (df === 1) {
    return 2 * normalCDF(Math.sqrt(x)) - 1;
  }
  // For other df, would need more complex implementation
  return 0;
}

// Calculer l'entropie
export function calculateEntropy(draws: Draw[]) {
  const n = draws.length;
  const wins = draws.filter(d => d.result === 'Win').length;
  const losses = n - wins;
  
  const pWin = wins / n;
  const pLoss = losses / n;
  
  // Shannon entropy
  const entropy = -(pWin * Math.log2(pWin || 1) + pLoss * Math.log2(pLoss || 1));
  const maxEntropy = 1; // Maximum entropy for binary outcome
  
  return {
    entropy,
    maxEntropy,
    entropyRatio: entropy / maxEntropy,
  };
}
