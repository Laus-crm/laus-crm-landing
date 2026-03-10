import { type Lang, t } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  /** Use "light" on inner pages (e.g. news detail) so nav is visible on light background */
  variant?: 'transparent' | 'light';
}

const NAV_ITEMS = (tr: ReturnType<typeof t>, lang: Lang) => [
  { label: tr.nav.about, to: `/about?lang=${lang}` },
  { label: tr.nav.activities, to: `/activities?lang=${lang}` },
  { label: tr.nav.portfolio, to: `/our-portfolio?lang=${lang}` },
  { label: tr.nav.news, to: '/#news' },
  { label: tr.nav.contact, to: `/contact?lang=${lang}` },
];

export default function LausNavbar({ lang, onLangChange, variant = 'transparent' }: NavbarProps) {
  const tr = t(lang);
  const isLight = variant === 'light';
  const textClass = isLight ? 'text-foreground' : 'text-primary-foreground';
  const textMutedClass = isLight ? 'text-muted-foreground' : 'text-primary-foreground/90';
  const borderClass = isLight ? 'border-border' : 'border-primary-foreground/30';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isLight) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLight]);

  const navItems = NAV_ITEMS(tr, lang);

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-8',
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

      {/* Desktop: liens + langue */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
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

      {/* Mobile: bouton menu → Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${textClass} hover:bg-white/10`}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(320px,100vw)] flex flex-col pt-12">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="font-body text-base py-3 px-2 rounded-md text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-border flex items-center gap-2">
            <span className="font-body text-sm text-muted-foreground">Langue</span>
            <button
              onClick={() => { onLangChange('fr'); setMobileOpen(false); }}
              className={`font-body text-sm py-2 px-3 rounded-md transition-colors ${lang === 'fr' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              FR
            </button>
            <button
              onClick={() => { onLangChange('en'); setMobileOpen(false); }}
              className={`font-body text-sm py-2 px-3 rounded-md transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              EN
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
