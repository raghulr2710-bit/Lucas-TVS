/**
 * The lime marquee band between "Why choose us" and Sustainability.
 *
 * The lime now sits on the section itself rather than on a rotated plate
 * inside it. A tilted strip only covers a rectangle completely when its
 * thickness is at least `height x cos(angle) + width x sin(angle)` — at
 * 220px tall and 1425px wide that is 316px, against the plate's 152px, so
 * the rotated plate always left a white wedge in the top-left and
 * bottom-right corners. Filling those corners and showing the plate's own
 * edges are mutually exclusive; per the client (Sep 13) the band is
 * full-bleed and the tilt is carried by the type alone.
 *
 * Figma's -4.22deg tilt on the type is dropped along with the plate: once
 * the lime is a full-bleed rectangle its edges are level, and type running
 * at an angle across level edges reads as a mistake rather than a design.
 * Levelling it also lets the band be much shorter — the tilt needed ~150px
 * of clearance just to stop the line drifting into the edges.
 */
export function MarqueeBand() {
  const phrase = 'Engineering Mobility for a Global Market'

  return (
    <div
      className="relative my-12 h-[88px] overflow-hidden bg-lime lg:my-20 lg:h-[140px]"
      aria-hidden
    >
      <div className="absolute top-1/2 left-1/2 w-[130vw] -translate-x-1/2 -translate-y-1/2">
        <div className="flex w-max animate-marquee-slow">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {Array.from({ length: 4 }, (_, i) => (
                <span
                  key={i}
                  className="px-10 font-display text-[26px] leading-[1.3] whitespace-nowrap text-ink lg:px-16 lg:text-[55px]"
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
