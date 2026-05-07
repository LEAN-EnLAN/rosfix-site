type ImageStatementSectionProps = {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  image: string;
  align?: "left" | "right";
};

export function ImageStatementSection({
  ariaLabel,
  eyebrow,
  title,
  image,
  align = "right",
}: ImageStatementSectionProps) {
  return (
    <section className={`breathing-section breathing-section--${align}`} aria-label={ariaLabel}>
      <div className="breathing-section__media" aria-hidden="true">
        {/* Background layer used for editorial blur + vignette. Keep the <img> for accessibility/fallbacks. */}
        <div
          className="breathing-section__bg"
          style={{ backgroundImage: `url(${image})` }}
        />
        <img src={image} alt="" />
      </div>
      <div className="breathing-section__copy shell">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>
    </section>
  );
}
