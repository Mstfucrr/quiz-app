// src/hooks/useTimer.tsx

import { useEffect, useState } from 'react'

const useTimer = () => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const resetTimer = () => setTimer(0)

  return { timer, resetTimer }
}

export default useTimer
