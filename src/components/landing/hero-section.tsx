"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "@/constants";

export function HeroSection() {
  const words = PROFILE.tagline.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="text-center space-y-8">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-4 last:mr-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <span className="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
                {word}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {PROFILE.bio}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="#about"
            className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
          >
            About Me
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-neutral-700 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <a href="#about" className="text-neutral-500 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
}
