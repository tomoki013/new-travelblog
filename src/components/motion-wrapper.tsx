"use client";

import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
}

const MotionWrapper = ({ children }: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="prose prose-lg max-w-none mt-12"
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
