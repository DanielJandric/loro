'use client';

import { useEffect, useState } from 'react';
import {
  parseCSVData,
  calculateGameStats,
  calculateConditionalProbabilities,
  calculateGlobalStats,
  type GameStats,
  type ConditionalProbs,
} from '@/lib/dataParser';
import { RTPBarChart } from './RTPBarChart';
import { ConditionalProbChart } from './ConditionalProbChart';
import { getGameIcon } from './GameIcons';

interface DataVisualizationsProps {
  language: 'fr' | 'en';
}

export function DataVisualizations({ language }: DataVisualizationsProps) {
  const [gameStats, setGameStats] = useState<GameStats[]>([]);
  const [conditionalProbs, setConditionalProbs] = useState<ConditionalProbs | null>(null);
  const [globalStats, setGlobalStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data.csv');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }

        const csvText = await response.text();
        const draws = parseCSVData(csvText);

        const statsMap = calculateGameStats(draws);
        const stats = Array.from(statsMap.values());

        const probs = calculateConditionalProbabilities(draws);
        const global = calculateGlobalStats(draws);

        setGameStats(stats);
        setConditionalProbs(probs);
        setGlobalStats(global);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-white/60">
          {language === 'fr' ? 'Chargement des données...' : 'Loading data...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-white backdrop-blur-sm">
        <p className="font-semibold">{language === 'fr' ? 'Erreur' : 'Error'}</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Global Stats */}
      {globalStats && (
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
          <h3 className="mb-6 text-2xl font-semibold text-white">
            {language === 'fr' ? 'Statistiques Globales' : 'Global Statistics'}
          </h3>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-full rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">{language === 'fr' ? 'RTP Global' : 'Global RTP'}</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-400">{globalStats.rtp.toFixed(2)}%</p>
              <p className="text-xs text-red-300/80 mt-1">
                {language === 'fr' ? 'vs 90-95% standard' : 'vs 90-95% standard'}
              </p>
            </div>
            <div className="h-full rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">{language === 'fr' ? 'Tirages totaux' : 'Total draws'}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{globalStats.totalDraws}</p>
            </div>
            <div className="h-full rounded-xl bg-white/5 border border-white/10 p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-xs sm:text-sm text-white/60 mb-1">{language === 'fr' ? 'Gains / Pertes' : 'Wins / Losses'}</p>
              <p className="text-xl sm:text-2xl font-bold">
                <span className="text-emerald-400">{globalStats.totalWins}</span>
                <span className="text-white/40 mx-1">/</span>
                <span className="text-red-400">{globalStats.totalLosses}</span>
              </p>
            </div>
            <div className="h-full rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">{language === 'fr' ? 'Enjeu total' : 'Total stake'}</p>
              <p className="text-lg sm:text-xl font-bold text-white">{globalStats.totalStake.toFixed(0)} CHF</p>
            </div>
            <div className="h-full rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs sm:text-sm text-white/60 mb-1">{language === 'fr' ? 'Gains totaux' : 'Total winnings'}</p>
              <p className="text-lg sm:text-xl font-bold text-white">{globalStats.totalWinnings.toFixed(0)} CHF</p>
            </div>
            <div className="h-full rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 p-4">
              <p className="text-xs sm:text-sm text-red-300/80 mb-1">{language === 'fr' ? 'Perte nette' : 'Net loss'}</p>
              <p className="text-lg sm:text-xl font-bold text-red-400">-{globalStats.netLoss.toFixed(0)} CHF</p>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Probabilities */}
      {conditionalProbs && (
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
          <h3 className="mb-6 text-2xl font-semibold text-white">
            {language === 'fr' ? 'Analyse des Probabilités Conditionnelles' : 'Conditional Probability Analysis'}
          </h3>
          <ConditionalProbChart probs={conditionalProbs} language={language} />
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 text-sm text-white backdrop-blur-sm">
            <p className="font-semibold">
              {language === 'fr' ? 'Interprétation:' : 'Interpretation:'}
            </p>
            <p className="mt-2">
              {language === 'fr'
                ? `La probabilité de gagner après un gain (${conditionalProbs.pWinAfterWin.toFixed(2)}%) est significativement plus faible que la probabilité de gagner après une perte (${conditionalProbs.pWinAfterLoss.toFixed(2)}%). Cet écart de ${conditionalProbs.gap.toFixed(2)} points suggère une dépendance temporelle.`
                : `The probability of winning after a win (${conditionalProbs.pWinAfterWin.toFixed(2)}%) is significantly lower than the probability of winning after a loss (${conditionalProbs.pWinAfterLoss.toFixed(2)}%). This gap of ${conditionalProbs.gap.toFixed(2)} points suggests temporal dependency.`}
            </p>
          </div>
        </div>
      )}

      {/* RTP by Game */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
        <h3 className="mb-6 text-2xl font-semibold text-white">
          {language === 'fr' ? 'RTP par Jeu' : 'RTP by Game'}
        </h3>
        <RTPBarChart gameStats={gameStats} language={language} />
      </div>

      {/* Game Details Table */}
      <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
        <h3 className="mb-6 text-2xl font-semibold text-white">
          {language === 'fr' ? 'Détails par Jeu' : 'Game Details'}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/20 text-xs uppercase tracking-wide text-white/80">
              <tr>
                <th className="px-4 py-3">{language === 'fr' ? 'Jeu' : 'Game'}</th>
                <th className="px-4 py-3 text-center">{language === 'fr' ? 'Tirages' : 'Draws'}</th>
                <th className="px-4 py-3 text-right">{language === 'fr' ? 'Enjeu' : 'Stake'}</th>
                <th className="px-4 py-3 text-right">{language === 'fr' ? 'Gains' : 'Winnings'}</th>
                <th className="px-4 py-3 text-center">RTP</th>
                <th className="px-4 py-3 text-center">{language === 'fr' ? 'Taux de gain' : 'Win rate'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {gameStats
                .sort((a, b) => b.totalStake - a.totalStake)
                .map(stat => {
                  const Icon = getGameIcon(stat.game);
                  let rtpColor = 'text-red-400';
                  if (stat.rtp >= 90) rtpColor = 'text-emerald-400';
                  else if (stat.rtp >= 70) rtpColor = 'text-amber-400';

                  return (
                    <tr key={stat.game} className="text-white/80 transition-colors hover:bg-white/5">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-white/60" />
                          <span className="font-medium text-white">{stat.game}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">{stat.count}</td>
                      <td className="px-4 py-4 text-right">{stat.totalStake.toFixed(2)} CHF</td>
                      <td className="px-4 py-4 text-right">{stat.totalWinnings.toFixed(2)} CHF</td>
                      <td className={`px-4 py-4 text-center font-semibold ${rtpColor}`}>
                        {stat.rtp.toFixed(1)}%
                      </td>
                      <td className="px-4 py-4 text-center">{stat.winRate.toFixed(1)}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
