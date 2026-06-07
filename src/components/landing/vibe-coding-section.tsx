"use client";

import {
  getFeaturedVibeProjects,
  VIBE_PROJECTS,
} from "@/constants/vibe-projects";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function VibeCodingSection() {
  const featured = getFeaturedVibeProjects().slice(0, 3);
  const totalCount = VIBE_PROJECTS.length;

  return (
    <section
      id="vibe-coding"
      className="relative py-24 bg-background overflow-hidden border-t-4 border-foreground"
    >
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="flex flex-col gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brutal-accent text-background">
              <Sparkles className="w-6 h-6" strokeWidth={3} />
            </div>
            <span className="brutal-label text-muted-foreground">
              AI × Creative Coding
            </span>
          </div>
          <h2
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none glitch"
            data-text="Vibe Coding"
          >
            Vibe Coding
          </h2>
          <div className="flex items-center gap-6">
            <p className="text-muted-foreground text-base md:text-lg">
              AI와 함께 몰입하며 만들어낸 실험적인 프로젝트들.
            </p>
            <span className="brutal-label text-muted-foreground whitespace-nowrap">
              {totalCount} Exhibits
            </span>
          </div>
        </motion.div>

        {/* Featured exhibits preview */}
        <div className="space-y-0 mb-12">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/vibe`}
                className="group flex items-center gap-6 py-6 border-b-2 border-foreground/10 hover:border-foreground/40 transition-colors"
              >
                <span className="text-4xl md:text-5xl font-black text-muted-foreground/30 font-mono tabular-nums group-hover:text-foreground/50 transition-colors">
                  {String(project.exhibitNumber).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight truncate">
                      {project.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        project.aiTool === "Claude"
                          ? "bg-brutal-accent text-background"
                          : project.aiTool === "Gemini"
                            ? "bg-brutal-accent-secondary text-background"
                            : "bg-foreground text-background"
                      }`}
                    >
                      {project.aiTool}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {project.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Enter Exhibition CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/vibe"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-bold uppercase tracking-wider border-brutal shadow-brutal shadow-brutal-hover"
          >
            <span>Enter Exhibition</span>
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              strokeWidth={3}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
