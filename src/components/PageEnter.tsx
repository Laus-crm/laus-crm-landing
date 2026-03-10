import { useEffect, useState } from 'react';

interface PageEnterProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before starting the animation */
  delayMs?: number;
}

export default function PageEnter({ children, className = '', delayMs = 0 }: PageEnterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}
