export interface VibeProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  tags: string[];
  aiTool: string;
  demoUrl?: string;
  githubUrl?: string;
  createdAt: string;
  featured: boolean;
  exhibitNumber: number;
  platform: "web" | "android" | "ios" | "cross-platform";
}

export const VIBE_PROJECTS: VibeProject[] = [
  {
    id: "snack-news",
    title: "SnackNews",
    subtitle: "AI 맞춤 뉴스 15초 숏폼 브리핑",
    description:
      "길고 지루한 뉴스는 그만! AI가 사용자가 고른 관심사만 15초 분량으로 정제하여 보여주는 뉴스 큐레이션 앱입니다. 카테고리(IT/테크, 경제, 디자인&UX 등)별 피드 큐레이션, 쇼츠 형태의 뉴스 소비, AI 브리핑, 키워드 기반 발견 기능을 제공합니다. 매주 금요일 퇴근길에 받는 주간 트렌드 리포트도 포함되어 있습니다.",
    thumbnail: "/projects/vibe-coding/snack-news/4.png",
    screenshots: [
      "/projects/vibe-coding/snack-news/1.png",
      "/projects/vibe-coding/snack-news/2.png",
      "/projects/vibe-coding/snack-news/3.png",
      "/projects/vibe-coding/snack-news/4.png",
      "/projects/vibe-coding/snack-news/5.png",
      "/projects/vibe-coding/snack-news/6.png",
      "/projects/vibe-coding/snack-news/7.png",
      "/projects/vibe-coding/snack-news/8.png",
    ],
    tags: ["Flutter", "Firebase", "AI/LLM", "RSS feed"],
    aiTool: "Opencode",
    createdAt: "2026-04",
    featured: true,
    exhibitNumber: 5,
    platform: "android",
  },
  {
    id: "planet-diary",
    title: "Planet Diary",
    subtitle: "일기로 행성을 키우는 게이미피케이션 일기장",
    description:
      "매일 일기를 쓰면 황폐한 행성이 점차 복원되는 게이미피케이션 일기 앱입니다. 하루 한 편 기록하면 행성 복원 진행도가 올라가고, 한 달이 끝나면 새 행성이 은하에 추가됩니다. 복셀 스타일의 3D 행성 모델, 월별 행성 수집 시스템, 은하 뷰 등 시각적 보상을 통해 꾸준한 일기 작성을 유도합니다.",
    thumbnail: "/projects/vibe-coding/planet-diary/1.png",
    screenshots: [
      "/projects/vibe-coding/planet-diary/1.png",
      "/projects/vibe-coding/planet-diary/2.png",
      "/projects/vibe-coding/planet-diary/3.png",
      "/projects/vibe-coding/planet-diary/4.png",
    ],
    tags: ["Flutter", "Gamification"],
    aiTool: "Claude",
    createdAt: "2026-04",
    featured: true,
    exhibitNumber: 4,
    platform: "android",
  },
  {
    id: "custom-setlog",
    title: "setlog",
    subtitle: "3초 영상 그룹 vlog 앱",
    description:
      "setlog의 카피앱으로, 그룹 단위 짧은 영상(3초) 촬영 및 공유 vlog 앱입니다. 그룹 방을 만들고 입장 코드를 통해 친구들을 초대한 뒤, 하루에 3초짜리 짧은 영상을 촬영하여 공유합니다. 순간의 자연스러운 기록에 초점을 맞추고 있습니다. 기존 앱에는 없는 하루 요약, 댓글 기능 등을 포함하고 있습니다.",
    thumbnail: "/projects/vibe-coding/custom-setlog/1.png",
    screenshots: [
      "/projects/vibe-coding/custom-setlog/1.png",
      "/projects/vibe-coding/custom-setlog/2.png",
      "/projects/vibe-coding/custom-setlog/3.png",
      "/projects/vibe-coding/custom-setlog/4.png",
      "/projects/vibe-coding/custom-setlog/5.png",
      "/projects/vibe-coding/custom-setlog/6.png",
    ],
    tags: ["Flutter", "Firebase Auth", "Firestore"],
    aiTool: "Codex",
    createdAt: "2026-05",
    featured: true,
    exhibitNumber: 3,
    platform: "android",
  },
  {
    id: "oracle-diary",
    title: "Oracle Diary",
    subtitle: "일기를 쓰면 AI가 내일의 운세를 점쳐주는 앱",
    description:
      '"오늘의 이야기가 내일의 운명을 비춥니다." 일기를 작성하면 별들의 배치를 읽어 운세 결과(점수, 메시지, 행운 아이템, 행운 컬러, 주의할 점, 수호신의 조언)를 제공합니다. 신비로운 밤하늘과 골드 색상 테마, 캘린더 뷰의 기록 히스토리 기능을 포함합니다.',
    thumbnail: "/projects/vibe-coding/oracle-diary/1.png",
    screenshots: [
      "/projects/vibe-coding/oracle-diary/1.png",
      "/projects/vibe-coding/oracle-diary/2.png",
      "/projects/vibe-coding/oracle-diary/3.png",
      "/projects/vibe-coding/oracle-diary/4.png",
      "/projects/vibe-coding/oracle-diary/5.png",
      "/projects/vibe-coding/oracle-diary/6.png",
      "/projects/vibe-coding/oracle-diary/7.png",
    ],
    tags: ["Flutter", "AI/LLM", "AdMob"],
    aiTool: "Opencode",
    createdAt: "2026-03",
    featured: false,
    exhibitNumber: 2,
    platform: "android",
  },
  {
    id: "chrono-breaker",
    title: "Chrono Breaker",
    subtitle: "시간 왜곡 메커닉 로그라이트 슈팅 게임",
    description:
      "시간 왜곡(Time Distortion) 메커닉이 있는 웹 기반 로그라이트 슈팅 게임입니다. 적이 위에서 내려오고 플레이어가 자동 사격하며 드래그로 이동합니다. 레벨업 시 Epic/Uncommon 등급의 업그레이드를 선택하는 로그라이트 요소가 포함되어 있으며, 모바일 터치 조작에 최적화되어 있습니다.",
    thumbnail: "/projects/vibe-coding/chrono-breaker/1.png",
    screenshots: [
      "/projects/vibe-coding/chrono-breaker/1.png",
      "/projects/vibe-coding/chrono-breaker/2.png",
      "/projects/vibe-coding/chrono-breaker/3.png",
    ],
    tags: ["Canvas API", "JavaScript", "Touch UI"],
    aiTool: "Claude",
    demoUrl: "#",
    createdAt: "2026-02",
    featured: false,
    exhibitNumber: 1,
    platform: "android",
  },
];

export const getAllVibeProjects = (): VibeProject[] =>
  [...VIBE_PROJECTS].sort((a, b) => b.exhibitNumber - a.exhibitNumber);

export const getFeaturedVibeProjects = (): VibeProject[] =>
  VIBE_PROJECTS.filter((p) => p.featured).sort(
    (a, b) => b.exhibitNumber - a.exhibitNumber
  );

export const getVibeProjectById = (id: string): VibeProject | undefined =>
  VIBE_PROJECTS.find((p) => p.id === id);

export const getAllAiTools = (): string[] =>
  [...new Set(VIBE_PROJECTS.map((p) => p.aiTool))].sort();

export const getVibeProjectsByTool = (tool: string): VibeProject[] =>
  getAllVibeProjects().filter((p) => p.aiTool === tool);

export const getAdjacentProjects = (
  id: string
): { prev: VibeProject | null; next: VibeProject | null } => {
  const all = getAllVibeProjects();
  const idx = all.findIndex((p) => p.id === id);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
};
