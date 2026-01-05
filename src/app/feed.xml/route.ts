import { getAllPosts } from "@/lib/posts";
import { Feed } from "feed";

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://example.com"; // 실제 도메인으로 변경 필요

  const feed = new Feed({
    title: "김효일 개발 블로그",
    description: "프론트엔드 개발자의 개발블로그",
    id: siteUrl,
    link: siteUrl,
    language: "ko",
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  posts.forEach((post) => {
    const url = `${siteUrl}/${post.category}/${post.slug}`;
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.frontmatter.description,
      author: [
        {
          name: "Zidru",
          email: "zidru94@gmail.com",
          link: siteUrl,
        },
      ],
      date: new Date(post.frontmatter.createdAt),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
