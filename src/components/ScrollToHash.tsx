import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) {
      // Page séparée : aller en haut immédiatement, sans smooth (réservé aux ancres intrapage)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    // Lien intrapage (#section) : scroll smooth vers l’ancre
    const id = decodeURIComponent(hash.replace('#', ''));
    const el = document.getElementById(id);

    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname, location.hash]);

  return null;
}
