"use client";

import {
  getAllVibeProjects,
  type VibeProject,
} from "@/constants/vibe-projects";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Bot,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Monitor,
  Smartphone,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const projects = getAllVibeProjects();

function getAiToolStyle(tool: string) {
  switch (tool) {
    case "Claude":
      return "bg-brutal-accent text-background";
    case "Opencode":
      return "bg-brutal-accent-secondary text-background";
    case "GPT":
    default:
      return "bg-foreground text-background";
  }
}

function formatExhibitNumber(n: number) {
  return `No.${String(n).padStart(2, "0")}`;
}

export default function VibePage() {
  const [selectedProject, setSelectedProject] = useState<VibeProject>(
    projects[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Scroll Lock
  useEffect(() => {
    if (activeImageIndex === null) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    };
  }, [activeImageIndex !== null]);

  return (
    <main className="bg-background text-foreground">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center border-b-4 border-foreground noise-overlay">
        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
          <span className="brutal-label text-brutal-accent flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI × Creative Coding
          </span>
          <h1
            className="glitch text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none"
            data-text="VIBE CODING"
          >
            VIBE CODING
          </h1>
          <p className="text-lg sm:text-xl font-mono uppercase tracking-widest text-muted-foreground">
            AI × Creative Coding Exhibition
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="brutal-label border-brutal px-3 py-1 flex items-center gap-2">
              <Bot className="h-4 w-4" />
              {projects.length} Exhibits
            </span>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* ===== SPLIT PANE ===== */}
      <div className="flex flex-col md:flex-row">
        <aside
          className={`w-full md:w-[35%] md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] border-b-4 md:border-b-0 md:border-r-4 border-foreground bg-background ${
            activeImageIndex !== null ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          <div className="border-b-4 border-foreground px-4 py-3">
            <span className="brutal-label text-muted-foreground">
              전시 목록
            </span>
          </div>
          <ul>
            {projects.map((project) => {
              const isSelected = selectedProject.id === project.id;
              return (
                <li key={project.id}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left px-4 py-4 border-b border-foreground/20 transition-colors duration-100 cursor-pointer ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`brutal-label ${
                          isSelected
                            ? "text-background/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatExhibitNumber(project.exhibitNumber)}
                      </span>
                      <span
                        className={`brutal-label px-2 py-0.5 text-[0.625rem] ${
                          isSelected
                            ? "bg-background text-foreground"
                            : getAiToolStyle(project.aiTool)
                        }`}
                      >
                        {project.aiTool}
                      </span>
                    </div>
                    <h3 className="font-black uppercase tracking-tight text-sm leading-tight">
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        isSelected
                          ? "text-background/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      {project.subtitle}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="w-full md:w-[65%] min-h-[calc(100vh-3.5rem)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6 sm:p-8 md:p-12"
            >
              <div className="mb-8">
                <span className="brutal-label text-brutal-accent text-lg">
                  {formatExhibitNumber(selectedProject.exhibitNumber)}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mt-2">
                  {selectedProject.title}
                </h2>
                <p className="text-lg text-muted-foreground mt-2 font-mono">
                  {selectedProject.subtitle}
                </p>
              </div>

              {(() => {
                const img1 = selectedProject.thumbnail;
                const img2 =
                  selectedProject.screenshots.find((s) => s !== img1) ||
                  selectedProject.screenshots[0] ||
                  img1;
                const img1Index = selectedProject.screenshots.indexOf(img1);
                const img2Index = selectedProject.screenshots.indexOf(img2);
                const idx1 = img1Index !== -1 ? img1Index : 0;
                const idx2 =
                  img2Index !== -1
                    ? img2Index
                    : selectedProject.screenshots.length > 1
                    ? 1
                    : 0;

                return selectedProject.platform === "web" ? (
                  <div className="flex justify-center items-center py-6 mb-8 overflow-visible">
                    <div className="relative w-full max-w-[620px] h-[320px] sm:h-[360px] flex items-center justify-center">
                      <motion.div
                        className="absolute aspect-video w-[290px] sm:w-[330px] border-4 border-foreground shadow-brutal bg-muted overflow-hidden cursor-pointer"
                        style={{ right: "5%", top: "10%", zIndex: 10 }}
                        initial={{ rotate: 5, x: 10, y: 10, opacity: 0.85 }}
                        whileHover={{
                          rotate: 1,
                          x: 25,
                          y: -10,
                          opacity: 1,
                          scale: 1.05,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        onClick={() => setActiveImageIndex(idx2)}
                      >
                        <Image
                          src={img2}
                          alt="back"
                          fill
                          className="object-cover"
                          sizes="330px"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute aspect-video w-[340px] sm:w-[390px] border-4 border-foreground shadow-brutal bg-muted overflow-hidden z-20 cursor-pointer"
                        style={{ left: "5%", bottom: "5%" }}
                        initial={{ rotate: -3, x: -10, y: 0 }}
                        whileHover={{ rotate: 0, x: -25, y: -15, scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        onClick={() => setActiveImageIndex(idx1)}
                      >
                        <Image
                          src={img1}
                          alt="front"
                          fill
                          className="object-cover"
                          sizes="390px"
                        />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-6 mb-8 overflow-visible">
                    <div className="relative w-full max-w-[380px] h-[480px] sm:h-[540px] flex items-center justify-center">
                      <motion.div
                        className="absolute aspect-[9/19] w-[180px] sm:w-[200px] border-4 border-foreground shadow-brutal bg-muted overflow-hidden cursor-pointer"
                        style={{
                          right: "10%",
                          zIndex: 10,
                          transformOrigin: "bottom center",
                        }}
                        initial={{ rotate: 10, x: 15, y: 15, opacity: 0.85 }}
                        whileHover={{
                          rotate: 4,
                          x: 30,
                          y: -10,
                          opacity: 1,
                          scale: 1.05,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        onClick={() => setActiveImageIndex(idx2)}
                      >
                        <Image
                          src={img2}
                          alt="back"
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute aspect-[9/19] w-[210px] sm:w-[230px] border-4 border-foreground shadow-brutal bg-muted overflow-hidden z-20 cursor-pointer"
                        style={{
                          left: "10%",
                          transformOrigin: "bottom center",
                        }}
                        initial={{ rotate: -8, x: -15, y: 0 }}
                        whileHover={{ rotate: -2, x: -30, y: -20, scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        onClick={() => setActiveImageIndex(idx1)}
                      >
                        <Image
                          src={img1}
                          alt="front"
                          fill
                          className="object-cover"
                          sizes="230px"
                        />
                      </motion.div>
                    </div>
                  </div>
                );
              })()}

              <div className="mb-8">
                <span className="brutal-label text-muted-foreground block mb-3">
                  설명
                </span>
                <p className="text-base sm:text-lg leading-relaxed max-w-2xl">
                  {selectedProject.description}
                </p>
              </div>
              <div className="mb-8">
                <span className="brutal-label text-muted-foreground block mb-3">
                  기술 스택
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="brutal-label border-brutal px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {selectedProject.screenshots.length > 1 && (
                <div className="mb-8">
                  <span className="brutal-label text-muted-foreground block mb-3">
                    스크린샷
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProject.screenshots.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-[9/16] border-2 border-foreground overflow-hidden group cursor-pointer bg-muted"
                        onClick={() => setActiveImageIndex(i)}
                      >
                        <Image
                          src={src}
                          alt={`screenshot ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-4 mb-8">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-black uppercase tracking-wider text-sm border-4 border-foreground shadow-brutal shadow-brutal-hover"
                  >
                    <ExternalLink className="h-4 w-4" />
                    데모 보기
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 font-black uppercase tracking-wider text-sm border-4 border-foreground shadow-brutal shadow-brutal-hover"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 border-t-4 border-foreground pt-6">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={`brutal-label px-2 py-0.5 ${getAiToolStyle(
                      selectedProject.aiTool
                    )}`}
                  >
                    {selectedProject.aiTool}
                  </span>
                </div>
                <span className="brutal-label text-muted-foreground">
                  {selectedProject.createdAt}
                </span>
                <div className="flex items-center gap-1">
                  {selectedProject.platform === "web" ? (
                    <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className="brutal-label text-muted-foreground">
                    {selectedProject.platform}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {/* ===== IMAGE MODAL ===== */}
      {activeImageIndex !== null && (
        <ScreenshotModal
          project={selectedProject}
          activeIndex={activeImageIndex}
          onChangeIndex={setActiveImageIndex}
          onClose={() => setActiveImageIndex(null)}
        />
      )}
    </main>
  );
}

function ScreenshotModal({
  project,
  activeIndex,
  onChangeIndex,
  onClose,
}: {
  project: VibeProject;
  activeIndex: number;
  onChangeIndex: (i: number | ((prev: number | null) => number | null)) => void;
  onClose: () => void;
}) {
  const prev = () =>
    onChangeIndex((p) =>
      p !== null && p > 0 ? p - 1 : project.screenshots.length - 1
    );
  const next = () =>
    onChangeIndex((p) =>
      p !== null && p < project.screenshots.length - 1 ? p + 1 : 0
    );

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md bg-transparent cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[12.5vh] bottom-[12.5vh] left-8 right-8 max-w-5xl my-0 mx-auto cursor-default"
      >
        <div className="absolute top-0 left-0 right-71 bottom-0 flex items-center justify-center p-6 overflow-hidden bg-muted border-4 border-foreground">
          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute z-30 left-4 bg-background hover:bg-muted text-foreground p-2 border-3 border-foreground shadow-brutal-sm cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 stroke-3" />
          </button>

          <div className="relative w-full h-full">
            <Image
              src={project.screenshots[activeIndex]}
              alt={`screenshot ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="70vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute z-30 right-4 bg-background hover:bg-muted text-foreground p-2 border-3 border-foreground shadow-brutal-sm cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 stroke-3" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background border-2 border-foreground px-3 py-1 font-mono text-xs font-bold shadow-brutal-sm">
            {activeIndex + 1} / {project.screenshots.length}
          </div>
        </div>

        <div
          data-lenis-prevent
          className="absolute top-0 right-0 bottom-0 w-70 overflow-y-auto overflow-x-hidden bg-background border-4 border-foreground border-l-0"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 border-b-4 border-foreground p-3 bg-muted font-black text-xs uppercase tracking-wider text-muted-foreground">
            SCREENSHOTS ({project.screenshots.length})
          </div>

          {/* Thumbnail list */}
          <div className="p-3">
            {project.screenshots.map((src, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: i < project.screenshots.length - 1 ? 12 : 0,
                  }}
                >
                  <button
                    onClick={() => onChangeIndex(i)}
                    className="relative block cursor-pointer overflow-hidden outline-offset-2 transition-all duration-150"
                    style={{
                      width: project.platform === "web" ? "100%" : 140,
                      aspectRatio: project.platform === "web" ? "16/9" : "9/16",
                      margin: project.platform === "web" ? undefined : "0 auto",
                      border: isActive
                        ? "2px solid var(--brutal-accent)"
                        : "2px solid var(--foreground)",
                      opacity: isActive ? 0.85 : 1,
                      outline: isActive
                        ? "2px solid var(--brutal-accent)"
                        : "none",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`thumb ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center
                        ${isActive ? " bg-accent/10" : "bg-transparent"}
                        `}
                    >
                      <span
                        className="py-0.5 px-1.5 border border-foreground font-mono text-xs font-black"
                        style={{
                          background: isActive
                            ? "var(--brutal-accent)"
                            : "var(--background)",
                          color: isActive
                            ? "var(--background)"
                            : "var(--foreground)",
                          boxShadow: "2px 2px 0 0 var(--foreground)",
                        }}
                      >
                        #{i + 1}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-60 p-2 border-4 border-foreground bg-brutal-accent text-background cursor-pointer shadow-2xl shadow-foreground"
        >
          <X className="h-5 w-5 stroke-3" />
        </button>
      </div>
    </div>
  );
}
