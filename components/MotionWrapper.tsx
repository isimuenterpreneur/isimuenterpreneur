"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  variants: Variants;
  className?: string;
  initial?: string;
  whileInView?: string;
  viewport?: { once?: boolean; amount?: number };
};

const MotionWrapper = ({
  children,
  variants,
  className,
  initial = "hidden",
  whileInView = "visible",
  viewport = { once: true, amount: 0.3 },
}: MotionWrapperProps) => {
  return (
    <motion.div variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} className={className}>
      {children}
    </motion.div>
  );
};

export default MotionWrapper;