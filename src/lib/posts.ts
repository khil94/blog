import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "posts");
const IGNORED_DIRECTORIES = [".obsidian", ".git", "node_modules"];

function normalizeFrontmatter(data: Record<string, unknown>, content: string): PostFrontmatter {
  return {
    title: String(data.title || ""),
    description: String(data.description || ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    createdAt:
      data.createdAt instanceof Date
        ? data.createdAt.toISOString().split("T")[0]
        : String(data.createdAt || ""),
    thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text,
  };
}

export interface PostFrontmatter {
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  thumbnail?: string;
  draft?: boolean;
  readingTime: string;
}

export interface Post {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMeta {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
}

export function getAllPosts(): PostMeta[] {
  const categories = fs.readdirSync(postsDirectory);
  const posts: PostMeta[] = [];

  for (const category of categories) {
    if (IGNORED_DIRECTORIES.includes(category)) continue;

    const categoryPath = path.join(postsDirectory, category);
    const stat = fs.statSync(categoryPath);

    if (!stat.isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;

      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const frontmatter = normalizeFrontmatter(data, content);

      if (frontmatter.draft) continue;

      posts.push({
        slug,
        category,
        frontmatter,
      });
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.createdAt).getTime() -
      new Date(a.frontmatter.createdAt).getTime()
  );
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  const categories = fs.readdirSync(postsDirectory);
  return categories.filter((category) => {
    if (IGNORED_DIRECTORIES.includes(category)) return false;
    const categoryPath = path.join(postsDirectory, category);
    return fs.statSync(categoryPath).isDirectory();
  });
}

export function getPost(category: string, slug: string): Post | null {
  const filePath = path.join(postsDirectory, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = normalizeFrontmatter(data, content);

  if (frontmatter.draft) {
    return null;
  }

  return {
    slug,
    category,
    frontmatter,
    content,
  };
}

export function getAllPostPaths(): { category: string; slug: string }[] {
  return getAllPosts().map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function searchPosts(query: string): PostMeta[] {
  const lowerQuery = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.frontmatter.title.toLowerCase().includes(lowerQuery) ||
      post.frontmatter.description.toLowerCase().includes(lowerQuery) ||
      post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
