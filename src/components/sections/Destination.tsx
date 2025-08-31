"use client";

import { staggerContainerVariants } from "../animation";
import WorldMap from "../featured/worldMap/WorldMap";
import { motion } from "framer-motion";

const Destination = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainerVariants(0.2)}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <WorldMap />
    </motion.section>
  );
};

export default Destination;
