"use client";

import type { Food } from "@/types/food";
import { motion } from "framer-motion";
import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface HeroProps {
  foods: Food[];
}

export function Hero({ foods }: HeroProps) {
  return (
    <section className="py-6 lg:py-8">
      <div className="wrapper">
        <motion.div
          className="flex flex-col items-start gap-8 md:flex-row md:justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={childVariants} className="w-full lg:max-w-[608px]">
            <HeroContent />
          </motion.div>
          <motion.div variants={childVariants} className="w-full lg:max-w-[500px] xl:max-w-[681px]">
            <HeroImage foods={foods} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
