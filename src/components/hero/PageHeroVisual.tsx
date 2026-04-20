import type { HeroVisualLine } from "../../app-data";

type PageHeroVisualProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  lines: HeroVisualLine[];
  className?: string;
};

export function PageHeroVisual({ image, alt, eyebrow, title, lines, className }: PageHeroVisualProps) {
  return (
    <figure className={`hero-visual${className ? ` ${className}` : ""}`}>
      <img src={image} alt={alt} className="hero-visual__image" />
      <figcaption className="hero-visual__caption">
        <div className="hero-visual__heading">
          <span>{eyebrow}</span>
          <strong>{title}</strong>
        </div>
        <dl className="hero-visual__lines" aria-label={title}>
          {lines.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}
