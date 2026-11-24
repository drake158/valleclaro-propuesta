interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  pagesLabel: string;
}

export function SectionHeader({ eyebrow, title, description, pagesLabel }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-top">
        <span className="section-eyebrow">{eyebrow}</span>
        <span className="section-page-tag">{pagesLabel}</span>
      </div>
      <h1 className="section-h1">{title}</h1>
      <div className="section-cyan-bar" />
      <p className="section-desc">{description}</p>
    </div>
  );
}
