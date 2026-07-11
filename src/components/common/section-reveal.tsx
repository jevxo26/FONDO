"use client"

import { createContext, forwardRef, useContext } from "react"
import { motion, type Variants, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"
type Variant = "fadeSlide" | "fadeScale" | "clipReveal" | "rotateReveal"

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  variant?: Variant
  direction?: Direction
  distance?: number
  duration?: number
  delay?: number
  once?: boolean
  threshold?: number
  noSlide?: boolean
  stagger?: boolean
  staggerDelay?: number
}

interface ItemProps extends HTMLMotionProps<"div"> {
  className?: string
}

type RevealCtxValue = {
  variant: Variant
  direction: Direction
  distance: number
}

const RevealCtx = createContext<RevealCtxValue>({ variant: "fadeSlide", direction: "up", distance: 60 })

const springEase = [0.22, 1, 0.36, 1] as const

function buildVariants(v: Variant, dir: Direction, dist: number, dur: number, del: number, noSlide: boolean) {
  const slideX = dir === "left" ? dist : dir === "right" ? -dist : 0
  const slideY = dir === "up" ? dist : dir === "down" ? -dist : 0
  const t = { duration: dur, delay: del, ease: springEase }

  switch (v) {
    case "fadeScale":
      return { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: t } }
    case "clipReveal":
      return { hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: t } }
    case "rotateReveal":
      return { hidden: { opacity: 0, x: slideX, y: slideY, rotateX: 15 }, visible: { opacity: 1, x: 0, y: 0, rotateX: 0, transition: t } }
    default:
      return { hidden: { opacity: 0, x: noSlide ? 0 : slideX, y: noSlide ? 0 : slideY }, visible: { opacity: 1, x: 0, y: 0, transition: t } }
  }
}

export function SectionReveal({
  children, className, variant = "fadeSlide", direction = "up", distance = 60,
  duration = 0.6, delay = 0, once = true, threshold = 0.1, noSlide = false,
  stagger = false, staggerDelay = 0.08,
}: SectionRevealProps) {
  const v = buildVariants(variant, direction, distance, duration, delay, noSlide)

  const parent: Variants = stagger
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: staggerDelay, delayChildren: delay } } }
    : v

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
  )
}

const itemTransition = { duration: 0.5, ease: springEase }

export const SectionRevealItem = forwardRef<HTMLDivElement, ItemProps>(
  function SectionRevealItem({ className, ...props }, ref) {
    const { variant, direction, distance } = useContext(RevealCtx)
    const slideX = direction === "left" ? distance : direction === "right" ? -distance : 0
    const slideY = direction === "up" ? distance : direction === "down" ? -distance : 0

    const item: Variants = (() => {
      switch (variant) {
        case "fadeScale":
          return { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: itemTransition } }
        case "clipReveal":
          return { hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: itemTransition } }
        case "rotateReveal":
          return { hidden: { opacity: 0, x: slideX, y: slideY, rotateX: 15 }, visible: { opacity: 1, x: 0, y: 0, rotateX: 0, transition: itemTransition } }
        default:
          return { hidden: { opacity: 0, x: slideX, y: slideY }, visible: { opacity: 1, x: 0, y: 0, transition: itemTransition } }
      }
    })()

    return <motion.div ref={ref} className={cn(className)} variants={item} {...props} />
  },
)
