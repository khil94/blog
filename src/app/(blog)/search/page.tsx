import { Suspense } from "react";
import { searchPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { SearchInput } from "@/components/search-input";

export const metadata = {
  title: "Search - Blog",
  description: "블로그 검색",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const posts = query ? searchPosts(query) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Search</h1>
        <div className="max-w-md">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchInput />
          </Suspense>
        </div>
      </header>
      <main>
        {query ? (
          posts.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                &quot;{query}&quot;에 대한 {posts.length}개의 결과
              </p>
              <PostList posts={posts} />
            </>
          ) : (
            <p className="text-muted-foreground">
              &quot;{query}&quot;에 대한 검색 결과가 없습니다.
            </p>
          )
        ) : (
          <p className="text-muted-foreground">검색어를 입력해주세요.</p>
        )}
      </main>
    </div>
  );
}
