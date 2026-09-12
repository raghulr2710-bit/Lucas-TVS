import type { ReactNode } from 'react'

/**
 * Types for the vendored `ScrollStack.jsx` (added via
 * `shadcn add @react-bits/ScrollStack-JS-CSS`), which ships as untyped JS.
 */

export interface ScrollStackItemProps {
  children?: ReactNode
  itemClassName?: string
}

export declare const ScrollStackItem: (props: ScrollStackItemProps) => JSX.Element

export interface ScrollStackProps {
  children?: ReactNode
  className?: string
  /** Gap between cards, in px. */
  itemDistance?: number
  /** How much each card further down the stack shrinks. */
  itemScale?: number
  /** Vertical offset between stacked cards, in px. */
  itemStackDistance?: number
  /** Where a card pins, as a % of the scroller height. */
  stackPosition?: string
  /** Where the scale animation finishes, as a % of the scroller height. */
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  /** Drive from window scroll instead of the component's own scroller. */
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

declare const ScrollStack: (props: ScrollStackProps) => JSX.Element

export default ScrollStack
