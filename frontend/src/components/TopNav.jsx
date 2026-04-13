import { THEME, STATUS } from '../constants/status'

export function TopNav({ status, fps, running }) {
  const st = STATUS[status]

  return (
    <nav style={{
      background: THEME.bg.surface,
      borderBottom: `1px solid ${THEME.border.default}`,
      padding: '0 28px',
      height: 58,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          fontWeight: 800,
          color: '#fff',
          boxShadow: '0 0 16px rgba(56,189,248,0.4)',
          fontFamily: THEME.font.display,
          letterSpacing: -0.5,
        }}>
          +
        </div>
        <div>
          <div style={{
            fontSize: 15,
            fontWeight: 700,
            color: THEME.text.primary,
            fontFamily: THEME.font.display,
            letterSpacing: -0.3,
          }}>
            Hopitale sadek mkadem djerba 
          </div>
          <div style={{
            fontSize: 9,
            color: THEME.text.muted,
            letterSpacing: 2,
            fontFamily: THEME.font.mono,
            textTransform: 'uppercase',
          }}>
            Mask Control System
          </div>
        </div>
      </div>

      {/* Center — room badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: THEME.bg.elevated,
        border: `1px solid ${THEME.border.strong}`,
        borderRadius: 8,
        padding: '6px 16px',
      }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: running ? '#34d399' : '#475569',
          animation: running ? 'pulse 1.4s infinite' : 'none',
        }} />
        <span style={{
          fontSize: 11,
          fontFamily: THEME.font.mono,
          color: THEME.text.secondary,
          letterSpacing: 1.5,
        }}>
          SALLE OP-01  ·  CAM-01
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {running && fps > 0 && (
          <div style={{
            fontFamily: THEME.font.mono,
            fontSize: 11,
            color: THEME.text.muted,
            letterSpacing: 0.5,
          }}>
            {fps} <span style={{ color: THEME.text.dim }}>FPS</span>
          </div>
        )}

        {/* Status pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: st.bg,
          border: `1px solid ${st.border}`,
          borderRadius: 20,
          padding: '6px 14px',
          boxShadow: st.glow,
          transition: 'all 0.4s ease',
        }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: st.color,
            animation: running ? 'pulse 1.2s infinite' : 'none',
            boxShadow: running ? `0 0 6px ${st.color}` : 'none',
          }} />
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: st.color,
            letterSpacing: 1.5,
            fontFamily: THEME.font.mono,
          }}>
            {st.labelEn}
          </span>
        </div>
      </div>
    </nav>
  )
}
