interface RTPProgressBarProps {
  rtp: number;
  label?: string;
  showPercentage?: boolean;
  height?: string;
}

export function RTPProgressBar({
  rtp,
  label,
  showPercentage = true,
  height = "h-8"
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
          {showPercentage && (
            <span className="font-semibold text-white">{rtp.toFixed(2)}%</span>
          )}
        </div>
      )}
      <div className={`relative w-full rounded-full ${bgColorClass} ${height} overflow-hidden`}>
        <div
          className={`${height} ${colorClass} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
        {/* Standard markers */}
        <div className="absolute inset-y-0 left-[90%] w-0.5 bg-white/30" />
        <div className="absolute inset-y-0 left-[95%] w-0.5 bg-white/30" />
      </div>
      <div className="mt-1 flex justify-between text-xs text-white/50">
        <span>0%</span>
        <span>90-95%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
