/** Icône : cinq mains en cercle, paumes ouvertes vers le centre (collaboration) */
export function IconHandsCircle({ className }: { className?: string }) {
  const n = 5;
  const r = 18;
  const cx = 24;
  const cy = 24;
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden>
      {Array.from({ length: n }, (_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const rot = (angle * 180) / Math.PI;
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}>
            {/* Paume stylisée : forme arrondie pointant vers le centre (vers le haut après rotation) */}
            <path d="M0 -8 Q-4 -8 -4 -4 L-4 2 Q-4 6 0 6 Q4 6 4 2 L4 -4 Q4 -8 0 -8Z" />
          </g>
        );
      })}
    </svg>
  );
}

/** Icône : diamant (contour, ligne de taille horizontale) */
export function IconDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M16 2 L30 16 L16 30 L2 16 Z" />
      <path d="M2 16 L30 16" />
    </svg>
  );
}

/** Icône : maison (toit, cheminée, 2 fenêtres, porte) */
export function IconHouse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M16 2 L2 14 L4 14 L4 30 L28 30 L28 14 L30 14 Z" />
      <rect x="20" y="6" width="4" height="8" />
      <rect x="8" y="18" width="5" height="5" />
      <rect x="19" y="18" width="5" height="5" />
      <rect x="12" y="22" width="8" height="8" />
    </svg>
  );
}
