"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();
  return (
    <div className="mt-10">
      <Giscus
        id="comments"
        repo="khil94/blog"
        repoId="R_kgDOQ0AE3w"
        category="Announcements"
        categoryId="DIC_kwDOQ0AE384C1ZjG"
        mapping="pathname"
        reactionsEnabled="1" // 이모지 반응 켜기
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
