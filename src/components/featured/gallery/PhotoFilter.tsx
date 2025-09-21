"use client";
import { sectionVariants } from "@/components/animation";
import { motion } from "framer-motion";

interface PhotoFilterProps {
  filterList: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const PhotoFilter = ({
  filterList,
  activeFilter,
  setActiveFilter,
}: PhotoFilterProps) => {
  return (
    <motion.div
      variants={sectionVariants}
      className="flex justify-center flex-wrap gap-2 mb-12"
    >
      {filterList.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 relative ${
            activeFilter === filter
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeFilter === filter && (
            <motion.div
              layoutId="active-filter-background"
              className="absolute inset-0 bg-teal-600 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">
            {activeFilter === filter ? filter : filter.split("・")[0]}
          </span>
        </button>
      ))}
    </motion.div>
  );
};

export default PhotoFilter;
