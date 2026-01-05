import type { PostMeta } from "@/lib/posts";
import { PostCard } from "./post-card";

interface PostListProps {
  posts: PostMeta[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        포스트가 없습니다.
      </div>
    );
  }
  console.log(posts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={`${post.category}/${post.slug}`} post={post} />
      ))}
    </div>
  );
}
