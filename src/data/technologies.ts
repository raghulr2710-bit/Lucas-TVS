import type { ComponentType } from 'react'
import { IconBolt, IconCode, IconFactory, IconNetwork, IconShieldCheck } from '../components/site/design'
import {
  focusGridAiDigital,
  focusGridAutomation,
  focusGridElectrification,
  focusGridMissionCritical,
  focusGridSoftwareDefined,
} from '../lib/assets'

export type Technology = {
  id: string
  name: string
  blurb: string
  image: string
  imageAlt: string
  icon: ComponentType
  items: string[]
}

/**
 * The five focus areas the engineering teams are organised around — the
 * same five the approved homepage names in its focus grid and its
 * Solutions finder. Artwork is the homepage focus-grid set; the capability
 * tags are drawn from the reference's service lines and industry
 * solutions, so nothing here is new copy.
 */
export const TECHNOLOGIES: Technology[] = [
  {
    id: 'electrification',
    name: 'Electrification & Powertrain',
    blurb: 'Motors, controllers, inverters, battery management and charging — engineered together for 2, 3 and 4-wheelers, commercial and off-highway vehicles.',
    image: focusGridElectrification,
    imageAlt: 'Exploded view of an electric drive unit — rotor, stator, gearbox and housing',
    icon: IconBolt,
    items: ['Motors & Motor Controllers', 'Traction Inverters', 'Battery Management Systems', 'DC-DC Converters', 'Charging Systems', 'Energy Management'],
  },
  {
    id: 'software-defined',
    name: 'Software Defined Platforms',
    blurb: 'Helping OEMs move from hardware-centric architectures to software-defined mobility platforms.',
    image: focusGridSoftwareDefined,
    imageAlt: 'Vehicle software dashboards layered on floating screens',
    icon: IconCode,
    items: ['Vehicle Software Platforms', 'AUTOSAR', 'Middleware', 'OTA Architecture', 'Vehicle Functions'],
  },
  {
    id: 'automation',
    name: 'Intelligent Automation',
    blurb: 'Transforming production through intelligent automation and digital manufacturing technologies.',
    image: focusGridAutomation,
    imageAlt: 'Robotic arms and autonomous mobile robots on a factory floor',
    icon: IconFactory,
    items: ['Manufacturing Automation', 'Digital Factory', 'IIoT & Edge Computing', 'Asset Monitoring', 'Industrial Networking'],
  },
  {
    id: 'mission-critical',
    name: 'Mission-Critical Systems',
    blurb: 'Supporting the complete lifecycle of mission-critical platforms and subsystems.',
    image: focusGridMissionCritical,
    imageAlt: 'Armoured vehicle, naval vessel and drone under a tactical overlay',
    icon: IconShieldCheck,
    items: ['System Architecture', 'Embedded Software', 'RTOS Development', 'Rugged & Vehicle Electronics', 'Verification & Validation'],
  },
  {
    id: 'ai-digital',
    name: 'AI & Digital Engineering',
    blurb: 'AI, IIoT, cloud and edge to make products and operations smarter.',
    image: focusGridAiDigital,
    imageAlt: 'Layered silicon stack with a data visualisation rising from it',
    icon: IconNetwork,
    items: ['AI & Machine Learning', 'Industrial IoT', 'Cloud & Edge', 'Predictive Maintenance', 'Operational Intelligence'],
  },
]
