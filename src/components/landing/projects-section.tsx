"use client";

import { getFeaturedProjects, type Project } from "@/constants/projects";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, ExternalLink, Github, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(
    null
  );

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.article
        data-lenis-prevent
        className="relative w-full max-w-6xl h-[85vh] overflow-y-auto overscroll-contain bg-background border-brutal-heavy shadow-brutal-xl flex flex-col"
        layoutId={`project-card-${project.id}`}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 md:p-6 border-b-4 border-foreground bg-background">
          <span className="brutal-label text-muted-foreground">
            Project Details // {project.year}
          </span>
          <button
            onClick={onClose}
            className="p-2 bg-foreground text-background hover:bg-brutal-accent transition-colors shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[40vh] md:h-[50vh] shrink-0 border-b-4 border-foreground overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 bg-background/90 border-t-4 border-r-4 border-foreground backdrop-blur-md">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-10">
          <div className="grid md:grid-cols-12 gap-10">
            {/* Left Column: Description & Gallery */}
            <div className="md:col-span-8 space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase border-b-4 border-foreground inline-block pb-1">
                  Overview
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.detailedDescription}
                </p>
              </div>

              {project.screenshots.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase border-b-4 border-foreground inline-block pb-1">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, i) => (
                      <div
                        key={i}
                        className="relative aspect-video border-brutal overflow-hidden group cursor-zoom-in"
                        onClick={() => setSelectedScreenshot(screenshot)}
                      >
                        <Image
                          src={screenshot}
                          alt={`${project.title} screenshot ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Metadata & Links */}
            <div className="md:col-span-4 space-y-8 h-fit md:sticky md:top-6">
              <div className="p-6 border-brutal bg-muted/30">
                <h4 className="font-bold uppercase text-sm text-muted-foreground mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-bold uppercase bg-background border-2 border-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 bg-foreground text-background font-bold uppercase tracking-wider hover:bg-brutal-accent transition-colors shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-5 h-5" strokeWidth={3} />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 bg-background text-foreground border-brutal font-bold uppercase tracking-wider hover:bg-muted transition-colors shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  >
                    <span>View Code</span>
                    <Github className="w-5 h-5" strokeWidth={3} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Lightbox for Screenshots */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            className="fixed inset-0 z-150 flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScreenshot(null)}
          >
            <motion.div
              className="relative w-full max-w-7xl aspect-video"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedScreenshot}
                alt="Enlarged screenshot"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-brutal-accent transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-brutal-accent transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectListItem({
  project,
  index,
  onSelect,
  setHoveredProject,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  setHoveredProject: (project: Project | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative border-b-4 border-foreground hover:bg-muted/50 transition-colors cursor-none"
      onMouseEnter={() => setHoveredProject(project)}
      onMouseLeave={() => setHoveredProject(null)}
      onClick={() => onSelect(project)}
    >
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="text-xl md:text-2xl font-mono font-bold text-muted-foreground">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-300">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 md:gap-8 pl-12 md:pl-0">
          <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-xs">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-sm font-bold uppercase text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xl font-bold font-mono group-hover:text-brutal-accent transition-colors">
            {project.year}
          </span>
          <ArrowRight
            className="w-8 h-8 md:w-12 md:h-12 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
            strokeWidth={2}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const projects = getFeaturedProjects();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="projects"
      className="relative py-24 bg-background overflow-hidden border-t-4 border-foreground"
    >
      <div className="container mx-auto max-w-7xl px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-baseline gap-4"
        >
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">
            Projects
          </h2>
        </motion.div>
      </div>

      <div className="border-t-4 border-foreground">
        {projects.map((project, index) => (
          <ProjectListItem
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
            setHoveredProject={setHoveredProject}
          />
        ))}
      </div>

      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block w-100 h-80 border-4 border-foreground bg-background overflow-hidden shadow-brutal-xl"
        style={{
          x: springX,
          y: springY,
          top: -150,
          left: 50,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: hoveredProject ? 1 : 0,
          opacity: hoveredProject ? 1 : 0,
          rotate: hoveredProject ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hoveredProject && (
          <Image
            src={hoveredProject.thumbnail}
            alt="Preview"
            fill
            className="object-cover"
          />
        )}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
