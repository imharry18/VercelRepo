"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { usePathname } from "next/navigation";

export const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const pathname = usePathname();
  
  // Manually track visibility instead of relying on the declarative whileInView prop
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      key={pathname} // Forces a fresh mount on route changes
      initial={{ 
        opacity: 0, 
        y: 20,                
        scale: 0.95,          
        filter: "blur(10px)"  
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)"
      } : {}}
      transition={{ 
        duration: 0.5,        
        ease: "easeOut",
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
