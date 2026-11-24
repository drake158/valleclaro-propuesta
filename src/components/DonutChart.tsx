interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  slices: DonutSlice[];
  centerValue: string;
  centerLabel: string;
  size?: number;
  selectedIndex?: number | null;
  onSelect?: (idx: number) => void;
}

export function DonutChart({
  slices,
  centerValue,
  centerLabel,
  size = 152,
  selectedIndex = null,
  onSelect,
}: DonutChartProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg width={size} height={size} viewBox="0 0 176 176" style={{ flexShrink: 0 }}>
        <circle cx="88" cy="88" r={radius} fill="none" stroke="#e8eef7" strokeWidth="18" />
        {slices.map((s, idx) => {
          const frac = s.value / total;
          const dashLen = frac * circumference;
          const dashOffset = -cumulative * circumference;
          cumulative += frac;
          const isSel = selectedIndex === idx;
          return (
            <circle
              key={s.label}
              cx="88"
              cy="88"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={isSel ? 22 : 18}
              strokeDasharray={`${Math.max(0, dashLen - 1.5)} ${circumference}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 88 88)"
              style={{ cursor: onSelect ? 'pointer' : 'default', transition: 'stroke-width 0.14s ease' }}
              onClick={() => onSelect?.(idx)}
            />
          );
        })}
        <text x="88" y="84" textAnchor="middle" fill="#0f2d6b" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="500" fontSize="18">
          {centerValue}
        </text>
        <text x="88" y="102" textAnchor="middle" fill="#6c7c93" fontFamily="'Inter', sans-serif" fontWeight="400" fontSize="10.5">
          {centerLabel}
        </text>
      </svg>

      <div style={{ flex: 1, display: 'grid', gap: 5 }}>
        {slices.map((s, idx) => {
          const pct = Math.round((s.value / total) * 100);
          const isSel = selectedIndex === idx;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => onSelect?.(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '3px 6px',
                border: isSel ? `1px solid ${s.color}` : '1px solid transparent',
                background: isSel ? '#f2f6fc' : 'transparent',
                cursor: onSelect ? 'pointer' : 'default',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--ink-mid)' }}>
                <span style={{ width: 8, height: 8, background: s.color, flexShrink: 0 }} />
                {s.label}
              </span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                {pct}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
