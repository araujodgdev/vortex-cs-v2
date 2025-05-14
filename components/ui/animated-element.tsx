"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = "fade" | "slideUp" | "slideIn" | "scale" | "slide";

interface AnimatedElementProps {
  children: ReactNode;
  type: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedElement({
  children,
  type,
  delay = 0,
  duration = 0.5,
  className,
}: AnimatedElementProps) {
  const animationType = type === "slide" ? "slideUp" : type;
  
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
  };

  const animation = animations[animationType];

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 