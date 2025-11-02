"use client";
import { motion } from "motion/react";

export const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20,                // Slight slide up
        scale: 0.95,          // CHANGED: Less aggressive scale (0.9 -> 0.95) for smoother mobile feel
        filter: "blur(10px)"  // CHANGED: Reduced blur (20px -> 10px) for performance
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)"
      }}
      viewport={{ 
        once: true,
        margin: "0px",        // CHANGED: Removed negative margin so it triggers immediately
        amount: 0.1           // CHANGED: Only needs 10% visibility to trigger (was 0.2)
      }}
      transition={{ 
        duration: 0.5,        // CHANGED: Slightly faster duration (0.8 -> 0.5) feels snappier on mobile
        ease: "easeOut",
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
