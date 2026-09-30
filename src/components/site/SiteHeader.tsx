import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { logoLucasTvs } from '../../lib/assets'
import { NAV, ROUTES } from '../../lib/routes'
import { FRAME } from './design'

/**
 * The mobile sheet's state: closed on navigation and on Escape, with page
 * scroll locked while it is open.
 */
function useMenus() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the sheet on navigation — without this the mobile sheet stays
  // open over the page it just navigated to.
  //
  // Adjusted during render rather than in an effect. An effect would paint
  // the new page once with the sheet still over it and then close it, and
  // it also covers back/forward, which a close-on-click handler would miss.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** A section counts as current when the URL is in its subtree. */
  const isActive = (item: { to: string }) =>
    pathname === item.to || pathname.startsWith(`${item.to}/`)

  return { open, setOpen, isActive }
}

/**
 * Header for every inner page.
 *
 * Every designed inner page in the 29 Sep reference opens on a full-bleed
 * dark photograph with this bar floating over its top edge: dark glass,
 * white type, the current section marked by a lime underline, a white
 * "Talk to Engineering" pill. It is the Home3 header's treatment carried
 * through to the inner pages, which is presumably the point.
 *
 * Against the reference:
 *
 *   - The reference draws the logo as a "Lucas TVS" text box. That is a
 *     wireframe stand-in; the real logo is used, knocked out to white the
 *     way Home3 does it.
 *   - Parents render as plain links, as drawn — no dropdown chevrons. The
 *     landing pages they lead to carry the child links one click on. The
 *     mobile sheet still lists the children, where there is room.
 *   - Below `xl` the links collapse behind the reference's round lime menu
 *     button.
 *
 * Absolute rather than sticky: it belongs to the hero it sits on, exactly
 * as the Home3 header does.
 */
export function SiteHeader() {
  const { open, setOpen, isActive } = useMenus()

  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-5">
      <div className={FRAME}>
        <nav
          aria-label="Primary"
          className="flex h-[60px] items-center justify-between gap-6 rounded-[16px] border border-[#3a3c3a] bg-[rgba(16,18,17,0.72)] pr-2.5 pl-3 backdrop-blur-md lg:h-[72px] lg:rounded-[18px] lg:pr-3 lg:pl-4"
        >
          <Link to={ROUTES.home} className="shrink-0 py-1" aria-label="Lucas-TVS home">
            <img
              src={logoLucasTvs}
              alt="Lucas-TVS"
              className="h-[34px] w-auto brightness-0 invert lg:h-[42px]"
            />
          </Link>

          <ul className="hidden items-center gap-[34px] xl:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className={cx(
                    'block border-b-2 py-1 font-body text-[15px] transition-colors',
                    isActive(item)
                      ? 'border-lime font-semibold text-white'
                      : 'border-transparent text-white/90 hover:text-lime',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.contact}
              className="hidden rounded-full bg-white px-[22px] py-3 font-body text-[15px] font-medium whitespace-nowrap text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:inline-flex"
            >
              Talk to Engineering
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full bg-lime xl:hidden"
            >
              <span className="relative block h-[14px] w-[18px]">
                {[0, 6, 12].map((y, i) => (
                  <span
                    key={y}
                    className={cx(
                      'absolute left-0 h-[2px] w-full rounded bg-ink transition-all duration-200',
                      open && i === 0 && 'top-[6px] rotate-45',
                      open && i === 1 && 'opacity-0',
                      open && i === 2 && 'top-[6px] -rotate-45',
                    )}
                    style={open ? undefined : { top: y }}
                  />
                ))}
              </span>
            </button>
          </div>
        </nav>

        {open && (
          <div className="mt-2 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-[16px] border border-[#3a3c3a] bg-[rgba(16,18,17,0.94)] p-4 backdrop-blur-md xl:hidden">
            <ul className="grid gap-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={cx(
                      'block rounded-lg px-3 py-3 font-body text-[15px] font-medium transition-colors',
                      isActive(item) ? 'bg-white/10 text-lime' : 'text-white hover:bg-white/10',
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-1 mb-2 ml-3 grid gap-0.5 border-l border-white/15 pl-3">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className="block rounded-lg px-3 py-3 font-body text-[14px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to={ROUTES.contact}
              className="mt-3 flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 font-body text-[15px] font-medium text-ink"
            >
              Talk to Engineering
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
