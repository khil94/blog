export const PROFILE = {
  name: {
    ko: "김효일",
    en: "Kim Hyo-il",
  },
  role: "Frontend Developer",
  tagline: "Creative Frontend Developer",
  bio: "인터랙티브 웹과 AI 통합에 관심이 많은 주니어 프론트엔드 개발자입니다.",
  location: "Seoul, South Korea",
  email: "your-email@example.com",
  avatar: "/images/avatar.png",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/your-username",
  linkedin: "",
  twitter: "",
  instagram: "",
} as const;

export const SKILLS = {
  primary: [
    { name: "React", level: "advanced" },
    { name: "Next.js", level: "advanced" },
    { name: "TypeScript", level: "advanced" },
    { name: "Tailwind CSS", level: "advanced" },
  ],
  secondary: [
    { name: "Zustand", level: "intermediate" },
    { name: "React Query", level: "intermediate" },
    { name: "Framer Motion", level: "intermediate" },
  ],
  exploring: [
    { name: "Three.js", level: "beginner" },
    { name: "AI/LLM Integration", level: "beginner" },
  ],
} as const;

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Skill {
  name: string;
  level: SkillLevel;
}
