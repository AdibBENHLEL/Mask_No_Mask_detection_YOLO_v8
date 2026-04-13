import { useActivityLog } from './hooks/useActivityLog'
import { useDetection } from './hooks/useDetection'
import { THEME } from './constants/status'

import { TopNav } from './components/TopNav'
import { AlertBanner } from './components/AlertBanner'
import { StatCard } from './components/StatCard'
import { CameraView } from './components/CameraView'
import { DetectionPanel } from './components/DetectionPanel'
import { ActivityLog } from './components/ActivityLog'
import { SoundInfo } from './components/SoundInfo'

export default function App() {
  const { logs, addLog, clearLogs } = useActivityLog()

  const {
    videoRef,
    canvasRef,
    running,
    status,
    counts,
    fps,
    totals,
    startCamera,
    stopCamera,
  } = useDetection(addLog)

  const alertPct = totals.frames
    ? Math.round((totals.alert / totals.frames) * 100)
    : 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes alertPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: ${THEME.bg.base};
          font-family: ${THEME.font.body};
          color: ${THEME.text.primary};
          min-height: 100vh;
        }

        button:disabled { opacity: 0.35; cursor: not-allowed !important; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${THEME.border.strong}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>

      <div style={{ minHeight: '100vh', background: THEME.bg.base, display: 'flex', flexDirection: 'column' }}>

        <TopNav status={status} fps={fps} running={running} />
        <AlertBanner status={status} />

        <main style={{ flex: 1, padding: '20px 24px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Stat row */}
          <div style={{ display: 'flex', gap: 12 }}>
            <StatCard
              label="Avec masque"
              value={counts.with_mask}
              accent={THEME.accent.safe}
              icon="✓"
              sublabel="Personnes conformes"
            />
            <StatCard
              label="Sans masque"
              value={counts.without_mask}
              accent={THEME.accent.danger}
              icon="!"
              sublabel="Non conformes"
            />
            <StatCard
              label="Frames traitées"
              value={totals.frames}
              accent={THEME.accent.primary}
              icon="◈"
              sublabel="Cette session"
            />
            <StatCard
              label="Taux d'alerte"
              value={`${alertPct}%`}
              accent={THEME.accent.warn}
              icon="▲"
              sublabel="Incidents / total"
            />
          </div>

          {/* Main grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: 2,
            flex: 1,
            minWidth: '1800px'
          }}>
            {/* Camera */}
            <CameraView
              videoRef={videoRef}
              canvasRef={canvasRef}
              running={running}
              status={status}
              onStart={startCamera}
              onStop={stopCamera}
            />

            {/* Right panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '300px' }}>
              <DetectionPanel counts={counts} totals={totals} />
              <SoundInfo />
              <ActivityLog logs={logs} onClear={clearLogs} />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            fontSize: 15,
            fontFamily: THEME.font.mono,
            letterSpacing: 1.5,
            paddingBottom: 4,
            fontStyle: 'bold'
          }}>
            SYSTÈME DE SURVEILLANCE MASQUE CHIRURGICAL  ·  YOLOV8 + FLASK all rights reserved created by BEN HELAL Adib
          </div>
        </main>
      </div>
    </>
  )
}
