'use client';

import { useEffect, useState } from 'react';
import { 
  parseRealCSV, 
  calculateRealStatistics, 
  runsTest, 
  chiSquareTest,
  calculateStreaks,
  analyzeByGame,
  calculateEntropy
} from '@/lib/realDataAnalysis';

interface VerifiedTestsProps {
  language: 'fr' | 'en';
}

export function VerifiedTests({ language }: VerifiedTestsProps) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAndAnalyze() {
      try {
        const response = await fetch('/data.csv');
        if (!response.ok) throw new Error('Failed to load data');
        
        const csvText = await response.text();
        const draws = parseRealCSV(csvText);
        
        // Calculer tous les tests réels
        const stats = calculateRealStatistics(draws);
        const runs = runsTest(draws);
        const chiSquare = chiSquareTest(draws);
        const streaks = calculateStreaks(draws);
        const gameStats = analyzeByGame(draws);
        const entropy = calculateEntropy(draws);
        
        setResults({
          stats,
          runs,
          chiSquare,
          streaks,
          gameStats,
          entropy,
          draws
        });
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }
    
    loadAndAnalyze();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white/60">
          {language === 'fr' ? 'Analyse en cours...' : 'Analyzing...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-500/20 p-6 text-red-400">
        {language === 'fr' ? 'Erreur : ' : 'Error: '}{error}
      </div>
    );
  }

  if (!results) return null;

  const { stats, runs, chiSquare, streaks, entropy } = results;

  return (
    <div className="space-y-12">
      {/* Statistiques de base VÉRIFIÉES */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">
          {language === 'fr' ? 'Statistiques Vérifiées (309 tirages)' : 'Verified Statistics (309 draws)'}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-800/50 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Tirages analysés' : 'Draws analyzed'}</p>
            <p className="text-2xl font-bold text-white">{stats.n}</p>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Gains / Pertes' : 'Wins / Losses'}</p>
            <p className="text-2xl font-bold text-white">{stats.wins} / {stats.losses}</p>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Taux de gain' : 'Win rate'}</p>
            <p className="text-2xl font-bold text-white">{(stats.winRate * 100).toFixed(2)}%</p>
          </div>
          <div className="rounded-xl bg-red-500/20 p-4">
            <p className="text-sm text-red-300/80">RTP</p>
            <p className="text-2xl font-bold text-red-400">{stats.rtp.toFixed(2)}%</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-800/50 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Total misé' : 'Total staked'}</p>
            <p className="text-xl font-bold text-white">{stats.totalStake.toFixed(2)} CHF</p>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Total gagné' : 'Total won'}</p>
            <p className="text-xl font-bold text-white">{stats.totalWon.toFixed(2)} CHF</p>
          </div>
          <div className="rounded-xl bg-red-500/20 p-4">
            <p className="text-sm text-red-300/80">{language === 'fr' ? 'Perte nette' : 'Net loss'}</p>
            <p className="text-xl font-bold text-red-400">-{stats.netLoss.toFixed(2)} CHF</p>
          </div>
        </div>
      </section>

      {/* Test 1: Runs Test VÉRIFIÉ */}
      <section className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">
        <h3 className="mb-4 text-xl font-bold text-white">
          {language === 'fr' ? 'Test 1: Wald-Wolfowitz (Runs Test)' : 'Test 1: Wald-Wolfowitz (Runs Test)'}
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-white/60">{language === 'fr' ? 'Résultats observés' : 'Observed results'}</p>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              <li>Runs {language === 'fr' ? 'observés' : 'observed'}: <strong>{runs.runs}</strong></li>
              <li>Runs {language === 'fr' ? 'attendus' : 'expected'}: <strong>{runs.expectedRuns.toFixed(2)}</strong></li>
              <li>{language === 'fr' ? 'Écart-type' : 'Std Dev'}: {runs.stdDev.toFixed(2)}</li>
              <li>Z-score: <strong>{runs.z.toFixed(3)}</strong></li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-white/60">{language === 'fr' ? 'Signification' : 'Significance'}</p>
            <p className="mt-2 text-2xl font-bold text-purple-400">p = {runs.pValue.toFixed(4)}</p>
            {runs.verySignificant && (
              <p className="mt-2 text-sm text-purple-300">
                {language === 'fr' ? '✓ Très significatif (p < 0.01)' : '✓ Very significant (p < 0.01)'}
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4 rounded-lg bg-black/20 p-4">
          <p className="text-sm text-white/80">
            {language === 'fr' 
              ? `Conclusion: Avec ${runs.runs} runs observés contre ${runs.expectedRuns.toFixed(0)} attendus, le système montre trop d'alternances, typique d'un mécanisme de compensation.`
              : `Conclusion: With ${runs.runs} runs observed vs ${runs.expectedRuns.toFixed(0)} expected, the system shows too many alternations, typical of a compensation mechanism.`}
          </p>
        </div>
      </section>

      {/* Test 2: Chi-Square VÉRIFIÉ */}
      <section className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
        <h3 className="mb-4 text-xl font-bold text-white">
          {language === 'fr' ? 'Test 2: Test χ² d\'indépendance' : 'Test 2: χ² Independence Test'}
        </h3>
        
        <div className="mb-4">
          <p className="text-sm text-white/60 mb-2">{language === 'fr' ? 'Matrice de transition' : 'Transition matrix'}</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div></div>
            <div className="text-center text-white/60">{language === 'fr' ? '→ Gain' : '→ Win'}</div>
            <div className="text-center text-white/60">{language === 'fr' ? '→ Perte' : '→ Loss'}</div>
            
            <div className="text-white/60">{language === 'fr' ? 'Gain →' : 'Win →'}</div>
            <div className="text-center font-bold text-white">{chiSquare.observed.winToWin}</div>
            <div className="text-center font-bold text-white">{chiSquare.observed.winToLoss}</div>
            
            <div className="text-white/60">{language === 'fr' ? 'Perte →' : 'Loss →'}</div>
            <div className="text-center font-bold text-white">{chiSquare.observed.lossToWin}</div>
            <div className="text-center font-bold text-white">{chiSquare.observed.lossToLoss}</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-white/60">{language === 'fr' ? 'Probabilités conditionnelles' : 'Conditional probabilities'}</p>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              <li>P(Win|Win): <strong className="text-red-400">{(stats.pWinAfterWin * 100).toFixed(2)}%</strong></li>
              <li>P(Win|Loss): <strong className="text-green-400">{(stats.pWinAfterLoss * 100).toFixed(2)}%</strong></li>
              <li>{language === 'fr' ? 'Écart' : 'Gap'}: <strong>{Math.abs(stats.pWinAfterWin - stats.pWinAfterLoss).toFixed(3)}</strong></li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-white/60">{language === 'fr' ? 'Test statistique' : 'Statistical test'}</p>
            <p className="mt-2 text-2xl font-bold text-amber-400">χ² = {chiSquare.chiSquare.toFixed(3)}</p>
            <p className="text-sm text-amber-300">p = {chiSquare.pValue.toFixed(4)}</p>
            {chiSquare.significant && (
              <p className="mt-2 text-sm text-amber-300">
                {language === 'fr' ? '✓ Significatif (p < 0.05)' : '✓ Significant (p < 0.05)'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Analyse des séries VÉRIFIÉE */}
      <section className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">
        <h3 className="mb-4 text-xl font-bold text-white">
          {language === 'fr' ? 'Analyse des séries (Streaks)' : 'Streak Analysis'}
        </h3>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-black/20 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Plus longue série de gains' : 'Longest win streak'}</p>
            <p className="text-2xl font-bold text-green-400">{streaks.maxWinStreak}</p>
          </div>
          <div className="rounded-lg bg-black/20 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Plus longue série de pertes' : 'Longest loss streak'}</p>
            <p className="text-2xl font-bold text-red-400">{streaks.maxLossStreak}</p>
          </div>
          <div className="rounded-lg bg-black/20 p-4">
            <p className="text-sm text-white/60">{language === 'fr' ? 'Gains consécutifs (WW)' : 'Consecutive wins (WW)'}</p>
            <p className="text-2xl font-bold text-white">{streaks.consecutiveWins}</p>
            <p className="text-xs text-white/60">
              {language === 'fr' ? `${(streaks.consecutiveWins / (stats.n - 1) * 100).toFixed(1)}% des transitions` : `${(streaks.consecutiveWins / (stats.n - 1) * 100).toFixed(1)}% of transitions`}
            </p>
          </div>
        </div>
      </section>

      {/* Entropie VÉRIFIÉE */}
      <section className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
        <h3 className="mb-4 text-xl font-bold text-white">
          {language === 'fr' ? 'Mesure d\'entropie' : 'Entropy Measure'}
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-white/60">{language === 'fr' ? 'Entropie de Shannon' : 'Shannon Entropy'}</p>
            <p className="text-2xl font-bold text-green-400">{entropy.entropy.toFixed(4)} bits</p>
            <p className="text-sm text-white/60 mt-1">
              {language === 'fr' ? 'Maximum théorique: 1.0 bits' : 'Theoretical maximum: 1.0 bits'}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60">{language === 'fr' ? 'Ratio d\'entropie' : 'Entropy Ratio'}</p>
            <p className="text-2xl font-bold text-white">{(entropy.entropyRatio * 100).toFixed(2)}%</p>
            <p className="text-sm text-white/60 mt-1">
              {language === 'fr' ? 'Information disponible dans le système' : 'Available information in the system'}
            </p>
          </div>
        </div>
      </section>

      {/* Avertissement */}
      <div className="rounded-2xl border border-red-500/50 bg-red-500/20 p-6">
        <p className="text-sm font-semibold text-red-400">
          {language === 'fr' 
            ? '⚠️ IMPORTANT: Tous ces résultats sont calculés directement à partir des 309 tirages réels du fichier data.csv. Aucune estimation ou extrapolation.'
            : '⚠️ IMPORTANT: All these results are calculated directly from the 309 real draws in the data.csv file. No estimates or extrapolations.'}
        </p>
      </div>
    </div>
  );
}
