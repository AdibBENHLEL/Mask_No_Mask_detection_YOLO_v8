# OR Shield — Mask Detection System

## Project Structure

```
src/
├── App.jsx                        # Root component, wires everything together
├── constants/
│   └── status.js                  # STATUS config + THEME design tokens
├── hooks/
│   ├── useSoundAlerts.js          # Web Audio API — plays alert tones
│   ├── useDetection.js            # Camera, frame capture, API polling, canvas drawing
│   └── useActivityLog.js          # Timestamped log entries with max-cap
└── components/
    ├── TopNav.jsx                 # Sticky header — brand, room badge, status pill
    ├── AlertBanner.jsx            # Red strip shown during active alert
    ├── StatCard.jsx               # Metric card with glow top-border accent
    ├── CameraView.jsx             # Video canvas + controls + HUD overlay
    ├── DetectionPanel.jsx         # Realtime count bars + session stats
    ├── SoundInfo.jsx              # Alert tone legend
    └── ActivityLog.jsx            # Scrollable timestamped log with clear button
```

## Getting Started

```bash
npm install
npm run dev
```

Requires the Flask detection backend running at `http://localhost:5000/detect`.

## Tech Stack
- React 18 (Vite)
- Web Audio API (no lib)
- YOLOv8 + Flask (backend)
- IBM Plex Mono / Space Grotesk / DM Sans (Google Fonts)
