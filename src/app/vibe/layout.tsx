import { Header } from "@/components/header";

export const metadata = {
  title: "Vibe Coding Exhibition",
  description: "AI와 함께 만든 실험적 프로젝트 전시회",
};

export default function VibeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="vibe" />
      {children}
    </>
  );
}
