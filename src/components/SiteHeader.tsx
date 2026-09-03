import { useEffect, useState } from 'react'
import { Button } from './primitives'
import { cx } from '../lib/cx'
import { logoLucasTvs } from '../lib/assets'

const NAV = [
  'About',
  'Capabilities',
  'Products',
  'Industries',
  'Quality',
  'Global',
  'Insights',
  'Careers',
]

export function SiteHeader() {
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
        <nav className="flex items-center gap-6 rounded-[10px] bg-white/90 px-6 py-3 backdrop-blur-sm lg:px-8">
          <a href="#" className="shrink-0" aria-label="Lucas-TVS home">
            <img
              src={logoLucasTvs}
              alt="Lucas-TVS"
              className="h-[38px] w-auto lg:h-[49px]"
            />
          </a>

          <ul className="ml-4 hidden flex-1 items-center gap-7 xl:flex">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-body text-[15px] leading-[1.25] text-[#0f172a] transition-colors hover:text-green-deep"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <Button className="ml-auto !hidden !px-8 !py-3.5 lg:!inline-flex">
            Talk to Engineering
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line xl:hidden"
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
        </nav>

        {open && (
          <ul className="mt-2 grid gap-1 rounded-[10px] bg-white p-4 shadow-lg xl:hidden">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-body text-[15px] text-[#0f172a] hover:bg-lime-tint"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <Button className="w-full">Talk to Engineering</Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
