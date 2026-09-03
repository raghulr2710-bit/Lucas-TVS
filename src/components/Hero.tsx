import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Marquee } from './primitives'
import { playWhenReady, useVideoScrub } from '../lib/useVideoScrub'
import { useHasFinePointer } from '../lib/useHasFinePointer'
import {
  heroBackdrop,
  heroArmMotion,
  logoZf,
  logoUltraviolette,
  logoRiver,
  logoRehlko,
  logoRoyalEnfield,
  logoHeroMotoCorp,
  logoBajaj,
  logoTvsMotor,
  logoGenerac,
  logoPiaggio,
  logoGreavesCotton,
  logoPolaris,
  logoLombardini,
} from '../lib/assets'

const CUSTOMERS = [
  { name: 'ZF', src: logoZf, h: 43 },
  { name: 'Ultraviolette', src: logoUltraviolette, h: 20 },
  { name: 'River', src: logoRiver, h: 33 },
  { name: 'Rehlko', src: logoRehlko, h: 40 },
  { name: 'Royal Enfield', src: logoRoyalEnfield, h: 21 },
  { name: 'Hero MotoCorp', src: logoHeroMotoCorp, h: 34 },
  { name: 'Bajaj Auto', src: logoBajaj, h: 35 },
  { name: 'TVS Motor', src: logoTvsMotor, h: 21 },
  { name: 'Generac Power Systems', src: logoGenerac, h: 30 },
  { name: 'Piaggio', src: logoPiaggio, h: 50 },
  { name: 'Greaves Cotton', src: logoGreavesCotton, h: 62 },
  { name: 'Polaris', src: logoPolaris, h: 19 },
  { name: 'Lombardini', src: logoLombardini, h: 44 },
]

/**
 * Mouse-scrubbed robotic-arm clip, adapted from the reference build in
 * `TVS Hero section/src/Hero.tsx`. Moving the pointer left/right scrubs the
 * video instead of it autoplaying — on a fine pointer only, since there's no
 * hover position to scrub from on touch.
 *
 * The video fills its section edge-to-edge (`object-fit: cover` in
 * `.hero-video`, see index.css) at every viewport width, same as the static
 * image this replaced. `bg-[#c9cdd2]` on the wrapper is just the loading
 * fallback shown for the instant before the video paints its first frame.
 */
function HeroBackdrop() {
  const reduceMotion = useReducedMotion()
  const hasFinePointer = useHasFinePointer()
  const scrubEnabled = hasFinePointer && !reduceMotion

  const { videoRef, handleSeeked } = useVideoScrub<HTMLVideoElement>(scrubEnabled)

  // Touch devices get no scrub input, so the clip would otherwise sit frozen
  // on frame one. Play it instead — reduced motion still wins over this.
  useEffect(() => {
    if (reduceMotion || hasFinePointer) return
    return playWhenReady(videoRef.current)
  }, [reduceMotion, hasFinePointer, videoRef])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#c9cdd2]">
      <video
        ref={videoRef}
        src={heroArmMotion}
        poster={heroBackdrop}
        muted
        loop={!scrubEnabled}
        playsInline
        preload="auto"
        aria-hidden="true"
        onSeeked={handleSeeked}
        className="hero-video"
      />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop ------------------------------------------------------ */}
      <div className="relative h-[560px] sm:h-[660px] lg:h-[795px]">
        <HeroBackdrop />
        {/* Keeps the headline readable across every frame of the clip. */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent lg:bg-gradient-to-r lg:from-white/45 lg:via-white/5 lg:to-transparent" />

        <div className="shell relative flex h-full flex-col justify-center pt-24 lg:block lg:pt-[130px]">
          <div className="flex flex-col">
            <p className="order-2 mt-6 max-w-[461px] lg:order-1 font-body text-[15px] leading-[1.5] font-medium text-black lg:mt-0 lg:ml-auto">
              Advanced software, embedded systems, power electronics and product
              engineering solutions for global OEMs and EV innovators.
            </p>

            <h1 className="order-1 max-w-[575px] lg:order-2 font-display text-[44px] leading-[1.08] font-semibold text-black sm:text-[60px] lg:mt-[42px] lg:text-[80px]">
              Engineering the{' '}
              <span className="text-green-deep">Future</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Customer proof ------------------------------------------------ */}
      <div className="shell">
        <div className="border-t border-line/70 pt-6" />
      </div>

      <div className="pb-10">
        <p className="mb-6 text-center font-body text-[13px] font-medium text-black">
          Trusted by the World&rsquo;s Most Demanding Automotive Manufacturers
        </p>

        <Marquee speed="slow">
          {CUSTOMERS.map((logo) => (
            <div
              key={logo.name}
              className="flex w-[132px] shrink-0 items-center justify-center px-4 lg:w-[158px] lg:px-6"
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: logo.h }}
                className="w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
