import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type Lang, t } from '@/lib/i18n';

const base = import.meta.env.BASE_URL;
const slides = [
  { image: `${base}hero/hero-paris.png`, city: 'Paris' },
  { image: `${base}hero/hero-london.png`, city: 'London' },
  { image: `${base}hero/hero-frankfurt.png`, city: 'Frankfurt' },
];

const AUTO_ADVANCE_MS = 9000;

interface HeroSliderProps {
  lang: Lang;
}

export default function HeroSlider({ lang }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const tr = t(lang);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.city}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.city}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
      ))}

      <div className="absolute bottom-[20%] left-8 md:left-16 max-w-3xl z-10 animate-in fade-in-0 slide-in-from-bottom-6 duration-700 font-body">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary-foreground leading-tight tracking-wide">
          {tr.hero.tagline}
        </h1>
        <Link
          to={`/about?lang=${lang}`}
          className="inline-block mt-8 text-sm text-primary-foreground/90 border-b border-primary-foreground/50 pb-1 hover:border-primary-foreground transition-colors duration-200 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150"
        >
          {tr.hero.cta}
        </Link>
      </div>
    </section>
  );
}
