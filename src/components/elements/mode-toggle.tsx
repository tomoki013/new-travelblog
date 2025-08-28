import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return <button className="w-14 h-8" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground relative overflow-hidden w-14 h-8 flex items-center border border-border"
    >
      <AnimatePresence initial={false}>
        {theme === "light" && (
          <motion.span
            key="sun"
            initial={{ x: 32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 32, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
              mass: 1.2,
            }}
            className="absolute left-1.5"
          >
            <SunIcon className="h-5 w-5" />
          </motion.span>
        )}
        {theme === "dark" && (
          <motion.span
            key="moon"
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -32, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
              mass: 1.2,
            }}
            className="absolute right-1.5"
          >
            <MoonIcon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ModeToggle;
