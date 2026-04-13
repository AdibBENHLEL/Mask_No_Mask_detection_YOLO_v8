import { THEME, STATUS } from '../constants/status'

export function CameraView({ videoRef, canvasRef, running, status, onStart, onStop }) {
  const st = STATUS[status]

  return (
    <div style={{
      background: THEME.bg.card,
      border: `1px solid ${THEME.border.default}`,
      height: '650px',
      width: '1500px',
      marginRight: '16px',
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'border-color 0.4s ease',
      ...(status === 'alert' && { borderColor: 'rgba(248,113,113,0.4)' }),
      ...(status === 'safe' && { borderColor: 'rgba(52,211,153,0.3)' }),
    }}>
      {/* Card header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${THEME.border.subtle}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: THEME.bg.elevated,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: running ? '#34d399' : '#334155',
            animation: running ? 'pulse 1s infinite' : 'none',
            boxShadow: running ? '0 0 8px #34d399' : 'none',
          }} />
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: THEME.text.secondary,
            fontFamily: THEME.font.mono,
            letterSpacing: 1.5,
          }}>
            FLUX VIDÉO EN DIRECT
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onStart}
            disabled={running}
            style={{
              padding: '7px 18px',
              borderRadius: 8,
              border: 'none',
              background: running
                ? THEME.bg.elevated
                : 'linear-gradient(135deg, #38bdf8, #0284c7)',
              color: running ? THEME.text.muted : '#fff',
              fontSize: 11,
              fontWeight: 600,
              cursor: running ? 'not-allowed' : 'pointer',
              letterSpacing: 1,
              fontFamily: THEME.font.mono,
              transition: 'all 0.2s',
              boxShadow: running ? 'none' : '0 0 14px rgba(56,189,248,0.3)',
            }}
          >
            DÉMARRER
          </button>
          <button
            onClick={onStop}
            disabled={!running}
            style={{
              padding: '7px 18px',
              borderRadius: 8,
              border: `1px solid ${!running ? THEME.border.subtle : 'rgba(248,113,113,0.3)'}`,
              background: 'transparent',
              color: !running ? THEME.text.dim : '#f87171',
              fontSize: 11,
              fontWeight: 600,
              cursor: !running ? 'not-allowed' : 'pointer',
              letterSpacing: 1,
              fontFamily: THEME.font.mono,
              transition: 'all 0.2s',
            }}
          >
            ARRÊTER
          </button>
        </div>
      </div>

      {/* Video area */}
      <div style={{
        background: '#050810',
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 420,
      }}>
        {!running && (
          <div style={{ textAlign: 'center', userSelect: 'none' }}>
            {/* Grid pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }} />
            <div style={{
              position: 'relative',
              fontSize: 52,
              color: '#1e293b',
              marginBottom: 16,
              lineHeight: 1,
            }}>
              ◎
            </div>
            <div style={{
              fontSize: 12,
              fontFamily: THEME.font.mono,
              color: THEME.text.muted,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}>
              Caméra inactive
            </div>
            <div style={{
              fontSize: 11,
              color: THEME.text.dim,
              marginTop: 8,
              fontFamily: THEME.font.body,
            }}>
              Appuyez sur DÉMARRER pour activer la surveillance
            </div>
          </div>
        )}

        <video ref={videoRef} autoPlay muted style={{ display: 'none' }} />
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: running ? 'block' : 'none',
          }}
        />

        {/* Bottom HUD strip */}
        {running && (
          <div style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              background: 'rgba(5,8,16,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 6,
              padding: '5px 12px',
              fontSize: 10,
              fontFamily: THEME.font.mono,
              color: THEME.text.secondary,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}>
              <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 1s infinite' }} />
                REC
              </span>
              <span>SALLE OP-01</span>
              <span style={{ color: THEME.text.muted }}>CAM-01</span>
            </div>

            <div style={{
              background: status === 'alert'
                ? 'rgba(248,113,113,0.15)'
                : 'rgba(5,8,16,0.75)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${status === 'alert' ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 6,
              padding: '5px 12px',
              fontSize: 10,
              fontFamily: THEME.font.mono,
              color: st.color,
              letterSpacing: 1,
              transition: 'all 0.3s ease',
            }}>
              {st.icon} {st.labelEn}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
