import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled more than `threshold` pixels.
 *
 * Drives the headers' switch from the dark glass bar they wear over a hero
 * to the solid white bar they wear once pinned over content.
 *
 * A window scroll listener rather than Lenis's callback: Lenis moves the
 * page with real scroll positions, so native scroll events still fire on
 * every frame of its easing, and this keeps the hook usable outside a
 * Lenis tree. State only changes when the threshold is crossed, so the
 * header re-renders twice per trip down the page, not once per frame.
 */
export function useScrolled(threshold = 60) {
  // Read the real position on first render, so a page opened part-way down
  // (reload, back button) starts in the right state without a flash.
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [threshold])

  return scrolled
}
