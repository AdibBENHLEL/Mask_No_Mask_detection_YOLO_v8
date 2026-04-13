import { THEME } from '../constants/status'

function MaskBar({ label, value, color, max = 5 }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: THEME.text.secondary, fontFamily: THEME.font.body }}>
          {label}
        </span>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          color,
          fontFamily: THEME.font.mono,
        }}>
          {value}
        </span>
      </div>
      <div style={{
        height: 4,
        background: THEME.bg.elevated,
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${THEME.border.subtle}`,
      }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 4,
          width: `${pct}%`,
          transition: 'width 0.5s ease',
          boxShadow: pct > 0 ? `0 0 8px ${color}55` : 'none',
        }} />
      </div>
    </div>
  )
}

function SessionStat({ label, value, color }) {
  return (
    <div style={{
      flex: 1,
      background: THEME.bg.elevated,
      border: `1px solid ${THEME.border.default}`,
      borderRadius: 10,
      padding: '12px 14px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 24,
        fontWeight: 700,
        color,
        fontFamily: THEME.font.display,
        lineHeight: 1,
        letterSpacing: -0.5,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 9,
        color: THEME.text.muted,
        marginTop: 4,
        letterSpacing: 1.5,
        fontFamily: THEME.font.mono,
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

export function DetectionPanel({ counts, totals }) {
  return (
    <div style={{
      background: THEME.bg.card,
      border: `1px solid ${THEME.border.default}`,
      borderRadius: 16,
      padding: 20,
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        color: THEME.text.muted,
        letterSpacing: 2,
        marginBottom: 18,
        fontFamily: THEME.font.mono,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 16,
          height: 1,
          background: THEME.border.strong,
        }} />
        Détections actuelles
      </div>

      <MaskBar
        label="Avec masque"
        value={counts.with_mask}
        color={THEME.accent.safe}
      />
      <MaskBar
        label="Sans masque"
        value={counts.without_mask}
        color={THEME.accent.danger}
      />

      <div style={{
        marginTop: 18,
        paddingTop: 16,
        borderTop: `1px solid ${THEME.border.subtle}`,
        display: 'flex',
        gap: 8,
      }}>
        <SessionStat label="Alertes" value={totals.alert} color={THEME.accent.danger} />
        <SessionStat label="Conformes" value={totals.safe} color={THEME.accent.safe} />
        <SessionStat label="Frames" value={totals.frames} color={THEME.accent.primary} />
      </div>
    </div>
  )
}
