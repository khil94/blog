export const SITE_CONFIG = {
  name: "Hyoil.blog",
  title: "Hyoil | Frontend Developer",
  description:
    "인터랙티브 웹과 AI 통합에 관심이 많은 프론트엔드 개발자 김효일의 블로그입니다.",
  url: "https://www.hyoil.blog",
  locale: "ko-KR",
  themeColor: {
    light: "#ffffff",
    dark: "#0a0a0a",
  },
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "/portfolio/#about" },
  { label: "Projects", href: "/portfolio/#projects" },
  { label: "Vibe", href: "/vibe" },
  { label: "Contact", href: "/portfolio/#contact" },
] as const;

export const BLOG_NAV_ITEMS = [
  { label: "Tags", href: "/tags" },
  { label: "Vibe", href: "/vibe" },
  { label: "Portfolio", href: "/portfolio" },
] as const;

export const VIBE_NAV_ITEMS = [
  { label: "Vibe", href: "/vibe" },
  { label: "Portfolio", href: "/portfolio" },
] as const;
