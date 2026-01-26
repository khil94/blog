import Comments from "@/components/comments";
import { TableOfContents } from "@/components/toc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { compileMDXContent } from "@/lib/mdx";
import { getAllPostPaths, getPost } from "@/lib/posts";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  const paths = getAllPostPaths();
  return paths.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.frontmatter.title} - Blog`,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDXContent(post.content);
  const { title, description, tags, createdAt, thumbnail, readingTime } =
    post.frontmatter;

  return (
    <>
      <TableOfContents />
      <article className="container mx-auto px-4 py-20 max-w-3xl">
        {thumbnail && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Link href={`/blog/${category}`} className="hover:underline">
                <Badge variant="secondary">{category}</Badge>
              </Link>
            </div>
            <span>•</span>
            <time dateTime={createdAt}>{createdAt}</time>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`}>
                <Badge variant="outline">{tag}</Badge>
              </Link>
            ))}
          </div>
        </header>
        <hr className="mb-8" />
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {content}
        </div>
        <div className="text-right">
          <Link href={"/blog"}>
            <Button>목록으로</Button>
          </Link>
        </div>
        <Comments />
      </article>
    </>
  );
}
