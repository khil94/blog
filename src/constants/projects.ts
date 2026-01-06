export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    article?: string;
  };
  featured: boolean;
  year: number;
}

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Portfolio Blog",
    description: "Next.js 16 기반 MDX 블로그 & 포트폴리오 사이트",
    longDescription:
      "Next.js App Router, TailwindCSS v4, MDX를 활용한 개인 블로그 및 포트폴리오 사이트입니다. 다크모드, 코드 하이라이팅, RSS 피드, OG 이미지 자동 생성 등의 기능을 포함합니다.",
    thumbnail: "/thumbnails/nextjs.svg",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "MDX"],
    links: {
      live: "https://your-blog.vercel.app",
      github: "https://github.com/your-username/blog",
    },
    featured: true,
    year: 2024,
  },
];

export const getFeaturedProjects = () =>
  PROJECTS.filter((project) => project.featured);

export const getProjectsByYear = () => {
  const grouped = PROJECTS.reduce(
    (acc, project) => {
      const year = project.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(project);
      return acc;
    },
    {} as Record<number, Project[]>
  );

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, projects]) => ({ year: Number(year), projects }));
};
