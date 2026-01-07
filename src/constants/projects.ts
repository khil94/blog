export interface Project {
  id: string;
  title: string;
  summary: string;
  detailedDescription: string;
  thumbnail: string;
  screenshots: string[];
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
    summary: "Next.js 16 기반 MDX 블로그",
    detailedDescription:
      "Next.js App Router, TailwindCSS v4, MDX를 활용한 개인 블로그 및 포트폴리오 사이트입니다. 다크모드, 코드 하이라이팅, RSS 피드, OG 이미지 자동 생성 등의 기능을 포함합니다. 브루탈리즘 디자인 시스템을 적용하여 독특한 시각적 경험을 제공합니다.",
    thumbnail: "/projects/blog/1.png",
    screenshots: [
      "/projects/blog/1.png",
      "/projects/blog/2.png",
      "/projects/blog/3.png",
      "/projects/blog/4.png",
      "/projects/blog/5.png",
    ],
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "MDX"],
    links: {
      live: "https://www.hyoil.blog",
      github: "https://github.com/khil94/blog",
    },
    featured: true,
    year: 2026,
  },
  {
    id: "project-2",
    title: "Github Viewer",
    summary: "Next.js 기반 Github profile viewer ",
    detailedDescription: `Next.js 기반으로 만든 Github Profile Viewer 서비스입니다. Github REST API, Github GrpahQL을 사용하여 사용자의 정보를 가져와 간단하게 가공한 후 가공한 내용을 바탕으로 시각적으로 사용자 정보의 통계를 보여줍니다. 또 두 사용자간의 궁합을 살펴보는 흥미위주의 컨텐츠도 포함합니다.`,
    thumbnail: "/projects/githubViewer/3.png",
    screenshots: [
      "/projects/githubViewer/1.png",
      "/projects/githubViewer/2.png",
      "/projects/githubViewer/3.png",
      "/projects/githubViewer/4.png",
      "/projects/githubViewer/5.png",
      "/projects/githubViewer/6.png",
    ],
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Zustand"],
    links: {
      live: "https://github-profile-viewer-virid-sigma.vercel.app/",
      github: "https://github.com/khil94/github-profile-viewer",
    },
    featured: true,
    year: 2025,
  },
  {
    id: "project-3",
    title: "One Minute Diary",
    summary: "Next + ai 기반 일기작성 PWA 서비스",
    detailedDescription: `next-pwa를 통해 Next 기반 웹 서비스를 pwa화 한 서비스 입니다. 사용자의 하루 회고를 작성하면 ai를 통해 분석하여 위로의 말이나 도움이 되는 피드백을 사용자에게 전하는 서비스입니다. shadcn을 통하여 통일감 있는 디자인을 하였으며, 전반적인 스타일링은 v0.dev를 통해 제작하였습니다.`,
    thumbnail: "/projects/diary/main.png",
    screenshots: [
      "/projects/diary/thumbnail.png",
      "/projects/diary/main.png",
      "/projects/diary/monthly.png",
      "/projects/diary/settings.png",
      "/projects/diary/weekly.png",
      "/projects/diary/achievement_1.png",
      "/projects/diary/achievement_2.png",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "v0.dev",
      "shadcn",
      "Zustand",
    ],
    links: {
      github: "https://github.com/khil94/5min-diary",
    },
    featured: true,
    year: 2025,
  },
  {
    id: "project-4",
    title: "Flutter Calendar",
    summary: "Flutter 기반 google calendar 연동 어플리케이션",
    detailedDescription: `Flutter 기반으로 사용자의 google 계정과 연동하여 사용자의 calendar 정보를 표기해주는 어플리케이션입니다. flutter + freezed + provider 환경에서 google api를 접목시켜 사용자의 데이터를 가져와 표기하는 것에 집중하였습니다. flutter 학습용 프로젝트이므로 사용자 calendar 정볼르 표기하는 선에서 완료하였습니다.`,
    thumbnail: "/projects/pathfinder/3.png",
    screenshots: [
      "/projects/pathfinder/1.png",
      "/projects/pathfinder/3.png",
      "/projects/pathfinder/4.png",
    ],
    tags: ["flutter", "v0.dev", "dart"],
    links: {
      github: "https://github.com/khil94/pathfinder",
    },
    featured: true,
    year: 2025,
  },
  {
    id: "project-5",
    title: "Match History",
    summary: "React+vite 기반 게임 전적 검색 사이트",
    detailedDescription: `React + Vite 기반으로 제작한 게임 '리그오브레전드'의 전적 검색 사이트입니다. 게임 회사의 api를 활용한 전적 검색과 JWT를 통한 사용자 정보 관리, 그리고 같이 게임할 사람 찾기 기능을 도입하였습니다.`,
    thumbnail: "/projects/lolstat/record.png",
    screenshots: [
      "/projects/lolstat/record.png",
      "/projects/lolstat/find_duo.png",
      "/projects/lolstat/expired_duo.png",
    ],
    tags: ["React", "Typescript", "Axios", "Vite", "Scss", "JWT"],
    links: {
      github: "https://github.com/khil94/record-fe",
    },
    featured: true,
    year: 2025,
  },
];

export const getFeaturedProjects = () =>
  PROJECTS.filter((project) => project.featured);

export const getProjectById = (id: string) =>
  PROJECTS.find((project) => project.id === id);

export const getProjectsByYear = () => {
  const grouped = PROJECTS.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, projects]) => ({ year: Number(year), projects }));
};
