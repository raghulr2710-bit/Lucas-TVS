import { focusAreasElectrificationPowertrain } from '../lib/assets'

/**
 * Home2-only replacement for SolutionShowcase. The Figma export for this
 * tab ("Electrification & Powertrain") bakes its copy, thumbnails, feature
 * list and tab bar into one flat image — the other 4 tab states weren't
 * exported yet, so this renders as a single static composite for now
 * instead of the interactive multi-tab version.
 */
export function FocusAreas() {
  return (
    <section id="capabilities" className="shell-wide pb-16 lg:pb-24">
      <img
        src={focusAreasElectrificationPowertrain}
        alt="Focus Areas — Electrification & Powertrain: power electronics, controls and software accelerating electric mobility, with Inverter, Traction Motor, Battery Management System and Vehicle Control Unit highlighted on a cutaway EV"
        className="w-full rounded-[24px] object-cover"
      />
    </section>
  )
}
