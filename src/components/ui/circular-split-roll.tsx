"use client";

import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;

const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

gsap.registerPlugin(ScrollTrigger);

function wrapProgress(value: number) {
  let wrappedValue = value % 1;

  if (wrappedValue < 0) {
    wrappedValue += 1;
  }

  return wrappedValue;
}

function getCircularPosition(
  progress: number,
  radiusX: number,
  radiusY: number,
  angleOffset = 0
) {
  const angle = progress * Math.PI * 2 + angleOffset;

  return {
    angle,
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    verticalDepth: Math.cos(angle),
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value: number) {
  return gsap.utils.clamp(
    0,
    1,
    gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value)
  );
}

function shapeFocus(strength: number, start = 0.42, power = 2.8) {
  const normalized = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(normalized, power);
}

export interface CircularSplitRollItem {
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
}

interface CircularSplitRollCompProps {
  items: CircularSplitRollItem[];
  className?: string;
  /** Optional background override. Falls back to the theme `bg-background`. */
  background?: string;
  /** Optional title color override. Falls back to the theme `text-foreground`. */
  titleColor?: string;
  /** CSS height of the pinned viewport (and the section's min-height). Defaults to a full screen. */
  viewportHeight?: string;
  /** Content pinned above the two columns for the whole scroll — stays on screen the entire time, unlike a heading placed outside this component. */
  header?: ReactNode;
  sectionHeight?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
  titleSize?: string;
  /** CSS width of the title/description text column. Must be a fixed unit (px/rem), not %. */
  textWidth?: string;
  pinSpacing?: boolean;
  scrub?: number;
  textCenterScale?: number;
  textSideScale?: number;
  textCenterOpacity?: number;
  textSideOpacity?: number;
  imageCenterScale?: number;
  imageSideScale?: number;
  imageCenterOpacity?: number;
  imageSideOpacity?: number;
  textFocusStart?: number;
  textFocusPower?: number;
  imageFocusStart?: number;
  imageFocusPower?: number;
  /** Angle (radians) on the circle where a title comes into focus. */
  leftAngleOffset?: number;
  /** Angle (radians) on the circle where an image comes into focus. */
  rightAngleOffset?: number;
  /** Which item sits on the focus arc, in item-fractions. 0.5 = between two, 0 = on one. */
  focusPhase?: number;
  /** Max z-index applied to the focused title / image (depth stacking). */
  leftDepthMax?: number;
  rightDepthMax?: number;
  /** Column horizontal offset: translateX(calc(<columnSpreadVw>vw - <columnOffsetPx>px)). */
  columnSpreadVw?: number;
  columnOffsetPx?: number;
  gridImageClassName?: string;
  gridCardClassName?: string;
  gridTitleClassName?: string;
}

function CircularSplitRollComp({
  items,
  className = "",
  background,
  titleColor,
  viewportHeight = "100vh",
  header,
  sectionHeight = 260,

  leftRadiusX = 220,
  leftRadiusY = 220,
  rightRadiusX = 400,
  rightRadiusY = 400,

  imageCardWidth = 190,
  imageCardHeight = 210,
  titleSize = "clamp(32px, 3.6vw, 64px)",
  textWidth = "26rem",

  pinSpacing = true,
  scrub = 1.2,

  textCenterScale = 1,
  textSideScale = 0.68,
  textCenterOpacity = 1,
  textSideOpacity = 0.18,

  imageCenterScale = 1,
  imageSideScale = 0.58,
  imageCenterOpacity = 1,
  imageSideOpacity = 0.14,

  textFocusStart = 0.42,
  textFocusPower = 2.6,
  imageFocusStart = 0.45,
  imageFocusPower = 3.2,

  leftAngleOffset = Math.PI,
  rightAngleOffset = 0,
  focusPhase = 0.5,
  leftDepthMax = 30,
  rightDepthMax = 40,
  columnSpreadVw = 5,
  columnOffsetPx = 500,

  gridImageClassName = "",
  gridCardClassName = "",
  gridTitleClassName = "",
}: CircularSplitRollCompProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  const safeItems = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id ?? index,
      title: item.title ?? `Item ${index + 1}`,
      description: item.description ?? "",
      image: item.image ?? "",
      alt: item.alt ?? item.title ?? `Item ${index + 1}`,
    }));
  }, [items]);

  useEffect(() => {
    if (!rootRef.current || !stickyRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const leftNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__left-item"
        ) as HTMLElement[];
        const rightNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__right-item"
        ) as HTMLElement[];

        const total = safeItems.length;

        if (!total) return;

        gsap.set([...leftNodes, ...rightNodes], { opacity: 1 });

        const render = (scrollProgress: number) => {
          progressRef.current = scrollProgress;

          const width =
            typeof window !== "undefined" ? window.innerWidth : DESKTOP_WIDTH;

          let factor = 1;

          if (width < DESKTOP_WIDTH && width >= TABLET_MIN_WIDTH) {
            factor = width / DESKTOP_WIDTH;
          }

          const leftRadiusScaledX = leftRadiusX * factor;
          const leftRadiusScaledY = leftRadiusY * factor;
          const rightRadiusScaledX = rightRadiusX * factor;
          const rightRadiusScaledY = rightRadiusY * factor;

          if (rootRef.current) {
            rootRef.current.style.setProperty(
              "--css-card-width",
              `${imageCardWidth * factor}px`
            );

            rootRef.current.style.setProperty(
              "--css-card-height",
              `${imageCardHeight * factor}px`
            );
          }

          leftNodes.forEach((node, index) => {
            const localProgress = wrapProgress(index / total - scrollProgress + focusPhase / total);

            const position = getCircularPosition(
              localProgress,
              leftRadiusScaledX,
              leftRadiusScaledY,
              leftAngleOffset
            );

            const rawStrength = getStrength(position.horizontalDepth);
            const focusStrength = shapeFocus(
              rawStrength,
              textFocusStart,
              textFocusPower
            );

            const scale = gsap.utils.interpolate(
              textSideScale,
              textCenterScale,
              focusStrength
            );

            const opacity = gsap.utils.interpolate(
              textSideOpacity,
              textCenterOpacity,
              focusStrength
            );

            const zIndex = Math.round(
              gsap.utils.interpolate(Z_INDEX_MIN, leftDepthMax, focusStrength)
            );

            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale,
              opacity,
              zIndex,
              transformOrigin: "50% 50%",
            });
          });

          rightNodes.forEach((node, index) => {
            const localProgress = wrapProgress(index / total - scrollProgress + focusPhase / total);

            const position = getCircularPosition(
              localProgress,
              rightRadiusScaledX,
              rightRadiusScaledY,
              rightAngleOffset
            );

            const rawStrength = getStrength(-position.horizontalDepth);
            const focusStrength = shapeFocus(
              rawStrength,
              imageFocusStart,
              imageFocusPower
            );

            const scale = gsap.utils.interpolate(
              imageSideScale,
              imageCenterScale,
              focusStrength
            );

            const opacity = gsap.utils.interpolate(
              imageSideOpacity,
              imageCenterOpacity,
              focusStrength
            );

            const zIndex = Math.round(
              gsap.utils.interpolate(Z_INDEX_MIN, rightDepthMax, focusStrength)
            );

            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale,
              opacity,
              zIndex,
              transformOrigin: "50% 50%",
            });
          });
        };

        render(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: `+=${sectionHeight * safeItems.length}%`,
          pin: stickyRef.current,
          scrub,
          pinSpacing,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            render(self.progress);
          },
        });

        const onResize = () => {
          render(progressRef.current);
          scrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          scrollTrigger.kill();
        };
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [
    safeItems,
    scrub,
    pinSpacing,
    sectionHeight,
    leftRadiusX,
    leftRadiusY,
    rightRadiusX,
    rightRadiusY,
    imageCardWidth,
    imageCardHeight,
    textCenterScale,
    textSideScale,
    textCenterOpacity,
    textSideOpacity,
    imageCenterScale,
    imageSideScale,
    imageCenterOpacity,
    imageSideOpacity,
    textFocusStart,
    textFocusPower,
    imageFocusStart,
    imageFocusPower,
    leftAngleOffset,
    rightAngleOffset,
    focusPhase,
    leftDepthMax,
    rightDepthMax,
  ]);

  return (
    <section
      ref={rootRef}
      className={`relative w-full overflow-clip ${background ? "" : "bg-background"} ${titleColor ? "" : "text-foreground"} ${className}`}
      style={{
        "--css-title-size": titleSize,
        "--css-card-width": `${imageCardWidth}px`,
        "--css-card-height": `${imageCardHeight}px`,
        minHeight: viewportHeight,
        ...(background ? { background } : null),
        ...(titleColor ? { color: titleColor } : null),
      } as React.CSSProperties & Record<string, string | number>}
    >
      <div
        ref={stickyRef}
        style={{ height: viewportHeight }}
        className={`relative flex w-full flex-col overflow-hidden ${reducedMotion ? "hidden" : "max-[1025px]:hidden"}`}
      >
        {header && <div className="relative z-10 shrink-0">{header}</div>}

        <div aria-hidden="true" className="relative w-full flex-1 overflow-hidden">
        <div className="relative mx-auto flex h-full w-full">
          <div
            className="relative flex h-full w-[40vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnSpreadVw}vw - ${columnOffsetPx}px))` }}
          >
            <div className="relative h-[92%]">
              {safeItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__left-item pointer-events-none absolute left-1/2 top-1/2 origin-center text-center opacity-0 will-change-[transform,opacity]"
                  style={{ width: textWidth }}
                >
                  <h3 className="whitespace-nowrap text-(length:--css-title-size,clamp(28px,3vw,56px)) font-medium leading-none tracking-[-0.04em]">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex h-full w-[40vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnOffsetPx}px - ${columnSpreadVw}vw))` }}
          >
            <div className="relative h-[92%]">
              {safeItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__right-item absolute left-1/2 top-1/2 ml-[calc(var(--css-card-width,210px)*-0.5)] mt-[calc(var(--css-card-height,210px)*-0.5)] h-(--css-card-height,210px) w-(--css-card-width,210px) origin-center opacity-0 will-change-[transform,opacity]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_30px_60px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.16)]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="pointer-events-none block h-full w-full select-none object-cover absolute inset-0"
                      draggable="false"
                    />

                    <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/25 ring-1 ring-white/40 backdrop-blur-md">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M6 3l5 5-5 5"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <div className="absolute inset-x-2 bottom-2 rounded-[10px] bg-black/25 px-3 py-2.5 backdrop-blur-md">
                      <h4 className="text-[13px] leading-[1.2] font-medium text-white">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="mt-1 text-[11px] leading-[1.35] text-white/80">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {header && (
        // The pinned copy above lives inside a `max-[1025px]:hidden` (or, with
        // reduced motion, fully `hidden`) block, so it disappears exactly
        // where this plain copy needs to take over — never both at once.
        <div className={reducedMotion ? "block" : "hidden max-[1025px]:block"}>{header}</div>
      )}

      <div className={`w-full px-5 py-10 max-md:px-4 max-md:py-8 ${reducedMotion ? "block" : "sr-only max-[1025px]:not-sr-only max-[1025px]:block"}`}>
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-5 max-md:grid-cols-2 max-md:gap-4">
          {safeItems.map((item) => (
            <article
              key={item.id}
              className={`w-full ${gridCardClassName}`}
            >
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_18px_38px_rgba(0,0,0,0.28)] max-md:rounded-[14px] ${gridImageClassName}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="block h-full w-full object-cover absolute inset-0"
                  draggable="false"
                />
              </div>

              <h3
                className={`mt-3 text-center text-[clamp(18px,4vw,30px)] font-medium leading-none tracking-[-0.04em] text-foreground max-md:mt-2 max-md:text-[clamp(16px,5vw,24px)] ${gridTitleClassName}`}
              >
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-2 text-center text-[14px] leading-[1.5] opacity-70">
                  {item.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface CircularSplitRollProps
  extends Omit<
    CircularSplitRollCompProps,
    "leftRadiusX" | "leftRadiusY" | "rightRadiusX" | "rightRadiusY" | "imageCardWidth" | "imageCardHeight"
  > {
  /** Sets all four arc radii at once (leftRadiusX/Y, rightRadiusX/Y). */
  radius?: number;
  /** Sets both card dimensions at once (imageCardWidth/Height). */
  cardSize?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
}

export default function CircularSplitRoll({
  items,
  radius = 500,
  cardSize = 205,
  sectionHeight = 100,
  leftRadiusX,
  leftRadiusY,
  rightRadiusX,
  rightRadiusY,
  imageCardWidth,
  imageCardHeight,
  ...rest
}: CircularSplitRollProps) {
  return (
    <CircularSplitRollComp
      items={items}
      sectionHeight={sectionHeight}
      leftRadiusX={leftRadiusX ?? radius}
      leftRadiusY={leftRadiusY ?? radius}
      rightRadiusX={rightRadiusX ?? radius}
      rightRadiusY={rightRadiusY ?? radius}
      imageCardWidth={imageCardWidth ?? cardSize}
      imageCardHeight={imageCardHeight ?? cardSize}
      {...rest}
    />
  );
}
