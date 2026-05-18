"use client";

import { useLang } from "./lang-provider";
import { AREAS_BY_COUNTY } from "@/lib/content";

export function Areas() {
  const { t, lang } = useLang();
  return (
    <section className="block areas" id="areas">
      <div className="block-inner">
        <div className="block-eyebrow reveal">{t.areas.eyebrow}</div>
        <h2 className="block-h2 reveal reveal-d1">
          {t.areas.head} <em>{t.areas.headItalic}</em>
        </h2>
        <p className="block-sub reveal reveal-d2">{t.areas.intro}</p>

        <div className="areas-grid">
          {AREAS_BY_COUNTY.map((c, i) => (
            <div key={c.county} className={`county-card reveal${i > 0 ? " reveal-d" + Math.min(i, 3) : ""}`}>
              <h3>{lang === "es" ? c.countyEs : c.county}</h3>
              <div className="county-meta">
                {c.cities.length} {lang === "es" ? "ciudades" : "cities"}
              </div>
              <ul>
                {c.cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="areas-fallback">{t.areas.fallback}</p>
      </div>
    </section>
  );
}
