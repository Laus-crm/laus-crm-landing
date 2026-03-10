import { type Lang, t } from '@/lib/i18n';

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export default function LausNavbar({ lang, onLangChange }: NavbarProps) {
  const tr = t(lang);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{ backgroundColor: 'transparent' }}>
      <a href="#" className="flex items-baseline gap-1">
        <span className="font-heading text-2xl font-semibold text-primary-foreground tracking-wide">LAUS</span>
        <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground/80 leading-tight">
          Asset<br />Management
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {[
          { label: tr.nav.about, href: '#about' },
          { label: tr.nav.activities, href: '#activities' },
          { label: tr.nav.portfolio, href: '#portfolio' },
          { label: tr.nav.news, href: '#news' },
          { label: tr.nav.contact, href: '#contact' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="font-body text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}

        <div className="flex items-center gap-1 ml-4 border-l border-primary-foreground/30 pl-4">
          <button
            onClick={() => onLangChange('fr')}
            className={`font-body text-sm transition-colors duration-200 ${lang === 'fr' ? 'text-primary-foreground font-medium' : 'text-primary-foreground/50'}`}
          >
            FR
          </button>
          <span className="text-primary-foreground/30">/</span>
          <button
            onClick={() => onLangChange('en')}
            className={`font-body text-sm transition-colors duration-200 ${lang === 'en' ? 'text-primary-foreground font-medium' : 'text-primary-foreground/50'}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
