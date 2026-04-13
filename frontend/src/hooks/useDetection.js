import { useRef, useState, useCallback, useEffect } from 'react'
import { useSoundAlerts } from './useSoundAlerts'

export function useDetection(addLog) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)
  const lastStateRef = useRef('idle')
  const totalRef = useRef({ safe: 0, alert: 0, frames: 0 })
  const fpsRef = useRef({ last: Date.now(), count: 0 })

  const [running, setRunning] = useState(false)
  const [status, setStatus] = useState('idle')
  const [counts, setCounts] = useState({ with_mask: 0, without_mask: 0 })
  const [fps, setFps] = useState(0)
  const [totals, setTotals] = useState({ safe: 0, alert: 0, frames: 0 })

  const { playMasked, playUnmasked } = useSoundAlerts()

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      })
      videoRef.current.srcObject = stream
      videoRef.current.play()
      setRunning(true)
      setStatus('scanning')
      addLog('Caméra démarrée — surveillance active', 'info')
    } catch {
      addLog("Erreur : impossible d'accéder à la caméra", 'alert')
    }
  }, [addLog])

  const stopCamera = useCallback(() => {
    clearInterval(intervalRef.current)
    videoRef.current?.srcObject?.getTracks().forEach(t => t.stop())
    setRunning(false)
    setStatus('idle')
    setCounts({ with_mask: 0, without_mask: 0 })
    totalRef.current = { safe: 0, alert: 0, frames: 0 }
    setTotals({ safe: 0, alert: 0, frames: 0 })
    addLog('Surveillance arrêtée', 'info')
  }, [addLog])

  useEffect(() => {
    if (!running) return

    intervalRef.current = setInterval(async () => {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas || video.readyState < 2) return

      // FPS tracking
      fpsRef.current.count++
      const now = Date.now()
      if (now - fpsRef.current.last >= 1000) {
        setFps(fpsRef.current.count)
        fpsRef.current = { last: now, count: 0 }
      }

      // Capture frame
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0)
      const base64 = canvas.toDataURL('image/jpeg', 0.8)

      try {
        const res = await fetch('http://localhost:5000/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        })
        const data = await res.json()

        const newStatus =
          data.detections.length === 0 ? 'scanning' : data.alert ? 'alert' : 'safe'

        if (newStatus !== lastStateRef.current) {
          if (newStatus === 'safe') {
            playMasked()
            addLog(`Masque détecté — ${data.with_mask} personne(s) conforme(s)`, 'safe')
            totalRef.current.safe++
          } else if (newStatus === 'alert') {
            playUnmasked()
            addLog(`ALERTE — ${data.without_mask} personne(s) sans masque !`, 'alert')
            totalRef.current.alert++
          }
          lastStateRef.current = newStatus
        }

        totalRef.current.frames++
        setTotals({ ...totalRef.current })
        setStatus(newStatus)
        setCounts({ with_mask: data.with_mask, without_mask: data.without_mask })

        // ── Canvas rendering ────────────────────────────────────────────────
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Scan line
        ctx.strokeStyle = data.alert
          ? 'rgba(248,113,113,0.35)'
          : 'rgba(52,211,153,0.25)'
        ctx.lineWidth = 1
        const scanY = (Date.now() / 8) % canvas.height
        ctx.beginPath()
        ctx.moveTo(0, scanY)
        ctx.lineTo(canvas.width, scanY)
        ctx.stroke()

        data.detections.forEach(({ label, confidence, box }) => {
          const isMasked = label === 'with_mask'
          const color = isMasked ? '#34d399' : '#f87171'
          const { x1, y1, x2, y2 } = box
          const w = x2 - x1
          const h = y2 - y1

          // Dim fill
          ctx.fillStyle = isMasked
            ? 'rgba(52,211,153,0.07)'
            : 'rgba(248,113,113,0.07)'
          ctx.fillRect(x1, y1, w, h)

          // Box stroke
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
          ctx.strokeRect(x1, y1, w, h)

          // Corner brackets
          const cs = 14
          ctx.lineWidth = 3
          ;[
            [x1, y1, 1, 1],
            [x2, y1, -1, 1],
            [x1, y2, 1, -1],
            [x2, y2, -1, -1],
          ].forEach(([cx, cy, dx, dy]) => {
            ctx.beginPath()
            ctx.moveTo(cx + dx * cs, cy)
            ctx.lineTo(cx, cy)
            ctx.lineTo(cx, cy + dy * cs)
            ctx.stroke()
          })

          // Label pill
          const labelText = `${isMasked ? 'MASQUE' : 'SANS MASQUE'}  ${Math.round(confidence * 100)}%`
          ctx.font = 'bold 11px "IBM Plex Mono", monospace'
          const tw = ctx.measureText(labelText).width
          const pillH = 20
          const pillPad = 8
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.roundRect(x1, y1 - pillH - 4, tw + pillPad * 2, pillH, 3)
          ctx.fill()
          ctx.fillStyle = '#080c14'
          ctx.fillText(labelText, x1 + pillPad, y1 - 9)
        })

        // HUD timestamp
        ctx.fillStyle = 'rgba(8,12,20,0.7)'
        ctx.fillRect(8, 8, 152, 22)
        ctx.fillStyle = data.alert ? '#f87171' : '#34d399'
        ctx.font = '10px "IBM Plex Mono", monospace'
        ctx.fillText(`OR-SHIELD  ${new Date().toLocaleTimeString('fr-FR')}`, 14, 23)
      } catch (err) {
        console.error('Detection error:', err)
      }
    }, 600)

    return () => clearInterval(intervalRef.current)
  }, [running, playMasked, playUnmasked, addLog])

  return {
    videoRef,
    canvasRef,
    running,
    status,
    counts,
    fps,
    totals,
    startCamera,
    stopCamera,
  }
}
