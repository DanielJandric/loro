interface RTPProgressBarProps {
  rtp: number;
  label?: string;
  showPercentage?: boolean;
  height?: string;
  language?: 'fr' | 'en';
}

export function RTPProgressBar({
  rtp,
  label,
  showPercentage = true,
  height = "h-8",
  language = 'fr'
}: RTPProgressBarProps) {
  const percentage = Math.min(Math.max(rtp, 0), 100);

  let colorClass = 'bg-red-500';
  let bgColorClass = 'bg-red-500/20';

  if (rtp >= 90) {
    colorClass = 'bg-emerald-500';
    bgColorClass = 'bg-emerald-500/20';
  } else if (rtp >= 70) {
    colorClass = 'bg-amber-500';
    bgColorClass = 'bg-amber-500/20';
  }

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-white/80">{label}</span>
        </div>
      )}
      <div className={`relative w-full rounded-full bg-gray-700/50 ${height} overflow-hidden`}>
        {/* Barre de progression */}
        <div
          className={`${height} ${colorClass} rounded-full transition-all duration-300 relative`}
          style={{ width: `${percentage}%` }}
        >
          {/* Affichage du pourcentage dans la barre */}
          {showPercentage && percentage > 10 && (
            <div className="absolute inset-0 flex items-center justify-end pr-3">
              <span className="text-sm font-bold text-white drop-shadow-lg">
                {rtp.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        
        {/* Zone standard de l'industrie */}
        <div className="absolute inset-y-0 left-[90%] right-[5%] bg-green-500/20 border-l-2 border-r-2 border-green-500/50">
          <div className="absolute -top-6 left-0 text-xs text-green-400 whitespace-nowrap">
            {language === 'fr' ? 'Standard industrie' : 'Industry standard'}
          </div>
        </div>
        
        {/* Indicateur de position si le pourcentage est trop petit pour être dans la barre */}
        {showPercentage && percentage <= 10 && (
          <div 
            className="absolute top-0 bottom-0 flex items-center"
            style={{ left: `${percentage}%` }}
          >
            <span className="absolute -top-6 text-sm font-bold text-red-400 whitespace-nowrap">
              {rtp.toFixed(1)}%
            </span>
          </div>
        )}
      </div>
      
      {/* Échelle en dessous */}
      <div className="mt-2 relative">
        <div className="flex justify-between text-xs text-white/50">
          <span>0%</span>
          <span>50%</span>
          <span className="text-green-400">90-95%</span>
          <span>100%</span>
        </div>
        
        {/* Indicateur de votre position */}
        <div 
          className="absolute -bottom-5 flex flex-col items-center"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-500"></div>
          <span className="text-xs text-red-400 font-semibold whitespace-nowrap">
            {language === 'fr' ? 'Votre RTP' : 'Your RTP'}
          </span>
        </div>
      </div>
    </div>
  );
}