import { useEffect, useState } from 'react';

const DURATION_MS = 2000;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Parses values like "€300M", "+€250M", "+€1.0Md" into prefix, number, suffix */
function parseStatValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  if (!match) return { prefix: value, number: 0, suffix: '' };
  const numStr = match[2].replace(',', '.');
  const number = parseFloat(numStr);
  if (Number.isNaN(number)) return { prefix: value, number: 0, suffix: '' };
  return { prefix: match[1], number, suffix: match[3] };
}

function formatNumber(n: number, decimals: number): string {
  if (decimals > 0) return n.toFixed(1);
  return Math.round(n).toString();
}

interface CountUpStatProps {
  value: string;
  className?: string;
}

export default function CountUpStat({ value, className = '' }: CountUpStatProps) {
  const { prefix, number, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  const decimals = number >= 1 && number < 10 ? 1 : 0;

  useEffect(() => {
    if (number === 0) {
      setDone(true);
      return;
    }
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutExpo(t);
      const current = eased * number;
      setDisplay(current);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(number);
        setDone(true);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [number]);

  const displayStr = done ? formatNumber(number, decimals) : formatNumber(display, decimals);

  return (
    <span className={className}>
      {prefix}
      {displayStr}
      {suffix}
    </span>
  );
}
