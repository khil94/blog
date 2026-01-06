import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { PostList } from "@/components/post-list";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  return {
    title: `${category} - Blog`,
    description: `${category} 카테고리의 포스트 목록`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categories = getAllCategories();

  if (!categories.includes(category)) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{category}</h1>
        <p className="text-lg text-muted-foreground">
          {posts.length}개의 포스트
        </p>
      </header>
      <main>
        <PostList posts={posts} />
      </main>
    </div>
  );
}
