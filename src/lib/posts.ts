import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");
const IGNORED_DIRECTORIES = [".obsidian", ".git", "node_modules"];

function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
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
  };
}

export interface PostFrontmatter {
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  thumbnail?: string;
  draft?: boolean;
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
      const { data } = matter(fileContents);

      const frontmatter = normalizeFrontmatter(data);

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

  const frontmatter = normalizeFrontmatter(data);

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
