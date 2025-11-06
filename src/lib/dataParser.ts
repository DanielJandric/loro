export interface GameDraw {
  type: string;
  game: string;
  date: string;
  time: string;
  stake: number;
  result: 'Gain' | 'Perte';
  winnings: number;
  refExt: string;
  refInt: string;
}

export interface GameStats {
  game: string;
  count: number;
  totalStake: number;
  totalWinnings: number;
  rtp: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface ConditionalProbs {
  pWinAfterWin: number;
  pWinAfterLoss: number;
  globalWinRate: number;
  gap: number;
}

export function parseCSVData(csvText: string): GameDraw[] {
  const lines = csvText.trim().split('\n');
  const draws: GameDraw[] = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(',');

    if (parts.length >= 9) {
      draws.push({
        type: parts[0],
        game: parts[1],
        date: parts[2],
        time: parts[3],
        stake: parseFloat(parts[4]),
        result: parts[5] as 'Gain' | 'Perte',
        winnings: parseFloat(parts[6]),
        refExt: parts[7],
        refInt: parts[8],
      });
    }
  }

  // IMPORTANT: Inverser l'ordre car les données sont décroissantes (plus récent en premier)
  // On veut chronologique (ancien en premier)
  return draws.reverse();
}

export function calculateGameStats(draws: GameDraw[]): Map<string, GameStats> {
  const statsMap = new Map<string, GameStats>();

  draws.forEach(draw => {
    if (!statsMap.has(draw.game)) {
      statsMap.set(draw.game, {
        game: draw.game,
        count: 0,
        totalStake: 0,
        totalWinnings: 0,
        rtp: 0,
        winRate: 0,
        wins: 0,
        losses: 0,
      });
    }

    const stats = statsMap.get(draw.game)!;
    stats.count++;
    stats.totalStake += draw.stake;
    stats.totalWinnings += draw.winnings;

    if (draw.result === 'Gain') {
      stats.wins++;
    } else {
      stats.losses++;
    }
  });

  // Calculate RTP and win rate
  statsMap.forEach(stats => {
    stats.rtp = stats.totalStake > 0 ? (stats.totalWinnings / stats.totalStake) * 100 : 0;
    stats.winRate = stats.count > 0 ? (stats.wins / stats.count) * 100 : 0;
  });

  return statsMap;
}

export function calculateConditionalProbabilities(draws: GameDraw[]): ConditionalProbs {
  let winAfterWin = 0;
  let totalAfterWin = 0;
  let winAfterLoss = 0;
  let totalAfterLoss = 0;
  let totalWins = 0;

  for (let i = 1; i < draws.length; i++) {
    const current = draws[i];
    const previous = draws[i - 1];

    if (current.result === 'Gain') {
      totalWins++;
    }

    if (previous.result === 'Gain') {
      totalAfterWin++;
      if (current.result === 'Gain') {
        winAfterWin++;
      }
    }

    if (previous.result === 'Perte') {
      totalAfterLoss++;
      if (current.result === 'Gain') {
        winAfterLoss++;
      }
    }
  }

  const pWinAfterWin = totalAfterWin > 0 ? (winAfterWin / totalAfterWin) * 100 : 0;
  const pWinAfterLoss = totalAfterLoss > 0 ? (winAfterLoss / totalAfterLoss) * 100 : 0;
  const globalWinRate = draws.length > 0 ? (totalWins / draws.length) * 100 : 0;
  const gap = Math.abs(pWinAfterWin - pWinAfterLoss);

  return {
    pWinAfterWin,
    pWinAfterLoss,
    globalWinRate,
    gap,
  };
}

export function calculateGlobalStats(draws: GameDraw[]) {
  const totalStake = draws.reduce((sum, d) => sum + d.stake, 0);
  const totalWinnings = draws.reduce((sum, d) => sum + d.winnings, 0);
  const totalWins = draws.filter(d => d.result === 'Gain').length;
  const rtp = totalStake > 0 ? (totalWinnings / totalStake) * 100 : 0;
  const winRate = draws.length > 0 ? (totalWins / draws.length) * 100 : 0;
  const netLoss = totalWinnings - totalStake;

  return {
    totalStake,
    totalWinnings,
    netLoss,
    rtp,
    winRate,
    totalDraws: draws.length,
    totalWins,
    totalLosses: draws.length - totalWins,
  };
}

export function getWinLossSequence(draws: GameDraw[]): string {
  return draws.map(d => d.result === 'Gain' ? 'W' : 'L').join('');
}
