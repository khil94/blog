"use client";

import { PROFILE, SKILLS } from "@/constants";
import { motion } from "framer-motion";
import { Code2, MapPin, Rocket, Sparkles } from "lucide-react";

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`relative p-6 bg-background border-brutal shadow-brutal shadow-brutal-hover ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

function SkillBadge({ name, level }: { name: string; level: string }) {
  const levelStyles = {
    advanced: "bg-foreground text-background",
    intermediate: "bg-background text-foreground border-brutal-thick",
    beginner:
      "bg-muted text-foreground border-2 border-dashed border-foreground",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-bold uppercase tracking-wide ${
        levelStyles[level as keyof typeof levelStyles]
      }`}
    >
      {name}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 border-t-4 border-foreground">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex items-baseline gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            About
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <BentoCard className="md:col-span-2 md:row-span-2" delay={0.1}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-foreground text-background">
                  <Code2 className="w-6 h-6" strokeWidth={3} />
                </div>
                <span className="brutal-label text-muted-foreground">
                  WHO I AM
                </span>
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">
                {PROFILE.role}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1">
                {PROFILE.bio}
              </p>
              <div className="mt-6 pt-6 border-t-2 border-dashed border-foreground/30">
                <p className="brutal-label text-muted-foreground">
                  Building interfaces that feel alive
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.2}>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" strokeWidth={3} />
              <div>
                <p className="brutal-label text-muted-foreground mb-1">
                  Location
                </p>
                <span className="font-bold uppercase">{PROFILE.location}</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.25}>
            <div className="text-center">
              <p className="text-5xl font-black">1+</p>
              <p className="brutal-label text-muted-foreground mt-2">
                Years Coding
              </p>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2" delay={0.3}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" strokeWidth={3} />
                <span className="font-bold uppercase">Primary Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.primary.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.35}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5" strokeWidth={3} />
                <span className="font-bold uppercase">Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.secondary.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.4}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" strokeWidth={3} />
                <span className="font-bold uppercase">Collaboration</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.collaboration.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
