"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverEffectProps {
  children: ReactNode;
  className?: string;
}

export function HoverEffect({ children, className = "" }: HoverEffectProps) {
  return (
    <motion.div
      className={`${className} cursor-pointer`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
} 