"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();
  return (
    <div className="mt-10">
      <Giscus
        id="comments"
        repo="khil94/blog" // 예: "gildong/my-blog"
        repoId="R_kgDOQ0AE3w" // Giscus 사이트에서 얻은 값
        category="General" // 보통 General이나 Comments 선택
        categoryId="DIC_kwDOQ0AE384C1ZjG" // Giscus 사이트에서 얻은 값
        mapping="pathname" // 페이지 경로(URL)를 기준으로 댓글 분류
        reactionsEnabled="1" // 이모지 반응 켜기
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "light" : "dark"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
