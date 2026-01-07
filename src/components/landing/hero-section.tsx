"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PROFILE } from "@/constants";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden noise-overlay"
    >
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-r border-border/10 last:border-r-0" />
        ))}
      </div>

      <div className="absolute top-8 left-8 brutal-label text-muted-foreground">
        [{new Date().getFullYear()}]
      </div>
      <div className="absolute top-8 right-8 brutal-label text-muted-foreground">
        SEOUL, KR
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ y, opacity }}
      >
        <div className="overflow-hidden mb-4">
          <motion.p
            className="brutal-label text-brutal-accent tracking-[0.3em]"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            FRONTEND DEVELOPER
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter uppercase"
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-stroke">{PROFILE.tagline.split(" ")[0]}</span>
            <span className="block">{PROFILE.tagline.split(" ").slice(1).join(" ")}</span>
          </motion.h1>
        </div>

        <motion.div
          className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <p className="max-w-md text-lg text-muted-foreground border-l-4 border-foreground pl-4">
            {PROFILE.bio}
          </p>

          <div className="flex gap-4">
            <a
              href="#about"
              className="group px-8 py-4 bg-foreground text-background font-bold uppercase tracking-wider border-brutal shadow-brutal shadow-brutal-hover"
            >
              About Me
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-background text-foreground font-bold uppercase tracking-wider border-brutal shadow-brutal shadow-brutal-hover"
            >
              Projects
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t-4 border-foreground bg-foreground text-background py-3">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="brutal-label text-sm mx-8">
              INTERACTIVE WEB • AI INTEGRATION • CREATIVE DEVELOPMENT • REACT • NEXT.JS • TYPESCRIPT •
            </span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="brutal-label">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" strokeWidth={3} />
        </motion.div>
      </motion.a>
    </section>
  );
}
