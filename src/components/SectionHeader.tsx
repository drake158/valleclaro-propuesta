interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ kicker, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="s-head">
      <div>
        <div className="s-kicker">{kicker}</div>
        <h1 className="s-title">{title}</h1>
      </div>
      {subtitle && <p className="s-sub">{subtitle}</p>}
    </div>
  );
}
