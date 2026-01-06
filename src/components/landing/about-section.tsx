"use client";

import { motion } from "framer-motion";
import { MapPin, Code2, Sparkles, Rocket } from "lucide-react";
import { PROFILE, SKILLS } from "@/constants";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

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
      className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors ${className}`}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function SkillBadge({ name, level }: { name: string; level: string }) {
  const levelColors = {
    advanced: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    beginner: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${levelColors[level as keyof typeof levelColors]}`}
    >
      {name}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoCard className="md:col-span-2" delay={0.1}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{PROFILE.role}</h3>
                <p className="text-neutral-400 leading-relaxed">{PROFILE.bio}</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.2}>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-neutral-400" />
              <span className="text-neutral-300">{PROFILE.location}</span>
            </div>
          </BentoCard>

          <BentoCard delay={0.3}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-400" />
                <span className="font-medium">Primary Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.primary.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.4}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Secondary Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.secondary.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.5}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Exploring</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.exploring.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
