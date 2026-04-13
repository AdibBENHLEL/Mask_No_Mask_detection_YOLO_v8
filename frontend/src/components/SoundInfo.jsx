import { THEME } from '../constants/status'

export function SoundInfo() {
  return (
    <div style={{
      background: THEME.bg.card,
      border: `1px solid ${THEME.border.default}`,
      borderRadius: 12,
      padding: '14px 16px',
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        color: THEME.text.muted,
        letterSpacing: 2,
        marginBottom: 12,
        fontFamily: THEME.font.mono,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ width: 16, height: 1, background: THEME.border.strong }} />
        Alertes sonores
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { icon: '♪', label: 'Bip aigu', desc: 'masque détecté', color: THEME.accent.safe },
          { icon: '♪♪♪', label: 'Triple bip', desc: 'sans masque', color: THEME.accent.danger },
        ].map(({ icon, label, desc, color }) => (
          <div key={label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 10px',
            background: THEME.bg.elevated,
            borderRadius: 8,
            border: `1px solid ${THEME.border.subtle}`,
          }}>
            <span style={{
              fontSize: 11,
              color,
              fontFamily: THEME.font.mono,
              minWidth: 24,
            }}>
              {icon}
            </span>
            <div>
              <span style={{
                fontSize: 11,
                color: THEME.text.secondary,
                fontFamily: THEME.font.mono,
                fontWeight: 600,
              }}>
                {label}
              </span>
              <span style={{
                fontSize: 11,
                color: THEME.text.muted,
                fontFamily: THEME.font.body,
              }}>
                {' '}→ {desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
