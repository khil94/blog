import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          김효일의 개발 블로그
        </h1>
        <p className="text-lg text-muted-foreground">
          개발 관련 글을 기록합니다. - 리뉴얼중...
        </p>
      </header>
      <main>
        <PostList posts={posts} />
      </main>
    </div>
  );
}
