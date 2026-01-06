export const SITE_CONFIG = {
  name: "Hyoil.dev",
  title: "Hyoil | Frontend Developer",
  description:
    "인터랙티브 웹과 AI 통합에 관심이 많은 프론트엔드 개발자 김효일의 포트폴리오입니다.",
  url: "https://your-domain.com",
  locale: "ko-KR",
  themeColor: {
    light: "#ffffff",
    dark: "#0a0a0a",
  },
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;

export const BLOG_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Tags", href: "/blog/tags" },
] as const;
