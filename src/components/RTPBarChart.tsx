import { GameStats } from '@/lib/dataParser';
import { getGameIcon } from './GameIcons';

interface RTPBarChartProps {
  gameStats: GameStats[];
  language: 'fr' | 'en';
}

export function RTPBarChart({ gameStats, language }: RTPBarChartProps) {
  const sortedStats = [...gameStats].sort((a, b) => b.rtp - a.rtp);

  const maxRTP = 100;
  const standardMinRTP = 70;
  const chartHeight = 400;
  const barHeight = 30;
  const spacing = 10;
  const leftMargin = 180;
  const rightMargin = 80;
  const topMargin = 40;
  const bottomMargin = 20;

  const chartWidth = 800;
  const graphWidth = chartWidth - leftMargin - rightMargin;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={chartWidth}
        height={topMargin + sortedStats.length * (barHeight + spacing) + bottomMargin}
        className="font-sans"
      >
        <defs>
          <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="mediumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="badGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Title */}
        <text x={chartWidth / 2} y={20} textAnchor="middle" className="text-sm font-semibold fill-white">
          {language === 'fr' ? 'RTP par Jeu (Return to Player %)' : 'RTP by Game (Return to Player %)'}
        </text>

        {/* Standard RTP zone indicator */}
        <rect
          x={leftMargin + (standardMinRTP / maxRTP) * graphWidth}
          y={topMargin}
          width={(1 / maxRTP) * graphWidth}
          height={sortedStats.length * (barHeight + spacing) - spacing}
          fill="rgba(16, 185, 129, 0.1)"
          stroke="rgba(16, 185, 129, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 2"
        />
        <text
          x={leftMargin + (70 / maxRTP) * graphWidth}
          y={topMargin - 5}
          textAnchor="middle"
          className="text-xs fill-emerald-300"
        >
          {language === 'fr' ? 'Standard 70%' : 'Standard 70%'}
        </text>

        {/* Bars */}
        {sortedStats.map((stat, index) => {
          const y = topMargin + index * (barHeight + spacing);
          const barWidth = (stat.rtp / maxRTP) * graphWidth;

          let fillColor = 'url(#badGradient)';
          if (stat.rtp >= 70) {
            fillColor = 'url(#goodGradient)';
          }

          return (
            <g key={stat.game}>
              {/* Game name */}
              <text
                x={leftMargin - 10}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                className="text-sm fill-white"
              >
                {stat.game}
              </text>

              {/* Bar background */}
              <rect
                x={leftMargin}
                y={y}
                width={graphWidth}
                height={barHeight}
                fill="rgba(255, 255, 255, 0.05)"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                rx="4"
              />

              {/* Bar */}
              <rect
                x={leftMargin}
                y={y}
                width={Math.max(barWidth, 2)}
                height={barHeight}
                fill={fillColor}
                rx="4"
              />

              {/* RTP value */}
              <text
                x={leftMargin + graphWidth + 10}
                y={y + barHeight / 2 + 4}
                className="text-sm font-semibold fill-white"
              >
                {stat.rtp.toFixed(1)}%
              </text>

              {/* Ticket count */}
              <text
                x={leftMargin + graphWidth + 50}
                y={y + barHeight / 2 + 4}
                className="text-xs fill-white/60"
              >
                (n={stat.count})
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {[0, 25, 50, 75, 100].map(value => (
          <g key={value}>
            <line
              x1={leftMargin + (value / maxRTP) * graphWidth}
              y1={topMargin}
              x2={leftMargin + (value / maxRTP) * graphWidth}
              y2={topMargin + sortedStats.length * (barHeight + spacing) - spacing}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <text
              x={leftMargin + (value / maxRTP) * graphWidth}
              y={topMargin + sortedStats.length * (barHeight + spacing) + 15}
              textAnchor="middle"
              className="text-xs fill-white/60"
            >
              {value}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
