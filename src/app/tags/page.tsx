import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Tags - Blog",
  description: "모든 태그 목록",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Tags</h1>
        <p className="text-lg text-muted-foreground">
          {tags.length}개의 태그
        </p>
      </header>
      <main>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="text-base px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag} ({count})
                </Badge>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
