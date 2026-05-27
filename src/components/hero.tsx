"use client";

import { useEffect, useState } from "react";
import { useLang } from "./lang-provider";
import { RequestButton } from "./request-button";
import { PHONE_TEL } from "@/lib/contact";

const SLIDES = [
  "/hero/slide-01.jpg",
  "/hero/slide-02.jpg",
  "/hero/slide-03.jpg",
  "/hero/slide-04.jpg",
  "/hero/slide-05.jpg",
  "/hero/slide-06.jpg",
  "/hero/slide-07.jpg",
  "/hero/slide-08.jpg",
  "/hero/slide-09.jpg",
  "/hero/slide-10.jpg",
  "/hero/slide-11.jpg",
  "/hero/slide-12.jpg",
  "/hero/slide-13.jpg",
];
const SLIDE_INTERVAL = 1500;

export function Hero() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Respect reduced-motion: hold on the first image, no auto-advance.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero hero--media">
      <div className="hero-slides" aria-hidden>
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-slide${i === index ? " is-active" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
      <div className="hero-overlay" aria-hidden />

      <div className="hero-inner">
        <div className="hero-badge reveal">
          <span className="stars" aria-hidden>★★★★★</span>
          {t.hero.badge}
        </div>
        <h1 className="reveal reveal-d1">
          {t.hero.h1Line1}
          <br />
          {t.hero.h1Line2}
          <span className="accent">{t.hero.h1Line3}</span>
        </h1>
        <p className="hero-lede reveal reveal-d2">{t.hero.lede}</p>
        <div className="hero-cta-row reveal reveal-d3">
          <RequestButton label={t.hero.ctaPrimary} />
          <a href={PHONE_TEL} className="btn btn-outline">
            {t.hero.ctaSecondary}
          </a>
        </div>
        <div className="hero-note">{t.hero.note}</div>
      </div>
    </section>
  );
}
