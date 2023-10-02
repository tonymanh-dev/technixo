import { useState, useEffect, useMemo } from 'react'

const useTimer = () => {
  const [time, setTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isPlaying) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying])

  const stopTimer = () => {
    setIsPlaying(false)
  }

  // Memoized calculation of the formatted time string
  const renderTime = useMemo((): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }, [time])

  return { renderTime, isPlaying, stopTimer }
}

export default useTimer
