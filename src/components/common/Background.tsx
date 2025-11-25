"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";

const Background = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const particleColor = useMemo(() => {
    if (!mounted) {
      return "#ffffff"; // SSR/initial fallback
    }
    return theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  }, [mounted, theme]);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * -20;
      return {
        id: i,
        size,
        x,
        y,
        duration,
        delay,
      };
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-background"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="blur-filter">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={particleColor}
            className="animate-particle"
            style={
              {
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
                "--x-start": `${p.x}%`,
                "--y-start": `${p.y}%`,
                "--x-end": `${Math.random() * 100}%`,
                "--y-end": `${Math.random() * 100}%`,
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
