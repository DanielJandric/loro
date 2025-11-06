import { ConditionalProbs } from '@/lib/dataParser';

interface ConditionalProbChartProps {
  probs: ConditionalProbs;
  language: 'fr' | 'en';
}

export function ConditionalProbChart({ probs, language }: ConditionalProbChartProps) {
  const chartWidth = 600;
  const chartHeight = 400;
  const leftMargin = 80;
  const rightMargin = 40;
  const topMargin = 60;
  const bottomMargin = 80;

  const graphWidth = chartWidth - leftMargin - rightMargin;
  const graphHeight = chartHeight - topMargin - bottomMargin;

  const maxValue = 50;
  const barWidth = 80;
  const spacing = 120;

  const data = [
    {
      label: language === 'fr' ? 'P(Gain|Gain)' : 'P(Win|Win)',
      value: probs.pWinAfterWin,
      color: '#ef4444',
      x: leftMargin + spacing,
    },
    {
      label: language === 'fr' ? 'P(Gain|Perte)' : 'P(Win|Loss)',
      value: probs.pWinAfterLoss,
      color: '#10b981',
      x: leftMargin + spacing * 2 + barWidth,
    },
    {
      label: language === 'fr' ? 'Attendu' : 'Expected',
      value: probs.globalWinRate,
      color: '#6b7280',
      x: leftMargin + spacing * 3 + barWidth * 2,
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg width={chartWidth} height={chartHeight} className="font-sans">
        <defs>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4b5563" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Title */}
        <text x={chartWidth / 2} y={30} textAnchor="middle" className="text-base font-semibold fill-white">
          {language === 'fr' ? 'Probabilités Conditionnelles' : 'Conditional Probabilities'}
        </text>

        {/* Y-axis */}
        <line
          x1={leftMargin}
          y1={topMargin}
          x2={leftMargin}
          y2={topMargin + graphHeight}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
        />

        {/* X-axis */}
        <line
          x1={leftMargin}
          y1={topMargin + graphHeight}
          x2={chartWidth - rightMargin}
          y2={topMargin + graphHeight}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
        />

        {/* Y-axis labels and gridlines */}
        {[0, 10, 20, 30, 40, 50].map(value => {
          const y = topMargin + graphHeight - (value / maxValue) * graphHeight;
          return (
            <g key={value}>
              <line
                x1={leftMargin}
                y1={y}
                x2={chartWidth - rightMargin}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <text
                x={leftMargin - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-white/60"
              >
                {value}%
              </text>
            </g>
          );
        })}

        {/* Y-axis label */}
        <text
          x={20}
          y={topMargin + graphHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90, 20, ${topMargin + graphHeight / 2})`}
          className="text-sm fill-white/80"
        >
          {language === 'fr' ? 'Probabilité (%)' : 'Probability (%)'}
        </text>

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * graphHeight;
          const y = topMargin + graphHeight - barHeight;

          const gradientId = index === 0 ? 'redGrad' : index === 1 ? 'greenGrad' : 'grayGrad';

          return (
            <g key={item.label}>
              {/* Bar */}
              <rect
                x={item.x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#${gradientId})`}
                stroke={item.color}
                strokeWidth="2"
                rx="4"
              />

              {/* Value on top */}
              <text
                x={item.x + barWidth / 2}
                y={y - 10}
                textAnchor="middle"
                className="text-sm font-bold fill-white"
              >
                {item.value.toFixed(2)}%
              </text>

              {/* Label */}
              <text
                x={item.x + barWidth / 2}
                y={topMargin + graphHeight + 25}
                textAnchor="middle"
                className="text-sm fill-white"
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Gap indicator */}
        <g>
          <line
            x1={data[0].x + barWidth / 2}
            y1={topMargin + graphHeight - (probs.pWinAfterWin / maxValue) * graphHeight}
            x2={data[1].x + barWidth / 2}
            y2={topMargin + graphHeight - (probs.pWinAfterLoss / maxValue) * graphHeight}
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />
          <text
            x={(data[0].x + data[1].x + barWidth) / 2}
            y={topMargin + graphHeight - ((probs.pWinAfterWin + probs.pWinAfterLoss) / 2 / maxValue) * graphHeight - 10}
            textAnchor="middle"
            className="text-xs font-semibold fill-amber-300"
          >
            {language === 'fr' ? `Écart: ${probs.gap.toFixed(2)} pts` : `Gap: ${probs.gap.toFixed(2)} pts`}
          </text>
        </g>
      </svg>
    </div>
  );
}
