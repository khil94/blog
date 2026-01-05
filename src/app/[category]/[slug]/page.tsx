import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPostPaths, getPost } from "@/lib/posts";
import { compileMDXContent } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";

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
  const { title, description, tags, createdAt, thumbnail } = post.frontmatter;

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href={`/${category}`} className="hover:underline">
            <Badge variant="secondary">{category}</Badge>
          </Link>
          <span>•</span>
          <time dateTime={createdAt}>{createdAt}</time>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-xl text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <hr className="mb-8" />
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {content}
      </div>
    </article>
  );
}
