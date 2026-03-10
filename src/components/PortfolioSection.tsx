import { Link } from 'react-router-dom';
import parisPortfolio from '@/assets/paris-portfolio.png';
import { type Lang, t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/Reveal';

interface PortfolioSectionProps {
  lang: Lang;
}

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const tr = t(lang);

  const stats = [
    { value: tr.portfolio.stat1, label: tr.portfolio.stat1Label },
    { value: tr.portfolio.stat2, label: tr.portfolio.stat2Label },
    { value: tr.portfolio.stat3, label: tr.portfolio.stat3Label },
  ];

  return (
    <section id="portfolio" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
      <div className="container-site">
        <div className="section-divider mb-16" />
        <Reveal>
          <h2 className="heading-display mb-16">{tr.portfolio.title}</h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <Reveal className="aspect-[4/5] md:aspect-auto">
          <img
            src={parisPortfolio}
            alt={tr.portfolio.imageAlt}
            className="w-full h-full object-cover"
          />
        </Reveal>

        <div className="bg-background flex flex-col justify-center px-8 md:px-16 py-16">
          <div className="space-y-12">
            {stats.map((stat) => (
              <Reveal key={stat.label} delayMs={80}>
                <div>
                  <p className="font-heading text-4xl font-semibold text-foreground">{stat.value}</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={140}>
            <Button variant="default" className="mt-12 w-fit" asChild>
              <Link to={`/our-portfolio?lang=${lang}`}>{tr.portfolio.cta}</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
