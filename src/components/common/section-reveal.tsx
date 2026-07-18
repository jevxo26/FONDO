"use client";

import { createContext, forwardRef, useContext } from "react";
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";
type Variant = "fadeSlide" | "fadeScale" | "clipReveal" | "rotateReveal" | "blurReveal" | "maskReveal" | "perspectiveReveal" | "elasticSlide";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
  noSlide?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
  blur?: number;
}

interface ItemProps extends HTMLMotionProps<"div"> {
  className?: string;
}

type RevealCtxValue = {
  variant: Variant;
  direction: Direction;
  distance: number;
};

const RevealCtx = createContext<RevealCtxValue>({
  variant: "fadeSlide",
  direction: "up",
  distance: 60,
});

const springEase = [0.22, 1, 0.36, 1] as const;
const smoothEase = [0.16, 1, 0.3, 1] as const;
const dramaticEase = [0.32, 0.72, 0, 1] as const;

function getEase(v: Variant) {
  if (v === "elasticSlide") return dramaticEase;
  if (v === "perspectiveReveal") return smoothEase;
  return v === "blurReveal" || v === "maskReveal" ? smoothEase : springEase;
}

function buildVariants(
  v: Variant,
  dir: Direction,
  dist: number,
  dur: number,
  del: number,
  noSlide: boolean,
  blurAmt: number,
) {
  const slideX = dir === "left" ? dist : dir === "right" ? -dist : 0;
  const slideY = dir === "up" ? dist : dir === "down" ? -dist : 0;
  const ease = getEase(v);
  const t = { duration: dur, delay: del, ease };

  switch (v) {
    case "fadeScale":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: t },
      };
    case "clipReveal":
      return {
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: t },
      };
    case "rotateReveal":
      return {
        hidden: { opacity: 0, x: slideX, y: slideY, rotateX: 15 },
        visible: { opacity: 1, x: 0, y: 0, rotateX: 0, transition: t },
      };
    case "blurReveal":
      return {
        hidden: { opacity: 0, filter: `blur(${blurAmt}px)`, y: noSlide ? 0 : slideY || dist * 0.5 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: t },
      };
    case "maskReveal":
      return {
        hidden: { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        visible: { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transition: t },
      };
    case "perspectiveReveal":
      return {
        hidden: { opacity: 0, rotateY: -15, translateZ: -50 },
        visible: { opacity: 1, rotateY: 0, translateZ: 0, transition: t },
      };
    case "elasticSlide":
      return {
        hidden: { opacity: 0, y: dist, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: t },
      };
    default:
      return {
        hidden: { opacity: 0, x: noSlide ? 0 : slideX, y: noSlide ? 0 : slideY },
        visible: { opacity: 1, x: 0, y: 0, transition: t },
      };
  }
}

export function SectionReveal({
  children,
  className,
  variant = "fadeSlide",
  direction = "up",
  distance = 60,
  duration = 0.7,
  delay = 0,
  once = true,
  threshold = 0.1,
  noSlide = false,
  stagger = false,
  staggerDelay = 0.08,
  blur: blurAmt = 8,
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const v = buildVariants(variant, direction, distance, duration, delay, noSlide, blurAmt);

  const parent: Variants = stagger
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: delay },
        },
      }
    : v;

  return (
    <RevealCtx.Provider value={{ variant, direction, distance }}>
      <motion.div
        className={cn(className)}
        variants={parent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
      >
        {children}
      </motion.div>
    </RevealCtx.Provider>
  );
}

function getItemEase(v: Variant) {
  if (v === "perspectiveReveal") return smoothEase;
  if (v === "elasticSlide") return dramaticEase;
  return v === "blurReveal" || v === "maskReveal" ? smoothEase : springEase;
}

export const SectionRevealItem = forwardRef<HTMLDivElement, ItemProps>(function SectionRevealItem(
  { className, ...props },
  ref,
) {
  const { variant, direction, distance } = useContext(RevealCtx);
  const slideX = direction === "left" ? distance : direction === "right" ? -distance : 0;
  const slideY = direction === "up" ? distance : direction === "down" ? -distance : 0;
  const ease = getItemEase(variant);
  const itemT = { duration: 0.5, ease };

  const item: Variants = (() => {
    switch (variant) {
      case "fadeScale":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: itemT },
        };
      case "clipReveal":
        return {
          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: itemT },
        };
      case "rotateReveal":
        return {
          hidden: { opacity: 0, x: slideX, y: slideY, rotateX: 15 },
          visible: { opacity: 1, x: 0, y: 0, rotateX: 0, transition: itemT },
        };
      case "blurReveal":
        return {
          hidden: { opacity: 0, filter: "blur(8px)", y: slideY || distance * 0.5 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: itemT },
        };
      case "maskReveal":
        return {
          hidden: { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          visible: { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transition: itemT },
        };
      case "perspectiveReveal":
        return {
          hidden: { opacity: 0, rotateY: -15, translateZ: -50 },
          visible: { opacity: 1, rotateY: 0, translateZ: 0, transition: itemT },
        };
      case "elasticSlide":
        return {
          hidden: { opacity: 0, y: distance, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1, transition: itemT },
        };
      default:
        return {
          hidden: { opacity: 0, x: slideX, y: slideY },
          visible: { opacity: 1, x: 0, y: 0, transition: itemT },
        };
    }
  })();

  return <motion.div ref={ref} className={cn(className)} variants={item} {...props} />;
});
