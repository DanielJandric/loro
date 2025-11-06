'use client';

interface TestCardProps {
  title: string;
  description: string;
  result: string;
  detail: string;
  pValue?: string;
  statistic?: string;
  status: 'passed' | 'failed' | 'critical';
  icon?: string;
}

export function TestCard({
  title,
  description,
  result,
  detail,
  pValue,
  statistic,
  status,
  icon = '📊',
}: TestCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'critical':
        return 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/10 ring-2 ring-red-500/20';
      case 'failed':
        return 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-600/10';
      case 'passed':
        return 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-green-600/10';
      default:
        return 'border-white/20 bg-white/10';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center rounded-full bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-400 ring-1 ring-inset ring-red-500/30">
            p &lt; 0.001
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/30">
            p &lt; 0.05
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${getStatusStyles()}`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="mt-2 text-sm text-white/70">{description}</p>
          </div>
          {getStatusBadge()}
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg bg-black/20 p-3">
            <p className="text-sm font-semibold text-white">{result}</p>
            <p className="mt-1 text-xs text-white/60">{detail}</p>
          </div>

          {(pValue || statistic) && (
            <div className="flex gap-4 text-xs">
              {statistic && (
                <div>
                  <span className="text-white/50">Statistique:</span>
                  <span className="ml-1 font-mono text-white/80">{statistic}</span>
                </div>
              )}
              {pValue && (
                <div>
                  <span className="text-white/50">p-value:</span>
                  <span className="ml-1 font-mono text-white/80">{pValue}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Animated gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
      </div>
    </article>
  );
}
