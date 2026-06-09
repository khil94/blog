import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PostMeta } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, category, frontmatter } = post;
  const { title, description, tags, createdAt, thumbnail } = frontmatter;

  return (
    <Link href={`/${category}/${slug}`}>
      <Card className="h-full group shadow-brutal-lg border-foreground hover:bg-foreground hover:text-background hover:shadow-none hover:translate-x-2 hover:translate-y-2 overflow-hidden transition-all duration-150">
        {thumbnail && (
          <div className="relative aspect-video w-full">
            <Image src={thumbnail} alt={title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Badge variant="secondary">{category}</Badge>
            <time className="group-hover:text-background" dateTime={createdAt}>
              {createdAt}
            </time>
          </div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-2 group-hover:text-background">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="group-hover:text-background group-hover:border-background"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
