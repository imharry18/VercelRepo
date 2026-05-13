"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { margin: "0px 0px -50px 0px", once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      animate("span", {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      }, {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      });
      setHasAnimated(true);
    }
  }, [isInView, animate, filter, duration, hasAnimated]);

  // Fail-safe
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        animate("span", { opacity: 1, filter: "none" }, { duration: 0.5 });
        setHasAnimated(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasAnimated, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              // CHANGED: Added 'className' here so the gradient applies to the text itself
              className={cn("opacity-0 inline-block mr-[0.2em]", className)}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    // Keep className here too for font-size/layout, but the gradient on text requires it on the span
    <div className={cn("font-bold leading-snug tracking-wide", className)}>
      {renderWords()}
    </div>
  );
};
