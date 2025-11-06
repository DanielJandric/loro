interface IconProps {
  className?: string;
}

export function PyramidIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L2 20H22L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" fill="currentColor" fillOpacity="0.1"/>
      <path d="M12 3L7 12H17L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M7 12L2 20H12L7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M17 12L12 20H22L17 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  );
}

export function PirateIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M5 11V15L8 13L5 11Z" fill="currentColor"/>
      <path d="M19 11V15L16 13L19 11Z" fill="currentColor"/>
      <circle cx="12" cy="15" r="2" fill="currentColor"/>
      <rect x="9" y="6" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
      <path d="M7 11H17" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export function CardIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <rect x="13" y="10" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M7 7H8M7 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 13H17M16 16H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function DiceIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>
      <rect x="12" y="12" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <circle cx="14.5" cy="14.5" r="0.8" fill="currentColor"/>
      <circle cx="18.5" cy="14.5" r="0.8" fill="currentColor"/>
      <circle cx="14.5" cy="18.5" r="0.8" fill="currentColor"/>
      <circle cx="18.5" cy="18.5" r="0.8" fill="currentColor"/>
    </svg>
  );
}

export function TicketIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8H20V18H4V8Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M4 8V6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V8" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 11H16M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="13" r="0.5" fill="currentColor"/>
      <circle cx="18" cy="13" r="0.5" fill="currentColor"/>
    </svg>
  );
}

export function ScratchCardIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M8 10H16M8 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 14L16 16M16 14L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TrophyIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C14.2091 15 16 13.2091 16 11V5H8V11C8 13.2091 9.79086 15 12 15Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M7 5H5C4.44772 5 4 5.44772 4 6V8C4 9.10457 4.89543 10 6 10H7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17 5H19C19.5523 5 20 5.44772 20 6V8C20 9.10457 19.1046 10 18 10H17" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 15V18M9 18H15M9 18V20H15V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CoinsIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="15" cy="15" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function GenericGameIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function getGameIcon(gameName: string): React.ComponentType<IconProps> {
  const lowerName = gameName.toLowerCase();

  if (lowerName.includes('pyramide') || lowerName.includes('pyramid')) {
    return PyramidIcon;
  }
  if (lowerName.includes('pirate') || lowerName.includes('trésor')) {
    return PirateIcon;
  }
  if (lowerName.includes('black jack') || lowerName.includes('blackjack')) {
    return CardIcon;
  }
  if (lowerName.includes('tribolo')) {
    return DiceIcon;
  }
  if (lowerName.includes('rento') || lowerName.includes('surprises')) {
    return TicketIcon;
  }
  if (lowerName.includes('carton')) {
    return ScratchCardIcon;
  }
  if (lowerName.includes('podium')) {
    return TrophyIcon;
  }
  if (lowerName.includes('lingots') || lowerName.includes('colors')) {
    return CoinsIcon;
  }

  return GenericGameIcon;
}
