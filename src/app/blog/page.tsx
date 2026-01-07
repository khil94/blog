import { CategoryFilter } from "@/components/category-filter";
import { PostList } from "@/components/post-list";
import { getAllCategories, getAllPosts, getPostsByCategory } from "@/lib/posts";

export const metadata = {
  title: "Blog - Hyoil.dev",
  description: "개발 관련 글을 기록합니다.",
};

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const postCounts: Record<string, number> = {};
  for (const category of categories) {
    postCounts[category] = getPostsByCategory(category).length;
  }

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          개발 관련 글을 기록합니다.
        </p>
      </header>
      <CategoryFilter
        categories={categories}
        postCounts={postCounts}
        totalCount={allPosts.length}
      />
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
