import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import { useState } from 'react';
import parisPortfolio from '@/assets/paris-portfolio.png';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID ?? 'mqeyqgdd';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const tr = t(lang);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      setSubmitStatus('error');
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Section avec image qui remonte jusqu'au header */}
      <section className="relative flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${parisPortfolio})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" aria-hidden />
        <div className="relative z-10">
          <LausNavbar lang={lang} onLangChange={setLang} variant="light" />
        </div>
        <div className="relative z-10 w-full container-site pt-32 pb-20 md:pt-40 md:pb-28">
          <Link
            to="/"
            className="font-body text-sm text-muted-foreground hover:text-foreground mb-10 inline-block"
          >
            ← {tr.legal.backToHome}
          </Link>
          <Reveal>
            <h1 className="heading-display mb-8 text-center">{tr.contact.city}</h1>
          </Reveal>
          <PageEnter>
            <div className="max-w-md mx-auto mb-12 md:mb-16 text-center">
              <div className="font-body text-base text-foreground leading-relaxed whitespace-pre-line">
                {tr.contact.addressLine}
              </div>
              <Reveal delayMs={160}>
                <p className="font-body text-base text-foreground mt-4">
                  <a href={`tel:${tr.contact.phone.replace(/\s/g, '').replace('(0)', '')}`} className="hover:text-primary transition-colors">
                    {tr.contact.phone}
                  </a>
                </p>
              </Reveal>
              <Reveal delayMs={200}>
                <p className="font-body text-base text-foreground mt-1">
                  <a href={`mailto:${tr.contact.email}`} className="text-foreground hover:underline">
                    {tr.contact.email}
                  </a>
                </p>
              </Reveal>
            </div>
          </PageEnter>

          {/* Formulaire de contact (sur l'image) */}
          <div className="max-w-lg mx-auto">
          <Reveal>
            <h2 className="heading-section text-center mb-10 text-2xl md:text-3xl">
              {tr.contact.formTitle}
            </h2>
          </Reveal>
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 border border-border bg-primary/5 text-primary font-body text-sm text-center">
              {tr.contact.successMessage}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 border border-border bg-destructive/5 text-destructive font-body text-sm text-center">
              {tr.contact.errorMessage}
            </div>
          )}
          {!FORMSPREE_URL ? (
            <p className="font-body text-sm text-muted-foreground text-center">
              Configurez <code className="text-foreground">VITE_FORMSPREE_FORM_ID</code> dans votre fichier <code className="text-foreground">.env</code> pour activer le formulaire (créez un formulaire sur formspree.io).
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-body">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="font-body text-sm text-muted-foreground">
                    {tr.contact.firstName}
                  </Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    placeholder={tr.contact.firstName}
                    className="font-body rounded-none border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="font-body text-sm text-muted-foreground">
                    {tr.contact.lastName}
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    placeholder={tr.contact.lastName}
                    className="font-body rounded-none border-border focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body text-sm text-muted-foreground">
                  {tr.contact.emailField}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={tr.contact.emailField}
                  className="font-body rounded-none border-border focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="font-body text-sm text-muted-foreground">
                  {tr.contact.position}
                </Label>
                <Input
                  id="position"
                  name="position"
                  type="text"
                  placeholder={tr.contact.position}
                  className="font-body rounded-none border-border focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-body text-sm text-muted-foreground">
                  {tr.contact.message}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={tr.contact.message}
                  className="font-body resize-y rounded-none border-border focus-visible:ring-primary min-h-[120px]"
                />
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="font-body w-full sm:w-auto"
                >
                  {submitStatus === 'sending' ? tr.contact.sending : tr.contact.submit}
                </Button>
              </div>
            </form>
          )}
          </div>
        </div>
      </section>

      <LausFooter lang={lang} />
    </div>
  );
};

export default Contact;
