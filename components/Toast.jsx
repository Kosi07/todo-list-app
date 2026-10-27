 'use client'

import { useEffect } from "react"

const Toast = ({toast, icon:Icon, setToast}) => {

  useEffect(() => {
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast])

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div key={Toast} className="flex animate-sheet items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-xl">
        <Icon className="h-4 w-4" /> {toast}
      </div>
    </div>
  )
}

export default Toast