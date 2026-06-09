import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { SITE_CONFIG } from "@/constants";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = getPost(params.category, params.slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Post not found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "black",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 20, color: "#888" }}>
            {post.category}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            {post.frontmatter.title}
          </div>
          <div style={{ fontSize: 30, color: "#ccc" }}>
            {post.frontmatter.description}
          </div>
        </div>
        <div
          style={{ position: "absolute", bottom: 40, fontSize: 24, color: "#666" }}
        >
          {SITE_CONFIG.name}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
