import { Check } from "lucide-react";

import { featuredLines } from "../../app-data";

export function FeatureRibbon() {
  return (
    <section className="shell proof-ribbon">
      {featuredLines.map((item) => (
        <div key={item}>
          <Check size={14} />
          <span>{item}</span>
        </div>
      ))}
    </section>
  );
}
