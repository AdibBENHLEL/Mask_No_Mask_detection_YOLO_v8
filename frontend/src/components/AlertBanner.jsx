import { THEME } from '../constants/status'

export function AlertBanner({ status }) {
  if (status !== 'alert') return null

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(248,113,113,0.15) 0%, rgba(248,113,113,0.08) 100%)',
      borderBottom: '1px solid rgba(248,113,113,0.3)',
      padding: '10px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      animation: 'alertPulse 1s infinite',
    }}>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        background: 'rgba(248,113,113,0.2)',
        border: '1px solid rgba(248,113,113,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        flexShrink: 0,
      }}>
        ⚠
      </div>
      <div>
        <div style={{
          fontSize: 12,
          fontWeight: 700,
          color: '#fca5a5',
          letterSpacing: 1,
          fontFamily: THEME.font.mono,
        }}>
          ALERTE DE SÉCURITÉ
        </div>
        <div style={{
          fontSize: 11,
          color: 'rgba(252,165,165,0.7)',
          marginTop: 1,
          fontFamily: THEME.font.body,
        }}>
          Personne sans masque chirurgical détectée dans la zone opératoire
        </div>
      </div>
      <div style={{
        marginLeft: 'auto',
        fontSize: 10,
        color: 'rgba(252,165,165,0.5)',
        fontFamily: THEME.font.mono,
        letterSpacing: 0.5,
      }}>
        {new Date().toLocaleTimeString('fr-FR')}
      </div>
    </div>
  )
}
