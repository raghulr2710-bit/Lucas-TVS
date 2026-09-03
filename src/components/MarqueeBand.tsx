/**
 * The tilted lime band that separates "Why choose us" from Sustainability.
 * Figma rotates the plate -3.85deg and the type -4.22deg; both are kept and
 * the whole band is over-sized so the rotated corners never expose the page.
 */
export function MarqueeBand() {
  const phrase = 'Engineering Mobility for a Global Market'

  return (
    <div
      className="relative my-12 h-[110px] overflow-hidden lg:my-20 lg:h-[190px]"
      aria-hidden
    >
      <div className="absolute top-1/2 left-1/2 w-[130vw] -translate-x-1/2 -translate-y-1/2 -rotate-[3.85deg] bg-lime py-4 lg:py-[26px]">
        <div className="flex w-max animate-marquee-slow -rotate-[0.37deg]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {Array.from({ length: 4 }, (_, i) => (
                <span
                  key={i}
                  className="px-10 font-display text-[26px] whitespace-nowrap text-ink lg:px-16 lg:text-[55px]"
                >
                  {phrase}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
