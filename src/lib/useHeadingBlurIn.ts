import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react'
import { useLenis } from 'lenis/react'

const WORD_STAGGER_MS = 55

/**
 * Word-by-word blur-in for every heading inside `scope`.
 *
 * This is the same effect Home3 runs on its own headings, lifted into a
 * shared hook so the inner pages carry the homepage's signature reveal.
 *
 * Home3 still holds its own private copy of this logic. That is deliberate
 * for now: the brief freezes the homepage, and pointing it at this module
 * — even though the output is identical — would mean editing it. Worth
 * collapsing to one copy once the inner pages are signed off.
 */

/**
 * Wraps every word of `heading` in its own span so they can be revealed in
 * sequence. Recurses so inline markup survives — headings colour their last
 * phrase with `<span class="text-green">`, and that wrapper (and its class)
 * has to stay intact around the words it holds.
 */
function wrapWords(heading: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = []

  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? ''
        if (!text.trim()) continue

        const fragment = document.createDocumentFragment()
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part))
            continue
          }
          const word = document.createElement('span')
          word.className = 'heading-blur-word'
          word.textContent = part
          fragment.appendChild(word)
          words.push(word)
        }
        child.parentNode?.replaceChild(fragment, child)
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child)
      }
    }
  }

  walk(heading)
  return words
}

export function useHeadingBlurIn(
  scope: RefObject<HTMLElement | null>,
  /**
   * Re-runs the wrap when this changes. Inner pages pass the pathname so a
   * client-side navigation re-arms the effect for the new page's headings.
   */
  resetKey?: string,
) {
  const headingsRef = useRef<HTMLElement[]>([])
  const pendingRef = useRef(0)

  // Layout effect, not a plain effect: the words are hidden the moment they
  // are wrapped, so doing this after paint would flash the full heading
  // first and then blank it.
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return

    const headings = Array.from(root.querySelectorAll<HTMLElement>('h1, h2'))
    if (!headings.length) return

    const originals = headings.map((heading) => heading.innerHTML)

    for (const heading of headings) {
      const words = wrapWords(heading)
      if (!words.length) continue
      words.forEach((word, i) => {
        word.style.setProperty('--word-delay', `${i * WORD_STAGGER_MS}ms`)
      })
      heading.classList.add('heading-blur')
    }

    headingsRef.current = headings
    pendingRef.current = headings.length

    return () => {
      headingsRef.current = []
      // Put the original markup back, so nothing is left hidden and a
      // re-mount re-wraps from clean text rather than nesting spans.
      headings.forEach((heading, i) => {
        heading.classList.remove('heading-blur', 'is-visible')
        heading.innerHTML = originals[i]
      })
    }
  }, [scope, resetKey])

  const check = useCallback(() => {
    if (pendingRef.current <= 0) return
    const trigger = window.innerHeight * 0.88
    for (const heading of headingsRef.current) {
      if (heading.classList.contains('is-visible')) continue
      const rect = heading.getBoundingClientRect()
      if (rect.top < trigger && rect.bottom > 0) {
        heading.classList.add('is-visible')
        pendingRef.current -= 1
      }
    }
  }, [])

  // The app wraps everything in <ReactLenis root>, so Lenis drives the
  // scroll; its callback fires per frame through the whole eased movement.
  useLenis(check)

  // A rect test rather than IntersectionObserver, and window events on top
  // of the Lenis callback, because the failure mode is severe: a heading
  // that never gets revealed is a blank section, not a missed animation.
  useLayoutEffect(() => {
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [check, resetKey])
}
