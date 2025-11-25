"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";

const stopColor1 = "rgba(255, 215, 0, 0)"; // Gold, transparent
const stopColor2 = "rgba(255, 215, 0, 0.7)"; // Gold, semi-transparent

const Background = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 1; // 1 to 4 seconds
      const delay = Math.random() * -5;
      const angle = -10 + Math.random() * 20; // -10 to 10 degrees
      const length = Math.random() * 80 + 20; // 20 to 100
      const strokeWidth = Math.random() * 2 + 0.5; // 0.5 to 2.5

      return {
        id: i,
        x,
        y,
        duration,
        delay,
        angle,
        length,
        strokeWidth,
      };
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden"
      aria-hidden="true"
    >
      <svg className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={stopColor1} />
            <stop offset="100%" stopColor={stopColor2} />
          </linearGradient>
          <filter id="blur-filter">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        {particles.map((p) => (
          <path
            key={p.id}
            d={`M 0 0 L ${p.length} 0`}
            stroke="url(#star-gradient)"
            strokeWidth={p.strokeWidth}
            strokeLinecap="round"
            className="animate-shooting-star"
            style={
              {
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
                "--x-start": `${p.x}vw`,
                "--y-start": `${p.y}vh`,
                "--angle": `${p.angle}deg`,
                "--movement": "30vw",
              } as React.CSSProperties
            }
            filter="url(#blur-filter)"
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </div>
  );
};

export default Background;
