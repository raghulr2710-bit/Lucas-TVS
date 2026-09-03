import { useEffect, useState } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

/**
 * True on devices with a mouse-like pointer that can hover — the only
 * devices where a mousemove-driven scrub makes sense. False for touch
 * screens, where there's no hover position to scrub from.
 */
export function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(
    () => window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setHasFinePointer(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return hasFinePointer
}
