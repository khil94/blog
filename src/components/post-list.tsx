import type { PostMeta } from "@/lib/posts";
import { Pagination } from "./pagination";
import { PostCard } from "./post-card";

interface PostListProps {
  posts: PostMeta[];
  currentPage?: number;
  totalPages?: number;
}

export function PostList({ posts, currentPage, totalPages }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        포스트가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={`${post.category}/${post.slug}`} post={post} />
        ))}
      </div>
      {currentPage && totalPages && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
