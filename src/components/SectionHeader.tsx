interface SectionHeaderProps {
  kicker: string;
  title: string;
  tagline: string;
}

export function SectionHeader({ kicker, title, tagline }: SectionHeaderProps) {
  return (
    <div className="slide-head">
      <div>
        <div className="slide-kicker">{kicker}</div>
        <h1 className="slide-title">{title}</h1>
        <div className="slide-bar" />
      </div>
      <p className="slide-tagline">{tagline}</p>
    </div>
  );
}
