import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES } from './routes'
import { PRODUCT_SECTORS, type Sector } from '../data/products'

/**
 * State and wiring for the header mega menus (components/site/MegaMenu.tsx),
 * kept apart from the components so Fast Refresh can hot-swap those.
 */

export type MegaId = 'products' | 'industries'

/**
 * Which nav destinations open a mega menu, keyed by their route.
 *
 * Products is switched off (30 Sep, client's call): "Products" is a plain
 * link to the Products page again, in both headers, and the phone sheet
 * drops its sector links with it. The menu itself is still built — add
 * `[ROUTES.products]: 'products'` back here and both return.
 */
export const MEGA_BY_ROUTE: Record<string, MegaId> = {
  [ROUTES.industries]: 'industries',
}

export const sectorLabel = (sector: Sector) =>
  sector === 'Defence' ? 'Defence & Aerospace' : sector

/**
 * Each sector's range on the Products page. `#explore` lands on the grid
 * itself rather than the hero above it.
 */
export const PRODUCT_SECTOR_LINKS = PRODUCT_SECTORS.map((sector) => ({
  sector,
  label: sectorLabel(sector),
  to: `${ROUTES.products}?sector=${sector}#explore`,
}))

const OPEN_DELAY = 80
const CLOSE_DELAY = 180

export function useMegaMenu() {
  const [openId, setOpenId] = useState<MegaId | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggers = useRef<Partial<Record<MegaId, HTMLButtonElement | null>>>({})
  const { pathname, search } = useLocation()

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])
  const openSoon = (id: MegaId) => {
    clear()
    timer.current = setTimeout(() => setOpenId(id), OPEN_DELAY)
  }
  const closeSoon = () => {
    clear()
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY)
  }
  const set = useCallback(
    (id: MegaId | null) => {
      clear()
      setOpenId(id)
    },
    [clear],
  )
  const registerTrigger = (id: MegaId, el: HTMLButtonElement | null) => {
    triggers.current[id] = el
  }

  // Navigating closes it — adjusted during render, like the mobile sheet,
  // so the new page never paints with the old menu still over it.
  const location = pathname + search
  const [lastLocation, setLastLocation] = useState(location)
  if (lastLocation !== location) {
    setLastLocation(location)
    setOpenId(null)
  }

  // Escape (focus back to the trigger); a click or focus outside the item.
  useEffect(() => {
    if (!openId) return
    const outside = (target: EventTarget | null) =>
      !(target instanceof Element && target.closest(`[data-mega="${openId}"]`))
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      triggers.current[openId]?.focus()
      set(null)
    }
    const onPointer = (e: PointerEvent) => outside(e.target) && set(null)
    const onFocus = (e: FocusEvent) => outside(e.target) && set(null)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    window.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('focusin', onFocus)
    }
  }, [openId, set])

  useEffect(() => clear, [clear])

  return { openId, set, openSoon, closeSoon, cancelClose: clear, registerTrigger }
}

export type Mega = ReturnType<typeof useMegaMenu>
