import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroParis from '@/assets/hero-paris.png';
import heroLondon from '@/assets/hero-london.jpg';
import heroFrankfurt from '@/assets/hero-frankfurt.png';
import { type Lang, t } from '@/lib/i18n';

const slides = [
  { image: heroParis, city: 'Paris' },
  { image: heroLondon, city: 'London' },
  { image: heroFrankfurt, city: 'Frankfurt' },
];

const AUTO_ADVANCE_MS = 5000;

interface HeroSliderProps {
  lang: Lang;
}

export default function HeroSlider({ lang }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const tr = t(lang);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);
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
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.city}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
      ))}

      <div className="absolute bottom-[20%] left-8 md:left-16 max-w-2xl z-10 animate-in fade-in-0 slide-in-from-bottom-6 duration-700 font-heading">
        <h1 className="text-4xl md:text-5xl font-semibold text-primary-foreground leading-tight tracking-wide italic">
          {tr.hero.tagline}
        </h1>
        <Link
          to={`/about?lang=${lang}`}
          className="inline-block mt-8 text-sm text-primary-foreground/90 border-b border-primary-foreground/50 pb-1 hover:border-primary-foreground transition-colors duration-200 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150"
        >
          {tr.hero.cta}
        </Link>
      </div>

      {/* Manual arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-primary-foreground' : 'bg-primary-foreground/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
