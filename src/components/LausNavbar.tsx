import { type Lang, t } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  /** Use "light" on inner pages (e.g. news detail) so nav is visible on light background */
  variant?: 'transparent' | 'light';
}

export default function LausNavbar({ lang, onLangChange, variant = 'transparent' }: NavbarProps) {
  const tr = t(lang);
  const isLight = variant === 'light';
  const textClass = isLight ? 'text-foreground' : 'text-primary-foreground';
  const textMutedClass = isLight ? 'text-muted-foreground' : 'text-primary-foreground/90';
  const borderClass = isLight ? 'border-border' : 'border-primary-foreground/30';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isLight) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLight]);

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5',
        'transition-colors duration-300',
        isLight ? 'bg-background border-b border-border' : '',
        !isLight && scrolled ? 'bg-foreground/70 backdrop-blur-md' : '',
      ].join(' ')}
      style={!isLight && !scrolled ? { backgroundColor: 'transparent' } : undefined}
    >
      <Link to="/" className="flex items-stretch gap-1">
        <span className={`flex items-center font-heading text-2xl font-semibold tracking-wide ${textClass}`}>LAUS</span>
        <span className={`flex items-center font-body text-[10px] font-medium uppercase tracking-[0.2em] leading-tight ${isLight ? 'text-muted-foreground' : 'text-primary-foreground/80'}`}>
          Asset<br />Management
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {[
          { label: tr.nav.about, to: `/about?lang=${lang}` },
          { label: tr.nav.activities, to: `/activities?lang=${lang}` },
          { label: tr.nav.portfolio, to: `/our-portfolio?lang=${lang}` },
          { label: tr.nav.news, to: '/#news' },
          { label: tr.nav.contact, to: `/contact?lang=${lang}` },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`font-body text-sm transition-colors duration-200 hover:opacity-90 ${textMutedClass}`}
          >
            {item.label}
          </Link>
        ))}

        <div className={`flex items-center gap-1 ml-4 border-l pl-4 ${borderClass}`}>
          <button
            onClick={() => onLangChange('fr')}
            className={`font-body text-sm transition-colors duration-200 ${lang === 'fr' ? `${textClass} font-medium` : 'opacity-60'}`}
          >
            FR
          </button>
          <span className={isLight ? 'text-muted-foreground' : 'text-primary-foreground/30'}>/</span>
          <button
            onClick={() => onLangChange('en')}
            className={`font-body text-sm transition-colors duration-200 ${lang === 'en' ? `${textClass} font-medium` : 'opacity-60'}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
