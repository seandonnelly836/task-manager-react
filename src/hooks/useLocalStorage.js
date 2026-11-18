import { useEffect, useState } from 'react'

/**
 * Works like useState, but the value is also saved in localStorage
 * so it survives a page refresh.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage may be unavailable; the app still works in memory.
    }
  }, [key, value])

  return [value, setValue]
}
