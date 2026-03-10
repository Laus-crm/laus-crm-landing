import { useEffect, useRef, useState } from 'react';
import CountUpStat from '@/components/CountUpStat';

/** Parses "€300 million" into prefix, number, suffix for placeholder */
function parsePlaceholder(value: string): { prefix: string; suffix: string } {
  const match = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!match) return { prefix: value, suffix: '' };
  return { prefix: match[1], suffix: match[3] };
}

interface CountUpWhenVisibleProps {
  value: string;
  className?: string;
}

export default function CountUpWhenVisible({ value, className = '' }: CountUpWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { prefix, suffix } = parsePlaceholder(value);

  return (
    <div ref={ref}>
      {visible ? (
        <CountUpStat value={value} className={className} />
      ) : (
        <span className={className}>
          {prefix}0{suffix}
        </span>
      )}
    </div>
  );
}
