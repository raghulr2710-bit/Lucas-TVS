"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Children,
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

/**
 * Scroll-linked "converge" effect, adapted from `text-scroll-animation.tsx`
 * for use inside ordinary page sections.
 *
 * The original demo drives each animation from a 210vh block, so its progress
 * is that block's own scroll. These wrappers map progress to the element
 * entering the viewport instead, which is what a normal-height section needs.
 * Motion is skipped when the visitor prefers reduced motion.
 */

/** Element top at viewport bottom -> 0; element top at viewport middle -> 1. */
const ENTER_OFFSET = ["start end", "start center"] as const;

/** Animations land a little before progress runs out, so they settle. */
const SETTLE = 0.85;

type GroupContext = {
  progress: MotionValue<number> | null;
  count: number;
  spread: number;
  lift: number;
  scaleFrom: number;
};

const ScrollConvergeContext = createContext<GroupContext>({
  progress: null,
  count: 1,
  spread: 0,
  lift: 0,
  scaleFrom: 1,
});

type GroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
  /** Px the outermost items start from horizontally. */
  spread?: number;
  /** Px the outermost items start above their resting position. */
  lift?: number;
  scaleFrom?: number;
};

/**
 * Wraps a row or grid whose children should converge on scroll. Pair with
 * `ScrollConvergeItem` so the child element type — and therefore the markup
 * semantics — stays under the caller's control.
 */
export function ScrollConvergeGroup({
  children,
  className,
  as = "div",
  spread = 55,
  lift = 34,
  scaleFrom = 0.88,
}: GroupProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...ENTER_OFFSET],
  });

  const value: GroupContext = {
    progress: reduceMotion ? null : scrollYProgress,
    count: Children.count(children),
    spread,
    lift,
    scaleFrom,
  };

  return (
    <ScrollConvergeContext.Provider value={value}>
      {as === "ul" ? (
        <ul ref={ref as React.Ref<HTMLUListElement>} className={className}>
          {children}
        </ul>
      ) : (
        <div ref={ref as React.Ref<HTMLDivElement>} className={className}>
          {children}
        </div>
      )}
    </ScrollConvergeContext.Provider>
  );
}

type ItemProps = {
  children: ReactNode;
  index: number;
  className?: string;
  as?: "div" | "li";
};

export function ScrollConvergeItem({
  children,
  index,
  className,
  as = "div",
}: ItemProps) {
  const { progress, count, spread, lift, scaleFrom } = useContext(
    ScrollConvergeContext,
  );

  // Hooks run unconditionally. With no group (or reduced motion) the fallback
  // sits at 1, so every transform resolves to its settled value.
  const settled = useMotionValue(1);
  const driver = progress ?? settled;

  const half = (count - 1) / 2 || 1;
  const ratio = (index - (count - 1) / 2) / half;

  const x = useTransform(driver, [0, SETTLE], [ratio * spread, 0]);
  // Negative, so a not-yet-settled item never extends the page bottom.
  const y = useTransform(driver, [0, SETTLE], [-Math.abs(ratio) * lift, 0]);
  const scale = useTransform(driver, [0, SETTLE], [scaleFrom, 1]);
  const opacity = useTransform(driver, [0, SETTLE * 0.6], [0, 1]);

  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag className={className} style={{ x, y, scale, opacity }}>
      {children}
    </Tag>
  );
}
