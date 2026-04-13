import { useState, useCallback } from 'react'

export function useActivityLog(maxEntries = 50) {
  const [logs, setLogs] = useState([])

  const addLog = useCallback((message, type = 'info') => {
    const time = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    setLogs(prev =>
      [{ time, message, type, id: `${Date.now()}-${Math.random()}` }, ...prev].slice(0, maxEntries)
    )
  }, [maxEntries])

  const clearLogs = useCallback(() => setLogs([]), [])

  return { logs, addLog, clearLogs }
}
