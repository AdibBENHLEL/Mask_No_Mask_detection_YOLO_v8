import { THEME } from '../constants/status'

export function StatCard({ label, value, accent, icon, sublabel }) {
  return (
    <div style={{
      flex: 1,
      background: THEME.bg.card,
      border: `1px solid ${THEME.border.default}`,
      borderRadius: 14,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
    }}>
      {/* Glow strip */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: 10,
          fontFamily: THEME.font.mono,
          color: THEME.text.muted,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: `${accent}14`,
          border: `1px solid ${accent}28`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          color: accent,
          fontWeight: 700,
        }}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <div style={{
        fontSize: 34,
        fontWeight: 700,
        color: accent,
        fontFamily: THEME.font.display,
        lineHeight: 1,
        letterSpacing: -1,
      }}>
        {value}
      </div>

      {sublabel && (
        <div style={{
          fontSize: 10,
          color: THEME.text.muted,
          fontFamily: THEME.font.mono,
          letterSpacing: 0.3,
        }}>
          {sublabel}
        </div>
      )}
    </div>
  )
}
