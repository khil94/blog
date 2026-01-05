import { Suspense } from "react";
import { searchPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { SearchInput } from "@/components/search-input";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: "Search - Blog",
  description: "포스트 검색",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const posts = query ? searchPosts(query) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Search</h1>
        <div className="max-w-md">
          <Suspense fallback={<div className="h-10 bg-muted rounded-md animate-pulse" />}>
            <SearchInput />
          </Suspense>
        </div>
      </header>
      <main>
        {query ? (
          <>
            <p className="text-muted-foreground mb-6">
              &quot;{query}&quot; 검색 결과: {posts.length}개
            </p>
            <PostList posts={posts} />
          </>
        ) : (
          <p className="text-muted-foreground">검색어를 입력하세요.</p>
        )}
      </main>
    </div>
  );
}
