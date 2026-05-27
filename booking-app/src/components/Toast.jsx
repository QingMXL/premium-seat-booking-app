import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ToastCtx = createContext(() => {})

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null)
  const show = useCallback((m) => {
    setMsg({ id: Date.now(), text: m })
  }, [])

  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(null), 1600)
    return () => clearTimeout(t)
  }, [msg])

  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && <div className="toast" key={msg.id}>{msg.text}</div>}
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
