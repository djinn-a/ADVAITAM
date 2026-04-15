import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface AnimatedFeatureListProps {
  items: string[];
  className?: string;
  staggerDelay?: number;
}

export const AnimatedFeatureList = ({
  items,
  className = "",
  staggerDelay = 0.08,
}: AnimatedFeatureListProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex items-start gap-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{
              delay: 0.2 + index * staggerDelay,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          </motion.div>
          <span className="font-medium">{item}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

import { CheckCircle2 } from "lucide-react";
