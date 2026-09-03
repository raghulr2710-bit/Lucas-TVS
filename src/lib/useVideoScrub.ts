import { useCallback, useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

/**
 * Starts one or more muted videos playing as soon as each has enough data,
 * retrying on the element's own 'canplay' event if the immediate attempt is
 * rejected for not being ready yet (common right after mount). Returns a
 * cleanup function that removes any listeners it attached.
 *
 * Used for the touch fallback: without pointer input to scrub with, the clip
 * autoplays muted and loops instead of sitting frozen on frame one.
 */
export function playWhenReady(
  ...videos: Array<HTMLVideoElement | null | undefined>
) {
  const cleanups: Array<() => void> = []

  for (const video of videos) {
    if (!video) continue

    const attempt = () => void video.play().catch(() => {})
    attempt()

    const onCanPlay = () => attempt()
    video.addEventListener('canplay', onCanPlay)
    cleanups.push(() => video.removeEventListener('canplay', onCanPlay))
  }

  return () => cleanups.forEach((fn) => fn())
}

/**
 * Drives a video's `currentTime` from horizontal mouse movement instead of
 * autoplay — moving the pointer right "rotates" the clip forward, left
 * rewinds it. Adapted from the reference hero build (see
 * `TVS Hero section/src/Hero.tsx`).
 *
 * The scrub follows the pointer only when `enabled` is true. Pass `false`
 * under `prefers-reduced-motion` or on coarse/touch pointers, where there's
 * no hover position to scrub from.
 */
export function useVideoScrub<T extends HTMLVideoElement>(enabled: boolean) {
  const videoRef = useRef<T | null>(null)
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)

  const applySeek = useCallback(() => {
    const video = videoRef.current
    if (!video || seekingRef.current) return
    if (Math.abs(video.currentTime - targetTimeRef.current) < 0.001) return
    seekingRef.current = true
    video.currentTime = targetTimeRef.current
  }, [])

  const handleSeeked = useCallback(() => {
    seekingRef.current = false
    const video = videoRef.current
    if (!video) return
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.001) {
      applySeek()
    }
  }, [applySeek])

  useEffect(() => {
    if (!enabled) return

    const onMouseMove = (e: MouseEvent) => {
      const video = videoRef.current
      if (!video) return

      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) {
        prevXRef.current = e.clientX
        return
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX
        return
      }

      const delta = e.clientX - prevXRef.current
      prevXRef.current = e.clientX

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration
      targetTimeRef.current = Math.min(
        duration,
        Math.max(0, targetTimeRef.current + offset),
      )

      applySeek()
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [enabled, applySeek])

  return { videoRef, handleSeeked }
}
