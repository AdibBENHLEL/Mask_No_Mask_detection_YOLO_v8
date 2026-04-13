// ── Status configuration ──────────────────────────────────────────────────────
export const STATUS = {
  idle: {
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.2)',
    label: 'Système en veille',
    labelEn: 'STANDBY',
    icon: '○',
    glow: 'none',
  },
  scanning: {
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
    label: 'Analyse en cours…',
    labelEn: 'SCANNING',
    icon: '◎',
    glow: '0 0 20px rgba(56,189,248,0.3)',
  },
  safe: {
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
    label: 'Zone sécurisée',
    labelEn: 'SECURE',
    icon: '✓',
    glow: '0 0 20px rgba(52,211,153,0.3)',
  },
  alert: {
    color: '#f87171',
    bg: 'rgba(248,113,113,0.08)',
    border: 'rgba(248,113,113,0.2)',
    label: 'ALERTE — Masque absent',
    labelEn: 'ALERT',
    icon: '!',
    glow: '0 0 30px rgba(248,113,113,0.4)',
  },
}

// ── Theme tokens ──────────────────────────────────────────────────────────────
export const THEME = {
  bg: {
    base: '#080c14',
    surface: '#0d1520',
    elevated: '#111b28',
    card: '#0f1923',
    overlay: 'rgba(8,12,20,0.85)',
  },
  border: {
    subtle: 'rgba(255,255,255,0.05)',
    default: 'rgba(255,255,255,0.08)',
    strong: 'rgba(255,255,255,0.12)',
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
    muted: '#475569',
    dim: '#334155',
  },
  accent: {
    primary: '#38bdf8',
    safe: '#34d399',
    danger: '#f87171',
    warn: '#fb923c',
  },
  font: {
    display: "'Space Grotesk', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    body: "'DM Sans', sans-serif",
  },
}
