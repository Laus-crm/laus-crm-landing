import { Link } from 'react-router-dom';
import { type Lang, t } from '@/lib/i18n';
import Reveal from '@/components/Reveal';

interface FooterProps {
  lang: Lang;
}

export default function LausFooter({ lang }: FooterProps) {
  const tr = t(lang);

  return (
    <footer id="contact" className="border-t border-border" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: '60px' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo */}
          <div className="md:col-span-3">
            <Reveal>
              <Link to="/" className="flex items-stretch gap-1.5 mb-8 inline-flex">
                <span className="flex items-center font-heading text-3xl font-semibold text-muted-foreground tracking-wide">LAUS</span>
                <span className="flex items-center font-body text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground leading-tight">
                  Asset<br />Management
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <Reveal delayMs={80}>
              <p className="font-heading text-lg font-semibold text-foreground mb-2">{tr.footer.address}</p>
              <p className="font-body text-sm text-muted-foreground whitespace-pre-line">{tr.footer.addressLine}</p>
            </Reveal>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <Reveal delayMs={120}>
              <p className="font-heading text-lg font-semibold text-foreground mb-2">{tr.footer.contactLabel}</p>
              <p className="font-body text-sm text-muted-foreground">
                <a href={`mailto:${tr.footer.email}`} className="text-muted-foreground hover:underline">
                  {tr.footer.email}
                </a>
              </p>
              <p className="font-body text-sm text-muted-foreground mt-1">
                <a href={`tel:${tr.footer.phone.replace(/\s/g, '').replace('(0)', '')}`} className="hover:text-primary transition-colors">
                  {tr.footer.phone}
                </a>
              </p>
            </Reveal>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <Reveal delayMs={140}>
              <p className="font-heading text-lg font-semibold text-foreground mb-2">{tr.footer.legalMentions}</p>
              <Link to={`/legal?lang=${lang}`} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                {tr.footer.viewLegal}
              </Link>
            </Reveal>
          </div>

          {/* Social */}
          <div className="md:col-span-1 flex items-start justify-end">
            <Reveal delayMs={160}>
              <a
                href="https://www.linkedin.com/company/laus-asset-management/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <Reveal delayMs={80}>
          <div className="font-body text-xs text-muted-foreground space-y-2">
            <p>© {new Date().getFullYear()} LAUS Asset Management. {tr.footer.copyright}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <Link to={`/legal?lang=${lang}`} className="hover:text-foreground transition-colors">
                {tr.footer.legalMentions}
              </Link>
              <span>·</span>
              <Link to={`/legal?lang=${lang}#regulatory`} className="hover:text-foreground transition-colors">
                {tr.footer.regulatoryInfo}
              </Link>
              <span>·</span>
              <Link to={`/legal?lang=${lang}#data-protection`} className="hover:text-foreground transition-colors">
                {tr.footer.dataProtection}
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
