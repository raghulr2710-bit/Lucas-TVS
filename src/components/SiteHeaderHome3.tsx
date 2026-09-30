import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../lib/cx'
import { logoLucasTvs } from '../lib/assets'
import { NAV, ROUTES } from '../lib/routes'

/**
 * The header links, flattened from the site-wide `NAV` in lib/routes.ts.
 *
 * That list is the wireframe sitemap — About · Capabilities · Products ·
 * Industries · Quality · Insights · Careers — and it is what the inner
 * pages' header renders too, so the two can't disagree. This header stays
 * a flat row: the inner header's Industries and Capabilities dropdowns
 * would be a design change here, and the landing pages they lead to
 * (/industries, /capabilities) carry the same links one click later.
 */
const LINKS = NAV.map((item) => ({ label: item.label, to: item.to }))

/**
 * Home3-only replacement for `SiteHeader`. Same markup and behaviour —
 * only the skin changes: the white plate becomes a dark blurred glass bar
 * so it reads against Home3's dark video hero, with white nav text and a
 * white-knocked-out logo (`brightness-0 invert` rather than a second
 * asset, so there's one logo file to keep in sync).
 *
 * 29 Sep: the links now go somewhere. They were `#about`-style anchors
 * into the homepage; with the inner pages built they resolve to those
 * pages, per the sitemap. Rendered with react-router's `Link` so the
 * navigation is client-side and Lenis keeps its state, rather than a full
 * reload. Nothing about the bar's appearance changed.
 */
export function SiteHeaderHome3() {
  const [open, setOpen] = useState(false)

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-4">
      <div className="shell">
        <nav className="flex items-center gap-6 rounded-[10px] border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md lg:px-8">
          <Link to={ROUTES.home} className="shrink-0" aria-label="Lucas-TVS home">
            <img
              src={logoLucasTvs}
              alt="Lucas-TVS"
              className="h-[38px] w-auto brightness-0 invert lg:h-[49px]"
            />
          </Link>

          <ul className="ml-4 hidden flex-1 items-center justify-between gap-7 xl:flex">
            {LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-body text-[15px] leading-[1.25] text-white/85 transition-colors hover:text-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* The site-wide `Button` primitive is a plain <a>, so the CTA is a
              `Link` carrying the same classes. White rather than the
              site-wide lime solid: the Home3 header is a dark blurred bar.
              The focus ring is white too; the default `outline-ink` would
              sit on the dark bar and all but disappear. */}
          <Link
            to={ROUTES.contact}
            className="ml-auto hidden items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-[16px] leading-[1.25] font-medium whitespace-nowrap text-ink-slate shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:inline-flex"
          >
            Talk to Engineering
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/25 xl:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              {[0, 6, 12].map((y, i) => (
                <span
                  key={y}
                  className={cx(
                    'absolute left-0 h-[2px] w-full rounded bg-white transition-all duration-200',
                    open && i === 0 && 'top-[6px] rotate-45',
                    open && i === 1 && 'opacity-0',
                    open && i === 2 && 'top-[6px] -rotate-45',
                  )}
                  style={open ? undefined : { top: y }}
                />
              ))}
            </span>
          </button>
        </nav>

        {open && (
          <ul className="mt-2 grid gap-1 rounded-[10px] border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur-md xl:hidden">
            {LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-body text-[15px] text-white/85 hover:bg-white/10 hover:text-lime"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to={ROUTES.contact}
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-[16px] leading-[1.25] font-medium whitespace-nowrap text-ink-slate shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Talk to Engineering
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
