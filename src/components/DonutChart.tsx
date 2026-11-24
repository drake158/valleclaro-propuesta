interface DonutSlice {
  label: string;
  value: number;
  color: string;
  detail?: string;
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
  size = 186,
  selectedIndex = null,
  onSelect,
}: DonutChartProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = 66;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox="0 0 180 180" style={{ flexShrink: 0 }}>
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#e6eef7" strokeWidth="22" />
        {slices.map((s, idx) => {
          const frac = s.value / total;
          const dashLen = frac * circumference;
          const dashOffset = -cumulative * circumference;
          cumulative += frac;
          const isSelected = selectedIndex === idx;
          return (
            <circle
              key={s.label}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={isSelected ? 26 : 22}
              strokeDasharray={`${Math.max(0, dashLen - 1.5)} ${circumference}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 90 90)"
              style={{ cursor: onSelect ? 'pointer' : 'default', transition: 'stroke-width 0.16s ease' }}
              onClick={() => onSelect?.(idx)}
            />
          );
        })}
        <text
          x="90"
          y="85"
          textAnchor="middle"
          fill="#0f2d6b"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="18"
        >
          {centerValue}
        </text>
        <text
          x="90"
          y="104"
          textAnchor="middle"
          fill="#64748b"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="10.5"
        >
          {centerLabel}
        </text>
      </svg>

      <div style={{ flex: 1, minWidth: 165, display: 'grid', gap: 6 }}>
        {slices.map((s, idx) => {
          const pct = ((s.value / total) * 100).toFixed(0);
          const isSelected = selectedIndex === idx;
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
                padding: '5px 8px',
                borderRadius: 8,
                border: isSelected ? `1.5px solid ${s.color}` : '1px solid transparent',
                background: isSelected ? '#f1f7fe' : 'transparent',
                cursor: onSelect ? 'pointer' : 'default',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                {s.label}
              </span>
              <span className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)' }}>
                {pct}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
