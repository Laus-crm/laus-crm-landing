import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const id = decodeURIComponent(hash.replace('#', ''));
    const el = document.getElementById(id);

    if (!el) return;

    // Use instant scroll (no smooth)
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [location.pathname, location.hash]);

  return null;
}
