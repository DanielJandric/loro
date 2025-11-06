'use client';

interface TestCardProps {
  title: string;
  description: string;
  result: string;
  detail: string;
  pValue?: string;
  statistic?: string;
  status: 'passed' | 'failed' | 'critical';
  iconType?: 'ljungbox' | 'spectral' | 'cusum' | 'markov' | 'mutualinfo' | 'anderson' | 'kmeans' | 'randomforest' | 'lstm' | 'rtp' | 'streaks' | 'bailey' | 'diehard' | 'var' | 'fisher' | 'bayesian';
}

export function TestCard({
  title,
  description,
  result,
  detail,
  pValue,
  statistic,
  status,
  iconType,
}: TestCardProps) {
  const getIcon = () => {
    const iconClass = "w-6 h-6";
    
    switch (iconType) {
      case 'ljungbox':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
            <rect x="12" y="12" width="6" height="6" />
          </svg>
        );
      case 'spectral':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s2-7 10-7 10 7 10 7-2 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v20M2 12h20" strokeDasharray="2 2" />
          </svg>
        );
      case 'cusum':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-8 4 12 4-9" />
            <circle cx="7" cy="16" r="1" fill="currentColor" />
            <circle cx="11" cy="8" r="1" fill="currentColor" />
            <circle cx="15" cy="20" r="1" fill="currentColor" />
          </svg>
        );
      case 'markov':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="8" cy="8" r="3" />
            <circle cx="16" cy="8" r="3" />
            <circle cx="12" cy="16" r="3" />
            <path d="M11 11l-2 2M13 11l2 2M8 11v5M16 11v5" />
          </svg>
        );
      case 'mutualinfo':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="12" r="7" />
            <circle cx="15" cy="12" r="7" />
            <path d="M12 7v10M9 12h6" />
          </svg>
        );
      case 'anderson':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
            <path d="M12 6v6l4 4" />
          </svg>
        );
      case 'kmeans':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="6" r="2" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="8" cy="12" r="5" strokeDasharray="2 2" />
            <circle cx="16" cy="12" r="5" strokeDasharray="2 2" />
          </svg>
        );
      case 'randomforest':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22v-6M12 16l-4 4M12 16l4 4M12 16v-6M8 10l4-4 4 4" />
            <circle cx="12" cy="6" r="2" />
            <circle cx="8" cy="10" r="2" />
            <circle cx="16" cy="10" r="2" />
          </svg>
        );
      case 'lstm':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="8" width="6" height="8" rx="1" />
            <rect x="9" y="8" width="6" height="8" rx="1" />
            <rect x="15" y="8" width="6" height="8" rx="1" />
            <path d="M6 8V6M12 8V6M18 8V6M6 16v2M12 16v2M18 16v2" />
          </svg>
        );
      case 'rtp':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 8h10M7 12h6M7 16h8" />
          </svg>
        );
      case 'streaks':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12h4M12 12h4M20 12h0M8 12a2 2 0 104 0M16 12a2 2 0 104 0" />
          </svg>
        );
      case 'bailey':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18M3 10h18M3 7l9-4 9 4M8 10v11M16 10v11M12 10v11" />
          </svg>
        );
      case 'diehard':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="5" width="14" height="14" rx="2" />
            <circle cx="9" cy="9" r="1" fill="currentColor" />
            <circle cx="15" cy="9" r="1" fill="currentColor" />
            <circle cx="9" cy="15" r="1" fill="currentColor" />
            <circle cx="15" cy="15" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        );
      case 'var':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        );
      case 'fisher':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3L2 9l10 6 10-6z" />
            <path d="M2 17l10 6 10-6M2 12l10 6 10-6" />
          </svg>
        );
      case 'bayesian':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M12 3v18M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
          </svg>
        );
    }
  };

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
              <span className="text-white/80">{getIcon()}</span>
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
