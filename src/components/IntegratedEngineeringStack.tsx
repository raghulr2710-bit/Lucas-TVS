import { integratedStack } from '../lib/assets'

/** Home2-only. */
export function IntegratedEngineeringStack() {
  return (
    <section className="shell-wide pb-16 lg:pb-24">
      <div className="relative aspect-[1187/308] overflow-hidden rounded-[24px]">
        <img
          src={integratedStack}
          alt="Embedded Systems, Software-Defined Platforms, Electronics, Controls, Cloud, AI and Validation unified around a connected vehicle"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
