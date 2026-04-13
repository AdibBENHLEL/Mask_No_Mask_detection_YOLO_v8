import { THEME } from '../constants/status'

function LogEntry({ entry }) {
  const dotColor =
    entry.type === 'safe'
      ? THEME.accent.safe
      : entry.type === 'alert'
      ? THEME.accent.danger
      : THEME.accent.primary

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '8px 0',
      borderBottom: `1px solid ${THEME.border.subtle}`,
      animation: 'fadeSlideIn 0.25s ease',
    }}>
      <div style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: dotColor,
        flexShrink: 0,
        marginTop: 3,
        boxShadow: `0 0 6px ${dotColor}66`,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 10,
          color: THEME.text.muted,
          fontFamily: THEME.font.mono,
          marginBottom: 2,
        }}>
          {entry.time}
        </div>
        <div style={{
          fontSize: 11,
          color: entry.type === 'alert' ? '#fca5a5' : THEME.text.secondary,
          fontFamily: THEME.font.body,
          lineHeight: 1.4,
          wordBreak: 'break-word',
        }}>
          {entry.message}
        </div>
      </div>
    </div>
  )
}

export function ActivityLog({ logs, onClear }) {
  return (
    <div style={{
      background: THEME.bg.card,
      border: `1px solid ${THEME.border.default}`,
      borderRadius: 16,
      padding: 20,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <div style={{
          fontSize: 9,
          fontWeight: 600,
          color: THEME.text.muted,
          letterSpacing: 2,
          fontFamily: THEME.font.mono,
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 16, height: 1, background: THEME.border.strong }} />
          Journal d'activité
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 9,
              color: THEME.text.muted,
              fontFamily: THEME.font.mono,
              letterSpacing: 0.5,
              padding: '2px 6px',
              borderRadius: 4,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target.style.color = THEME.text.secondary)}
            onMouseLeave={e => (e.target.style.color = THEME.text.muted)}
          >
            EFFACER
          </button>
        )}
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        minHeight: 0,
        marginRight: -4,
        paddingRight: 4,
      }}>
        {logs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '32px 0',
            color: THEME.text.dim,
            fontSize: 11,
            fontFamily: THEME.font.mono,
          }}>
            Aucune activité
          </div>
        ) : (
          logs.map(e => <LogEntry key={e.id} entry={e} />)
        )}
      </div>
    </div>
  )
}
