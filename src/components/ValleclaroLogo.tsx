interface ValleclaroLogoProps {
  compact?: boolean;
}

export function ValleclaroLogo({ compact = false }: ValleclaroLogoProps) {
  const height = compact ? 30 : 48;
  return (
    <svg
      height={height}
      viewBox="0 0 290 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Valleclaro Comercial"
    >
      {/* Left arm of V (Royal Blue gradient) */}
      <defs>
        <linearGradient id="vcBlueLeft" x1="10" y1="10" x2="48" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1668C1" />
          <stop offset="100%" stopColor="#0A2B66" />
        </linearGradient>
        <linearGradient id="vcBlueRight" x1="78" y1="16" x2="42" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0C428A" />
          <stop offset="100%" stopColor="#071E4A" />
        </linearGradient>
        <linearGradient id="vcAmber" x1="18" y1="62" x2="88" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EB6E13" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      {/* Stylized V mark */}
      <path d="M12 14H31L46 47L36 62L12 14Z" fill="url(#vcBlueLeft)" />
      <path d="M44 45L64 18H82L51 64C48.5 67 43.5 67 41 64L36 56L44 45Z" fill="url(#vcBlueRight)" />
      {/* Dynamic amber-gold swoosh matching PDF cover */}
      <path
        d="M20 62C12 58 24 44 46 31C65 20 82 14 86 22C88 26 83 31 79 34C81 26 74 22 57 29C37 38 22 52 29 59C26 62 22 63 20 62Z"
        fill="url(#vcAmber)"
      />

      {/* Wordmark */}
      <text
        x="98"
        y="44"
        fill="#08254F"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="-0.8"
      >
        Valleclaro
      </text>

      {/* Flanking gold lines + Comercial */}
      <line x1="100" y1="60" x2="128" y2="60" stroke="#F2991D" strokeWidth="2.4" strokeLinecap="round" />
      <text
        x="186"
        y="65"
        textAnchor="middle"
        fill="#0D2448"
        fontFamily="'Inter', sans-serif"
        fontWeight="600"
        fontSize="14.5"
        letterSpacing="3.4"
      >
        Comercial
      </text>
      <line x1="244" y1="60" x2="274" y2="60" stroke="#F2991D" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
