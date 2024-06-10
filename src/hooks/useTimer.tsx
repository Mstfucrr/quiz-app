import { useEffect, useState, useRef } from 'react'

const useTimer = () => {
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Using useRef to store the interval reference
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      // If the timer is running, set the interval to increment the timer by 1 every second
      intervalRef.current = setInterval(() => setTimer(prev => prev + 1), 1000)
    } else if (!isRunning && intervalRef.current !== null) {
      // If the timer is not running and the interval reference is not null, clear the interval
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => { // Clear the interval when the component unmounts
      if (intervalRef.current) clearInterval(intervalRef.current) 
    }
  }, [isRunning])

  const startTimer = () => setIsRunning(true)
  const stopTimer = () => setIsRunning(false)
  const resetTimer = () => setTimer(0)

  return { timer, startTimer, stopTimer, resetTimer, isRunning }
}

export default useTimer
