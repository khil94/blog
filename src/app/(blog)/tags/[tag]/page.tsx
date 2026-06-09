import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostList } from "@/components/post-list";

const POSTS_PER_PAGE = 9;

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} - Blog`,
    description: `${decodedTag} 태그가 포함된 포스트`,
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const decodedTag = decodeURIComponent(tag);
  const allPosts = getPostsByTag(decodedTag);

  if (allPosts.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          #{decodedTag}
        </h1>
        <p className="text-lg text-muted-foreground">
          {allPosts.length}개의 포스트
        </p>
      </header>
      <main>
        <PostList
          posts={paginatedPosts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
}
