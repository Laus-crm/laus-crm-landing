import { type Lang, t } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  variant?: 'transparent' | 'light';
}

const NAV_ITEMS = (tr: ReturnType<typeof t>, lang: Lang) => [
  { label: tr.nav.about, to: `/about?lang=${lang}` },
  { label: tr.nav.activities, to: `/activities?lang=${lang}` },
  { label: tr.nav.portfolio, to: `/our-portfolio?lang=${lang}` },
  { label: tr.nav.news, to: `/news?lang=${lang}` },
  { label: tr.nav.contact, to: `/contact?lang=${lang}` },
];

export default function LausNavbar({ lang, onLangChange }: NavbarProps) {
  const tr = t(lang);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = NAV_ITEMS(tr, lang);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-8 bg-white border-b border-border">
      <Link to="/" className="flex items-stretch gap-1.5">
        <span className="flex items-center font-heading text-3xl font-semibold tracking-wide text-foreground">LAUS</span>
        <span className="flex items-center font-body text-xs font-medium uppercase tracking-[0.2em] leading-tight text-muted-foreground">
          Asset<br />Management
        </span>
      </Link>

      {/* Desktop: liens + langue */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="font-body text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
        <div className="flex items-center gap-1 ml-4 border-l border-border pl-4">
          <button
            onClick={() => onLangChange('fr')}
            className={`font-body text-base transition-colors duration-200 ${lang === 'fr' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
          >
            FR
          </button>
          <span className="text-muted-foreground">/</span>
          <button
            onClick={() => onLangChange('en')}
            className={`font-body text-base transition-colors duration-200 ${lang === 'en' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
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
            className="md:hidden text-foreground hover:bg-muted"
            aria-label={tr.nav.menuLabel}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(320px,100vw)] flex flex-col pt-12">
          <SheetTitle className="sr-only">{tr.nav.navigationTitle}</SheetTitle>
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
            <span className="font-body text-sm text-muted-foreground">{tr.nav.languageLabel}</span>
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
