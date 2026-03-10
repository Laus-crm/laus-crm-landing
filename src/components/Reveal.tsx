import { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** milliseconds */
  delayMs?: number;
  /** reveal only the first time it enters viewport */
  once?: boolean;
}

export default function Reveal({ children, className, delayMs = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const style = delayMs ? ({ transitionDelay: `${delayMs}ms` } as const) : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={[
        'will-change-transform will-change-opacity',
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

